import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faSquareParking,
  faUtensils,
  faPaw
} from "@fortawesome/free-solid-svg-icons";

const RenderFeaturesVenue = ({ meta }) => {
  return (
    <div className="flex flex-col gap-2.5">
      {meta.wifi && (
        <div className="flex gap-1">
          <FontAwesomeIcon
            icon={faWifi}
            className="primary-txt1 text-[20px] w-[25px]"
          />
          <p className="text-black text-[14px]">Wifi</p>
        </div>
      )}
      {meta.parking && (
        <div className="flex gap-1">
          <FontAwesomeIcon
            icon={faSquareParking}
            className="primary-txt1 text-[20px] w-[25px]"
          />
          <p className="text-black text-[14px]">Parking</p>
        </div>
      )}
      {meta.breakfast && (
        <div className="flex gap-1">
          <FontAwesomeIcon
            icon={faUtensils}
            className="primary-txt1 text-[20px] w-[25px]"
          />
          <p className="text-black text-[14px]">Breakfast</p>
        </div>
      )}
      {meta.pets && (
        <div className="flex gap-1">
          <FontAwesomeIcon
            icon={faPaw}
            className="primary-txt1 text-[20px] w-[25px]"
          />
          <p className="text-black text-[14px]">Pets allowed</p>
        </div>
      )}
    </div>
  );
};

export default RenderFeaturesVenue;
