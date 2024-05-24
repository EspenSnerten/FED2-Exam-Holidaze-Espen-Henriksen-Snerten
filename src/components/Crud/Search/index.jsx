import React from "react";
import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Fade>
        <form className="relative flex w-full mb-4">
          <input
            placeholder="Search.."
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-[270px] focus:w-full xl:focus:w-[270px]  transition-all p-2 py-3 pl-9 rounded-lg outline-none custom-shadow primary-clr4"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute top-4 left-3 "
          />
        </form>
      </Fade>
    </>
  );
};

export default Search;
