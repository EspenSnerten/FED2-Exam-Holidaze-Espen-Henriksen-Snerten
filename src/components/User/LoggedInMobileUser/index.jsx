import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@tanstack/react-router";
import LogOutBtn from "../../Auth/LogOutBtn";
import DefaultProfilePic from "/default-profile-pic.png";

const LoggedInMobileUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const apiKey = localStorage.getItem("apiKey");
        const user = localStorage.getItem("user_name");

        const headers = {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey
        };

        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/profiles/${user}`,
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
      <div className="w-full">
        <ul className="flex flex-col">
          <div className="flex items-center justify-center w-full avatar">
            <div className="rounded-full">
              {userData && userData.avatar && userData.avatar.url ? (
                <img
                  src={userData.avatar.url}
                  className="my-auto max-w-[45px] h-auto flex rounded-full object-cover"
                  alt={userData.avatar.alt}
                />
              ) : (
                <img
                  src={DefaultProfilePic}
                  className="my-auto max-w-[45px] flex rounded-full object-cover"
                  alt="Default Avatar"
                />
              )}
            </div>
            <Link
              to="/user"
              className="px-4 flex font-medium py-2 text-[16px] my-auto tracking-widest text-black hover:underline transition-all"
            >
              {" "}
              Profile
            </Link>
          </div>
          <div className="w-full mt-6">
            <LogOutBtn />
          </div>
        </ul>
      </div>
    </>
  );
};

export default LoggedInMobileUser;
