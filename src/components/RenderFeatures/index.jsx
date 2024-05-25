import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faSquareParking,
  faUtensils,
  faPaw
} from "@fortawesome/free-solid-svg-icons";

const RenderFeatures = ({ meta }) => {
  return (
    <div className="flex gap-3.5 my-auto">
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

export default RenderFeatures;
