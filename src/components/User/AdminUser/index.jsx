import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateProfile from "../../Crud/UpdateProfile";
import UserVenues from "../../Crud/UserVenues";
import UserVenuesBooked from "../../Crud/UserVenuesBooked";
import CustomerBookings from "../../Crud/CustomerBookings";
import CreateVenue from "../../Crud/CreateVenue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHouse } from "@fortawesome/free-solid-svg-icons";
import DefaultProfilePic from "/default-profile-pic.png";

const AdminUser = () => {
  const [user, setUserData] = useState(null);
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [activeView, setActiveView] = useState("allVenues");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
        const userName = localStorage.getItem("user_name");

        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey
        };

        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/profiles/${userName}`,
          {
            headers: headers
          }
        );

        setUserData(response.data.data);
        setIsVenueManager(response.data.data.venueManager);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="w-full max-w-[1150px] mx-auto flex flex-col xl:flex-row gap-6">
        <div className="relative flex flex-col p-4 rounded-lg primary-clr4 custom-shadow w-fit h-fit">
          <div className="flex w-full">
            <div className="rounded-lg w-[295px] h-[295px]">
              {user && user.avatar && user.avatar.url ? (
                <img
                  src={user.avatar.url}
                  className="my-auto  w-[295px] h-[295px] flex rounded-lg object-cover"
                  alt={user.avatar.alt}
                />
              ) : (
                <img
                  src={DefaultProfilePic}
                  className="my-auto max-w-[295px] max-h-[295px] flex rounded-lg object-cover"
                  alt="Default Avatar"
                />
              )}
            </div>
          </div>
          {user && (
            <div className="flex flex-col mt-1.5">
              <div className="flex gap-1.5">
                <p className="text-[16px]">{user.name}</p>
                <div className="h-[15px] w-[1.5px] primary-clr2 my-auto"></div>
                <p className="text-[16px] font-semibold">
                  {isVenueManager ? "Venue manager" : "User"}
                </p>
              </div>
              <p>{user.email}</p>
            </div>
          )}
          {user && (
            <div className="mt-7 mb-11">
              <p className="font-light text-[14px] max-w-[280px]">
                {user.bio
                  ? user.bio
                  : "You do not have a bio yet. Click on the edit button below to add one."}
              </p>
            </div>
          )}
          <div className="absolute bottom-0 left-0">
            <button
              className="flex p-0 transition-all border-none rounded-tr-lg rounded-bl-lg shadow-none outline-none hover:bg-black primary-clr3 hover:bg-current-color"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <FontAwesomeIcon
                icon={faGear}
                className="text-white text-[20px] hover:animate-spin p-1.5"
              />
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box primary-clr4 w-fit">
                <form method="dialog">
                  <button className="absolute text-black btn btn-sm btn-circle btn-ghost right-2 top-2">
                    ✕
                  </button>
                </form>
                <UpdateProfile />
              </div>
            </dialog>
          </div>
          <div className="absolute bottom-0 right-0">
            <button
              className="flex gap-1 p-1 px-3 text-white transition-all border-none rounded-tl-lg rounded-br-lg shadow-none outline-none jus primary-clr3 hover:bg-black"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              <span className="my-auto">Add venue</span>
              <FontAwesomeIcon
                icon={faHouse}
                className="text-white text-[16px] my-auto"
              />
            </button>
            <dialog id="my_modal_4" className="modal">
              <div className="mx-2 modal-box primary-clr4 w-fit">
                <form method="dialog">
                  <button className="absolute text-black btn btn-sm btn-circle btn-ghost right-2 top-2">
                    ✕
                  </button>
                </form>
                <CreateVenue />
              </div>
            </dialog>
          </div>
        </div>
        <div className="flex flex-col w-full mb-[15vh]">
          {isVenueManager ? (
            <>
              <div className="flex justify-center w-full mx-auto mb-6">
                <button
                  className={`${activeView === "allVenues" ? "border-sky-700 text-black font-medium" : "border-neutral-500 font-normal"} border-b-[4px] w-[170px] py-1`}
                  onClick={() => setActiveView("allVenues")}
                >
                  All venues
                </button>
                <button
                  className={`${activeView === "bookedVenues" ? "border-sky-700 text-black font-medium" : "border-neutral-500 font-normal"} border-b-[4px] w-[170px] py-1`}
                  onClick={() => setActiveView("bookedVenues")}
                >
                  Booked venues
                </button>
              </div>
              {activeView === "allVenues" && <UserVenues />}
              {activeView === "bookedVenues" && <UserVenuesBooked />}
            </>
          ) : (
            <div>
              <CustomerBookings />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminUser;
