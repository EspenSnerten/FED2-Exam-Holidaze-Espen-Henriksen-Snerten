import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function UpdateProfile() {
  const [bio, setBio] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [bioError, setBioError] = useState("");
  const [urlError, setUrlError] = useState("");

  const validateBio = (bio) => {
    return bio.length <= 160;
  };

  const validateAvatarUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setBioError("");
    setUrlError("");

    let isValid = true;
    if (!validateBio(bio)) {
      setBioError("Bio must be less than 160 characters.");
      isValid = false;
    }
    if (!validateAvatarUrl(profilePictureUrl)) {
      setUrlError("Invalid URL format.");
      isValid = false;
    }

    if (!isValid) return;

    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");
    const userName = localStorage.getItem("user_name");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json"
    };

    const payload = {
      bio: bio,
      avatar: {
        url: profilePictureUrl
      }
    };

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${userName}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        document.getElementById("profile-update-modal").showModal();

        setTimeout(function () {
          location.reload();
        }, 500);
      } else {
        const errorData = await response.json();
        console.error("Error updating profile:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-9">
        <h2 className="text-[20px] font-medium">Edit your profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-9">
          <div className="flex flex-col w-full mx-auto">
            <h3 className="font-medium">Update your profile picture</h3>
            <div className="w-full max-w-[370px] sm:min-w-[350px] form-group">
              <input
                type="text"
                required
                value={profilePictureUrl}
                onChange={(e) => setProfilePictureUrl(e.target.value)}
              />
              <label htmlFor="">Profile picture URL</label>
              {urlError && <p className="text-red-500">{urlError}</p>}
            </div>
          </div>

          <div className="flex flex-col mx-auto">
            <h3 className="font-medium">Update or add your profile Bio</h3>
            <div className="form-group sm:min-w-[350px] max-w-[370px] w-full">
              <textarea
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="z-10 p-1 bg-transparent border-b-2 outline-none placeholder:text-black placeholder:text-[14px] placeholder:font-medium border-b-black"
              ></textarea>
              <label htmlFor="">Your bio</label>
              {bioError && <p className="text-red-500">{bioError}</p>}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="text-white border-none rounded-md outline-none btn primary-clr3"
            >
              Update profile
            </button>
          </div>
          <dialog id="profile-update-modal" className="modal">
            <div className="text-center p-14 modal-box primary-clr4 w-fit">
              <h3 className="mb-4 font-bold text-md">Update successful!</h3>
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
    </>
  );
}
