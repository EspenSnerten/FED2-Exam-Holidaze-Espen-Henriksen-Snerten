import React, { useState, useEffect } from "react";
import Calendar from "@demark-pro/react-booking-calendar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheck } from "@fortawesome/free-solid-svg-icons";

const CreateBooking = () => {
  const venueId = window.location.pathname.split("/").pop();
  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    guests: 1,
    venueId: venueId
  });

  const [reserved, setReserved] = useState([]);
  const [maxGuests, setMaxGuests] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleChange = (selectedDates) => {
    setFormData({
      startDate: selectedDates[0] || null,
      endDate: selectedDates[1] || null,
      guests: formData.guests
    });
  };

  const handleGuestsChange = (e) => {
    setFormData({
      ...formData,
      guests: parseInt(e.target.value)
    });
  };

  const handleIncrement = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      guests: prevFormData.guests + 1
    }));
  };

  const handleDecrement = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      guests: prevFormData.guests > 1 ? prevFormData.guests - 1 : 1
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedData = {
        ...formData,
        dateFrom: new Date(formData.startDate).toISOString(),
        dateTo: new Date(formData.endDate).toISOString(),
        guests: parseInt(formData.guests),
        venueId: venueId
      };

      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json"
      };

      const response = await fetch(
        "https://v2.api.noroff.dev/holidaze/bookings",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(formattedData)
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      document.getElementById("booking_created_modal").showModal();
      setTimeout(function () {
        location.reload();
      }, 500);
    } catch (error) {
      console.error("Error booking venue:", error);
    }
  };

  const fetchVenue = async () => {
    try {
      const response = await axios.get(
        `https://v2.api.noroff.dev/holidaze/venues/${venueId}`,
        {
          params: {
            _owner: true,
            _bookings: true
          }
        }
      );
      console.log("Venue Response:", response);

      const venueData = response.data.data;
      setMaxGuests(venueData.maxGuests);

      const bookings = response.data.data.bookings.map((booking) => ({
        startDate: new Date(booking.dateFrom),
        endDate: new Date(booking.dateTo)
      }));

      setReserved(bookings);
    } catch (error) {
      console.error("Error fetching venue:", error);
    }
  };

  useEffect(() => {
    fetchVenue();
  }, [venueId]);

  return (
    <div className=" flex-flex-col">
      <h2 className="font-medium text-[16px] ml-4 ">Available dates</h2>
      <form onSubmit={handleSubmit}>
        <Calendar
          selected={[formData.startDate, formData.endDate]}
          onChange={handleChange}
          reserved={reserved}
          range={true}
        />
        {isLoggedIn && (
          <div className="flex flex-col">
            <div className="relative flex bg-black border-neutral-100 border-t-[1px]">
              <button
                type="button"
                id="decrement-button"
                onClick={handleDecrement}
                className="flex items-center p-5 align-middle transition-all focus:bg-sky-800 hover:bg-sky-800 hover:text-white primary-clr4 focus:text-white border-neutral-100 border-r-[1px] text-[20px]"
              >
                -
              </button>
              <input
                type="number"
                id="guest-input"
                name="guests"
                value={formData.guests}
                min={1}
                max={maxGuests}
                onChange={handleGuestsChange}
                className="block w-full pb-2 text-sm font-medium text-center text-gray-900 align-middle outline-none primary-clr4 0 focus:bg-neutral-100"
                placeholder="1"
                required
              />
              <div className="absolute flex items-center space-x-1 text-xs text-gray-400 -translate-x-1/2 bottom-1 start-1/2 rtl:translate-x-1/2 rtl:space-x-reverse">
                <FontAwesomeIcon icon={faUser} />
                <span>Number of guests</span>
              </div>
              <button
                type="button"
                id="increment-button"
                onClick={handleIncrement}
                className="flex items-center p-5 align-middle transition-all focus:bg-sky-800 hover:bg-sky-800 hover:text-white primary-clr4 focus:text-white border-neutral-100 border-l-[1px] text-[20px]"
              >
                +
              </button>
            </div>
            <div className="flex w-full border-neutral-100 border-t-[1px]">
              <button
                type="submit"
                className="w-full p-5 text-black transition-all rounded-b-lg focus:bg-sky-800 hover:bg-sky-800 hover:text-white primary-clr4 focus:text-white "
              >
                Reserve Venue
              </button>
            </div>
          </div>
        )}
      </form>
      <dialog id="booking_created_modal" className="modal">
        <div className="text-center p-14 modal-box primary-clr4 w-fit">
          <h3 className="mb-4 font-bold text-md">Booking placed!</h3>
          <FontAwesomeIcon
            icon={faCheck}
            className="pronounced-txt-color text-[44px]"
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default CreateBooking;
