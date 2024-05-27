import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const LogOutBtn = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 w-full text-[14px] my-auto tracking-widest text-white rounded-none md:rounded-b-md  primary-clr3 btn outline-none border-none"
    >
      Sign Out <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  );
};

export default LogOutBtn;
