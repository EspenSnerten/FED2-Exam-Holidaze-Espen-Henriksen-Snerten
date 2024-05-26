import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@tanstack/react-router";
import { Fade } from "react-awesome-reveal";

const UserVenuesBooked = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
        const userName = localStorage.getItem("user_name");

        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey
        };

        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/profiles/${userName}/venues`,
          {
            headers,
            params: {
              _bookings: true
            }
          }
        );

        const bookedVenues = response.data.data.filter(
          (venue) => venue.bookings && venue.bookings.length > 0
        );
        setVenues(bookedVenues);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="flex flex-col gap-6 mb-9">
      <h2 className="font-medium">Your booked venues</h2>
      <Fade cascade damping={0.1} direction="right">
        <div className="flex flex-col w-full max-w-[900px] ">
          <div className="overflow-x-auto">
            <table className="table text-black ">
              {/* head */}
              <thead>
                <tr className="text-center border-neutral-300">
                  <th>
                    <span className="font-semibold text-black text-[16px]">
                      Venue name
                    </span>
                  </th>
                  <th>
                    <span className="font-semibold text-black text-[16px]">
                      Customer
                    </span>
                  </th>
                  <th>
                    <span className="font-semibold text-black text-[16px]">
                      Booking from
                    </span>
                  </th>
                  <th>
                    <span className="font-semibold text-black text-[16px]">
                      Booking to
                    </span>
                  </th>
                  <th>
                    <span className="font-semibold text-black text-[16px]">
                      Guests
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {venues.map((venue) =>
                  venue.bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="bg-current-color border-neutral-300 odd:bg-gray-100"
                    >
                      <th className="font-medium hover:bg-gray-300">
                        <Link to={`/venue/${venue.id}`}>{venue.name}</Link>
                      </th>
                      <td>{booking.customer.name}</td>
                      <td>{new Date(booking.dateFrom).toLocaleDateString()}</td>
                      <td>{new Date(booking.dateTo).toLocaleDateString()}</td>
                      <td>{booking.guests}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default UserVenuesBooked;
