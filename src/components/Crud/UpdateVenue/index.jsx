import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faSquareParking,
  faUtensils,
  faPaw,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

export default function UpdateVenue({ venueId }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [maxGuests, setMaxGuests] = useState(0);
  const [price, setPrice] = useState(0);
  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false
  });

  const handleCheckboxChange = (e) => {
    setMeta({
      ...meta,
      [e.target.id]: e.target.checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      description,
      media: [{ url: mediaUrl }],
      price: Number(price),
      maxGuests: Number(maxGuests),
      meta,
      location: {
        city
      }
    };

    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json"
    };

    try {
      const response = await axios.put(
        `https://v2.api.noroff.dev/holidaze/venues/${venueId}`,
        payload,
        { headers }
      );

      if (response.data) {
        document.getElementById("post_update_modal").showModal();

        setTimeout(function () {
          location.reload();
        }, 500);
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-row gap-2.5">
        <h2 className="text-[20px] font-medium my-auto">Update a venue</h2>
        <div className="h-[3px] w-[40px] primary-clr3 my-auto"></div>
      </div>
      <p className="mt-4 mb-2 w-[90%] font-light">
        Thank you for hosting your property on our platform.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-[370px] sm:min-w-[350px] form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="">Venue name</label>
        </div>
        <div className="w-full max-w-[370px] sm:min-w-[350px] form-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <label htmlFor="">Venue City</label>
        </div>
        <div className="form-group sm:min-w-[350px] max-w-[370px] w-full">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="z-10 p-1 bg-transparent border-b-2 outline-none placeholder:text-black placeholder:text-[14px] placeholder:font-medium border-b-black"
          ></textarea>
          <label htmlFor="">Venue description</label>
        </div>
        <div className="w-full max-w-[370px] sm:min-w-[350px] form-group">
          <input
            type="text"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            required
          />
          <label htmlFor="">Venue media URL</label>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="maxGuests" className="font-medium text-black">
            Max Guests
          </label>
          <input
            type="number"
            required
            value={maxGuests}
            min={1}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value > 0) {
                setMaxGuests(value);
              } else {
                setMaxGuests(""); // Reset or handle invalid input
              }
            }}
            className="bg-transparent p-0 pl-2 border-black border-2 input input-sm input-bordered w-[150px] rounded-sm focus:outline-none focus:border-black"
          />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="price" className="font-medium text-black">
            Price per night
          </label>
          <input
            type="number"
            required
            value={price}
            min={1}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value > 0) {
                setPrice(value);
              } else {
                setPrice(""); // Reset or handle invalid input
              }
            }}
            className="bg-transparent p-0 pl-2 border-black border-2 input input-sm input-bordered w-[150px] rounded-sm focus:outline-none focus:border-black"
          />
        </div>
        <h3 className="mt-4 mb-2 font-medium">Amenities</h3>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="parking"
              checked={meta.parking}
              onChange={handleCheckboxChange}
              className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
            />
            <label htmlFor="parking" className="text-black">
              <FontAwesomeIcon
                icon={faSquareParking}
                className="primary-txt1 text-[20px] w-[25px]"
              />{" "}
              Parking
            </label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="wifi"
              checked={meta.wifi}
              onChange={handleCheckboxChange}
              className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
            />
            <label htmlFor="wifi" className="text-black">
              <FontAwesomeIcon
                icon={faWifi}
                className="primary-txt1 text-[20px] w-[25px]"
              />{" "}
              Wifi
            </label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="pets"
              checked={meta.pets}
              onChange={handleCheckboxChange}
              className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
            />
            <label htmlFor="pets" className="text-black">
              <FontAwesomeIcon
                icon={faPaw}
                className="primary-txt1 text-[20px] w-[25px]"
              />{" "}
              Pets allowed
            </label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="breakfast"
              checked={meta.breakfast}
              onChange={handleCheckboxChange}
              className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
            />
            <label htmlFor="breakfast" className="text-black">
              <FontAwesomeIcon
                icon={faUtensils}
                className="primary-txt1 text-[20px] w-[25px]"
              />{" "}
              Breakfast
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 text-white border-none rounded-md outline-none btn primary-clr3"
        >
          Update Venue
        </button>

        <dialog id="post_update_modal" className="modal">
          <div className="text-center p-14 modal-box primary-clr4 w-fit">
            <h3 className="mb-4 font-bold text-md">Venue Updated!</h3>
            <FontAwesomeIcon
              icon={faCheck}
              className="pronounced-txt-color text-[44px]"
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </form>
    </div>
  );
}
