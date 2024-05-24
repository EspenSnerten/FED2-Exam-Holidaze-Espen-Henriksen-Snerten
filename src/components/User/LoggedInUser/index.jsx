import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@tanstack/react-router";
import LogOutBtn from "../../Auth/LogOutBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import DefaultProfilePic from "/default-profile-pic.png";

const LogedInUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
        const user_name = localStorage.getItem("user_name");

        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey
        };

        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/profiles/${user_name}`,
          {
            headers: headers
          }
        );

        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <details className="relative dropdown dropdown-end">
        <summary className="bg-transparent btn btn-ghost border-none outline-none avatar transition-all hover:scale-[115%] hover:bg-transparent relative">
          {userData && userData.avatar && userData.avatar.url ? (
            <img
              src={userData.avatar.url}
              className="my-auto max-w-[45px] flex rounded-full"
              alt={userData.avatar.alt}
            />
          ) : (
            <img
              src={DefaultProfilePic}
              className="my-auto max-w-[45px] flex rounded-full"
              alt="Default Avatar"
            />
          )}
        </summary>
        <ul className=" w-[125px] pt-1 rounded-md custom-shadow primary-clr4 dropdown-content flex flex-col">
          <Link
            to="/user"
            className="px-4 flex font-medium py-2 text-[16px] my-auto tracking-widest text-black hover:underline transition-all"
          >
            {" "}
            Profile <FontAwesomeIcon className="my-auto ml-2" icon={faUser} />
          </Link>
          <LogOutBtn />
        </ul>
      </details>
    </>
  );
};

export default LogedInUser;
