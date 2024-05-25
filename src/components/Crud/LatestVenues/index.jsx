import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Fade } from "react-awesome-reveal";
import RenderRating from "../../RenderRating";
import axios from "axios";
import DefaultMedia from "/default-placeholder.png";

const LatestVenues = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          "https://v2.api.noroff.dev/holidaze/venues",
          {
            params: {
              sort: "created",
              sortOrder: "desc"
            }
          }
        );
        console.log(response.data);
        if (Array.isArray(response.data.data)) {
          setVenues(response.data.data.slice(0, 3));
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError("Failed to fetch venues. Please try again later.");
      }
    };

    fetchVenues();
  }, []);

  return (
    <Fade>
      <div className="flex flex-row gap-2.5 max-w-[1150px] mb-4 mx-auto px-4">
        <h2 className="text-[20px] font-medium my-auto">Latest venues</h2>
        <div className="h-[3px] w-[60px] primary-clr3 my-auto"></div>
      </div>
      <section className="m-auto max-w-[1150px] h-[335px] px-4 overflow-x-auto">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-row gap-[50px]">
            {venues.map((venue) => (
              <Link
                key={venue.id}
                to={`/venue/${venue.id}`}
                className="flex flex-col max-w-[350px]"
              >
                <div className="rounded-t-lg">
                  {venue.media &&
                  venue.media.length > 0 &&
                  venue.media[0].url ? (
                    <img
                      src={venue.media[0].url}
                      className="h-[215px] w-[350px] min-w-[340px] rounded-t-lg object-cover"
                      alt={venue.media[0].alt || "Venue Image"}
                    />
                  ) : (
                    <img
                      src={DefaultMedia}
                      className="h-[215px] w-[350px] min-w-[340px] rounded-t-lg object-cover"
                      alt="Default Media if there is no image for the post"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-b-lg primary-clr4 custom-shadow ">
                  <div className="flex gap-2">
                    <p className="font-semibold text-[14px] truncate">
                      {venue.name}
                    </p>
                    <div className="h-[15px] w-[2px] primary-clr2 my-auto"></div>
                    <p className="font-medium text-[14px] primary-txt1 truncate">
                      {venue.location.city
                        ? venue.location.city
                        : "Undisclosed"}
                    </p>
                  </div>
                  <div>
                    <div className="flex gap-6">
                      <div className="my-auto rating rating-sm">
                        <RenderRating rating={venue.rating} />
                      </div>
                      <p className="text-[10px] font-medium">
                        <span className="font-semibold text-[14px]">
                          {venue.price}
                        </span>{" "}
                        NOK / Night
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Fade>
  );
};

export default LatestVenues;
