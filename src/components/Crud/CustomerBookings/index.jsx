import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUsers,
  faWifi,
  faSquareParking,
  faUtensils,
  faPaw
} from "@fortawesome/free-solid-svg-icons";
import DefaultMedia from "/default-placeholder.png";

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");
    const userName = localStorage.getItem("user_name");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/profiles/${userName}/bookings`,
          {
            headers,
            params: {
              _venue: true
            }
          }
        );
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const renderRating = (rating) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            className={
              index < rating
                ? "text-sky-600 text-[14px]"
                : "text-gray-200 text-[14px]"
            }
          />
        ))}
      </div>
    );
  };

  const renderFeatures = (meta) => {
    return (
      <div className="flex gap-2.5 my-auto ">
        {meta.wifi && (
          <FontAwesomeIcon icon={faWifi} className="primary-txt1 text-[20px]" />
        )}
        {meta.parking && (
          <FontAwesomeIcon
            icon={faSquareParking}
            className="primary-txt1 text-[20px]"
          />
        )}
        {meta.breakfast && (
          <FontAwesomeIcon
            icon={faUtensils}
            className="primary-txt1 text-[20px]"
          />
        )}
        {meta.pets && (
          <FontAwesomeIcon icon={faPaw} className="primary-txt1 text-[20px]" />
        )}
      </div>
    );
  };

  return (
    <div>
      <h1 className="font-medium mb-6 text-[18px]">Your upcoming Bookings</h1>
      <ul className="flex flex-col w-full gap-6">
        {bookings.map((booking) => (
          <li
            key={booking.id}
            className="flex flex-col xl:flex-row w-full max-w-[800px] relative"
          >
            {" "}
            <div className="rounded-l-lg custom-shadow">
              {booking.venue.media &&
              booking.venue.media.length > 0 &&
              booking.venue.media[0].url ? (
                <img
                  src={booking.venue.media[0].url}
                  className="h-full xl:w-[350px] w-full rounded-t-lg xl:rounded-l-lg xl:rounded-tr-none object-cover"
                  alt={booking.venue.media[0].alt || "Venue Image"}
                />
              ) : (
                <img
                  src={DefaultMedia}
                  className="h-full xl:w-[350px] w-full rounded-t-lg xl:rounded-l-lg xl:rounded-tr-none object-cover"
                  alt="Default Media if there is no image for the post"
                />
              )}
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-b-lg xl:rounded-r-lg xl:rounded-bl-none primary-clr4 custom-shadow xl:max-w-[450px] w-full relative">
              <div className="flex gap-2">
                <p className="font-semibold text-[16px] truncate">
                  {booking.venue.name}
                </p>
                <div className="h-[15px] w-[2px] primary-clr2 my-auto"></div>
                <p className="font-medium text-[16px] primary-txt1 truncate">
                  {booking.venue.location.city
                    ? booking.venue.location.city
                    : "Undisclosed"}
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-6">
                  <div className="rating rating-sm">
                    {renderRating(booking.venue.rating || 0)}
                  </div>
                </div>
                <div className="max-w-[350px] flex flex-col gap-1">
                  <h3 className="mb-3 font-medium">Your booking details</h3>
                  <p className="font-medium">
                    From:{" "}
                    <span className="font-normal">
                      {new Date(booking.dateFrom).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="font-medium">
                    To:{" "}
                    <span className="font-normal">
                      {new Date(booking.dateTo).toLocaleDateString()}
                    </span>{" "}
                  </p>
                  <p className="font-medium">Guests: {booking.guests}</p>
                </div>
                <div className="flex flex-row gap-2.5">
                  <p className="primary-txt1">
                    <FontAwesomeIcon icon={faUsers} className="text-[20px]" />{" "}
                    <span className="text-[12px]">
                      {booking.venue.maxGuests}
                    </span>
                  </p>
                  {booking.venue.meta && renderFeatures(booking.venue.meta)}
                </div>
                <p className="text-[10px] font-medium">
                  <span className="font-semibold text-[14px]">
                    {booking.venue.price}
                  </span>{" "}
                  NOK / Night
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerBookings;
