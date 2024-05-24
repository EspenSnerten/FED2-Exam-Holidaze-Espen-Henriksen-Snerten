import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import CreateBooking from "../CreateBooking";
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

const Venue = () => {
  const venueId = window.location.pathname.split("/").pop();
  const [venue, setVenue] = useState(null);

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
      setVenue(response.data.data);
    } catch (error) {
      console.error("Error fetching venue:", error);
    }
  };

  useEffect(() => {
    fetchVenue();
  }, [venueId]);

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
      <div className="flex flex-col gap-2.5">
        {meta.wifi && (
          <div className="flex gap-1">
            <FontAwesomeIcon
              icon={faWifi}
              className="primary-txt1 text-[20px] w-[25px]"
            />
            <p className="text-black text-[14px]">Wifi</p>
          </div>
        )}
        {meta.parking && (
          <div className="flex gap-1">
            <FontAwesomeIcon
              icon={faSquareParking}
              className="primary-txt1 text-[20px] w-[25px]"
            />
            <p className="text-black text-[14px]">Parking</p>
          </div>
        )}
        {meta.breakfast && (
          <div className="flex gap-1">
            <FontAwesomeIcon
              icon={faUtensils}
              className="primary-txt1 text-[20px] w-[25px]"
            />
            <p className="text-black text-[14px]">Breakfast</p>
          </div>
        )}
        {meta.pets && (
          <div className="flex gap-1">
            <FontAwesomeIcon
              icon={faPaw}
              className="primary-txt1 text-[20px] w-[25px]"
            />
            <p className="text-black text-[14px]">Pets allowed</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {venue && (
        <section className="max-w-[1150px] flex mx-auto px-4 my-[10vh]">
          <div className="flex flex-col w-full m-auto rounded-md primary-clr4 custom-shadow">
            <div className="flex flex-col px-4 lg:px-16 lg:flex-row py-9 gap-7">
              <div className="rounded-md custom-shadow">
                {venue.media && venue.media.length > 0 && venue.media[0].url ? (
                  <img
                    src={venue.media[0].url}
                    className="sm:h-[460px] h-[260px] w-[640px] rounded-md object-cover"
                    alt={venue.media[0].alt || "Venue Image"}
                  />
                ) : (
                  <img
                    src={DefaultMedia}
                    className="h-[460px] w-[640px] rounded-md object-cover"
                    alt="Default Media if there is no image for the post"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <p className="font-semibold text-[20px] truncate">
                    {venue.name}
                  </p>
                  <div className="h-[15px] w-[1.5px] primary-clr2 my-auto"></div>
                  <p className="font-medium text-[20px] primary-txt1 truncate">
                    {venue.location.city ? venue.location.city : "Undisclosed"}
                  </p>
                </div>
                <div className="flex gap-3.5 mt-1">
                  <div className="my-auto rating rating-sm">
                    {renderRating(venue.rating || 0)}
                  </div>
                  <div>
                    <p className="text-[12px] font-medium my-auto">
                      <span className="font-semibold text-[16px]">
                        {venue.price}
                      </span>{" "}
                      NOK / Night
                    </p>
                  </div>
                </div>
                <div className="flex max-w-[350px] w-full h-[170px] my-auto">
                  <p className="font-light text-[14px] line-clamp-6">
                    {venue.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-medium text-[16px]">Amenities</h2>
                  <p className="primary-txt1">
                    <FontAwesomeIcon icon={faUsers} className="text-[20px]" />{" "}
                    <span className="text-[14px] text-black">
                      Room for {venue.maxGuests}
                    </span>
                  </p>
                  <div>{venue.meta && renderFeatures(venue.meta)}</div>
                </div>
              </div>
            </div>
            <CreateBooking />
          </div>
        </section>
      )}
    </>
  );
};

export default Venue;
