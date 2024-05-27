import React, { useState, useEffect } from "react";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import { Link } from "@tanstack/react-router";
import DeleteVenue from "../../Crud/DeleteVenue";
import UpdateVenue from "../../Crud/UpdateVenue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUsers,
  faWifi,
  faSquareParking,
  faUtensils,
  faPenToSquare,
  faPaw
} from "@fortawesome/free-solid-svg-icons";
import DefaultMedia from "/default-placeholder.png";

const UserVenues = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);

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
          { headers }
        );

        setVenues(response.data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
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

  const handleDelete = (deletedVenueId) => {
    setVenues((prevVenues) =>
      prevVenues.filter((venue) => venue.id !== deletedVenueId)
    );
  };

  const openUpdateModal = (venueId) => {
    setSelectedVenueId(venueId);
    document.getElementById("update-venue-modal").showModal();
  };

  return (
    <div className="flex flex-col gap-6">
      <Fade cascade damping={0.1} direction="right">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="flex flex-col xl:flex-row w-full max-w-[800px] relative"
          >
            <div className="rounded-l-lg custom-shadow">
              {venue.media && venue.media.length > 0 && venue.media[0].url ? (
                <img
                  src={venue.media[0].url}
                  className="h-[275px] xl:w-[350px] w-full rounded-t-lg xl:rounded-l-lg xl:rounded-tr-none object-cover"
                  alt={venue.media[0].alt || "Venue Image"}
                />
              ) : (
                <img
                  src={DefaultMedia}
                  className="h-[275px] xl:w-[350px] w-full rounded-t-lg xl:rounded-l-lg xl:rounded-tr-none object-cover"
                  alt="Default Media if there is no image for the post"
                />
              )}
            </div>
            <Link
              to={`/venue/${venue.id}`}
              className="flex flex-col gap-2 p-4 rounded-b-lg xl:rounded-r-lg xl:rounded-bl-none primary-clr4 custom-shadow xl:max-w-[450px] w-full relative"
            >
              <div className="flex gap-2">
                <p className="font-semibold text-[16px] truncate">
                  {venue.name}
                </p>
                <div className="h-[15px] w-[2px] primary-clr2 my-auto"></div>
                <p className="font-medium text-[16px] primary-txt1 truncate">
                  {venue.location.city ? venue.location.city : "Undisclosed"}
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-6">
                  <div className="rating rating-sm">
                    {renderRating(venue.rating || 0)}
                  </div>
                </div>
                <div className="max-w-[350px]  max-h-[85px]">
                  <p className=" text-[14px] font-light line-clamp-4	">
                    {venue.description
                      ? venue.description
                      : "There is no description for this venue. This could be an oversight or a test post that a developer has created in the hope that things are working."}
                  </p>
                </div>
                <div className="flex flex-row gap-2.5">
                  <p className="primary-txt1">
                    <FontAwesomeIcon icon={faUsers} className="text-[20px]" />{" "}
                    <span className="text-[12px]">{venue.maxGuests}</span>
                  </p>
                  {venue.meta && renderFeatures(venue.meta)}
                </div>
                <p className="text-[10px] font-medium">
                  <span className="font-semibold text-[14px]">
                    {venue.price}
                  </span>{" "}
                  NOK / Night
                </p>
              </div>
            </Link>
            <div className="absolute bottom-0 right-0 z-20 w-full">
              <DeleteVenue venueId={venue.id} onDelete={handleDelete} />
            </div>
            <button
              className="absolute top-0 right-0 z-20 p-2 py-1 rounded-tr-lg rounded-bl-lg w-fit primary-clr3 hover:bg-black"
              onClick={() => openUpdateModal(venue.id)}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-white text-[16px] my-auto"
              />
            </button>
          </div>
        ))}
      </Fade>
      <dialog id="update-venue-modal" className="modal">
        <div className="mx-2 modal-box primary-clr4 w-fit">
          <form method="dialog">
            <button className="absolute text-black btn btn-sm btn-circle btn-ghost right-2 top-2">
              ✕
            </button>
          </form>
          {selectedVenueId && <UpdateVenue venueId={selectedVenueId} />}
        </div>
      </dialog>
    </div>
  );
};

export default UserVenues;
