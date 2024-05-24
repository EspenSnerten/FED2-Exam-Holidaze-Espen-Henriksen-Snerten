import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const DeleteVenue = ({ venueId, onDelete }) => {
  const handleDelete = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json"
    };

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues/${venueId}`,
        {
          method: "DELETE",
          headers: headers
        }
      );

      if (response.status === 204) {
        if (onDelete) {
          onDelete(venueId);
        }
      } else {
        console.error("Failed to delete the venue");
      }
    } catch (error) {
      console.error("An error occurred while deleting the venue:", error);
    }
  };

  return (
    <button
      className="absolute bottom-0 right-0 z-20 p-1 px-2 text-white transition-all rounded-tl-lg rounded-br-lg hover:bg-black primary-clr3"
      onClick={handleDelete}
    >
      Delete Venue <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
};

DeleteVenue.propTypes = {
  venueId: PropTypes.string.isRequired,
  onDelete: PropTypes.func
};

export default DeleteVenue;
