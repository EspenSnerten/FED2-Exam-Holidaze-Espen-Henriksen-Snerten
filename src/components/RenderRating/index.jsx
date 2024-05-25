import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RenderRating = ({ rating }) => {
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

export default RenderRating;
