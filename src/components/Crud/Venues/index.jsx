import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Fade } from "react-awesome-reveal";
import Search from "../Search";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUsers,
  faWifi,
  faSquareParking,
  faUtensils,
  faPaw,
  faSliders
} from "@fortawesome/free-solid-svg-icons";
import DefaultMedia from "/default-placeholder.png";

const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [sortField, setSortField] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchVenues = async (page) => {
    try {
      const response = await axios.get(
        "https://v2.api.noroff.dev/holidaze/venues",
        {
          params: {
            sort: sortField,
            sortOrder: sortOrder,
            page: page,
            limit: 10
          }
        }
      );

      if (Array.isArray(response.data.data)) {
        setVenues(response.data.data);
        setIsFirstPage(response.data.meta.isFirstPage);
        setIsLastPage(response.data.meta.isLastPage);
        setPageCount(response.data.meta.pageCount);
      } else {
        throw new Error("Data is not an array");
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
      setError("Failed to fetch venues. Please try again later.");
    }
  };

  useEffect(() => {
    fetchVenues(currentPage);
  }, [currentPage, sortField, sortOrder, filters]);

  const handleSortChange = (event) => {
    const { id } = event.target;
    switch (id) {
      case "new-old":
        setSortField("created");
        setSortOrder("desc");
        break;
      case "old-new":
        setSortField("created");
        setSortOrder("asc");
        break;
      case "price-high":
        setSortField("price");
        setSortOrder("desc");
        break;
      case "price-low":
        setSortField("price");
        setSortOrder("asc");
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const handleSortChangeMobile = (event) => {
    const { id } = event.target;
    switch (id) {
      case "new-old-mobile":
        setSortField("created");
        setSortOrder("desc");
        break;
      case "old-new-mobile":
        setSortField("created");
        setSortOrder("asc");
        break;
      case "price-high-mobile":
        setSortField("price");
        setSortOrder("desc");
        break;
      case "price-low-mobile":
        setSortField("price");
        setSortOrder("asc");
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const handleFilterChange = (event) => {
    const { id, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: checked
    }));
    setCurrentPage(1);
  };

  const filterVenues = (venues) => {
    return venues.filter((venue) => {
      const { wifi, parking, breakfast, pets } = filters;
      if (wifi && !venue.meta.wifi) return false;
      if (parking && !venue.meta.parking) return false;
      if (breakfast && !venue.meta.breakfast) return false;
      if (pets && !venue.meta.pets) return false;

      if (
        searchTerm &&
        !(
          venue.location.city
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          venue.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    });
  };

  const renderRating = (rating) => {
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

  const renderFeatures = (meta) => {
    return (
      <div className="flex gap-2.5 my-auto ">
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

  return (
    <Fade>
      <section className=" max-w-[1110px] mt-6 flex-col flex">
        <div className="hidden xl:w-full xl:flex">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="hidden xl:flex xl:flex-col p-6 rounded-lg custom-shadow primary-clr4 h-fit min-w-[270px]">
            <h2 className="text-black text-[16px] font-semibold mb-3">
              Sort by
            </h2>
            <div className="flex flex-col gap-2">
              <fieldset className="flex flex-col gap-1">
                <div className="flex flex-row gap-2">
                  <input
                    type="radio"
                    name="sort"
                    id="new-old"
                    className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-full z-10"
                    checked={sortField === "created" && sortOrder === "desc"}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="new-old" className="my-auto text-black">
                    Sort by newest venues
                  </label>
                </div>
                <div className="flex flex-row gap-2">
                  <input
                    type="radio"
                    name="sort"
                    id="old-new"
                    className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-full z-10"
                    checked={sortField === "created" && sortOrder === "asc"}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="old-new" className="text-black">
                    Sort by oldest venues
                  </label>
                </div>
                <div className="flex flex-row gap-2">
                  <input
                    type="radio"
                    name="sort"
                    id="price-high"
                    className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-full z-10"
                    checked={sortField === "price" && sortOrder === "desc"}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="price-high" className="text-black">
                    Price: High to low
                  </label>
                </div>
                <div className="flex flex-row gap-2">
                  <input
                    type="radio"
                    name="sort"
                    id="price-low"
                    className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-full z-10"
                    checked={sortField === "price" && sortOrder === "asc"}
                    onChange={handleSortChange}
                  />
                  <label htmlFor="price-low" className="text-black">
                    Price: Low to high
                  </label>
                </div>
              </fieldset>
            </div>
            <h2 className="text-black text-[16px] font-semibold my-3">
              Filter by
            </h2>
            <div className="flex flex-col gap-2">
              <h3 className="text-[14px] font-medium">Amenities</h3>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="parking"
                    className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
                    checked={filters.parking}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="parking" className="text-black">
                    {" "}
                    <FontAwesomeIcon
                      icon={faSquareParking}
                      className="primary-txt1 text-[20px] w-[25px]"
                    />{" "}
                    Parking
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="wifi"
                    className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
                    checked={filters.wifi}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="wifi" className="text-black">
                    {" "}
                    <FontAwesomeIcon
                      icon={faWifi}
                      className="primary-txt1 text-[20px] w-[25px]"
                    />{" "}
                    Wifi
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="pets"
                    className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
                    checked={filters.pets}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="pets" className="text-black">
                    {" "}
                    <FontAwesomeIcon
                      icon={faPaw}
                      className="primary-txt1 text-[20px] w-[25px]"
                    />{" "}
                    Pets allowed
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="breakfast"
                    className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
                    checked={filters.breakfast}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="breakfast" className="text-black">
                    {" "}
                    <FontAwesomeIcon
                      icon={faUtensils}
                      className="primary-txt1 text-[20px] w-[25px]"
                    />{" "}
                    Breakfast
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="collapse xl:hidden primary-clr4 rounded-lg custom-shadow max-w-[800px]">
            <input type="checkbox" />
            <div className="flex gap-2 text-xl font-medium collapse-title">
              <p className="primary-txt1">Show filters</p>{" "}
              <FontAwesomeIcon
                icon={faSliders}
                className="my-auto primary-txt1"
              />
            </div>
            <div className="collapse-content">
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-[14px]">Sort by</h3>
                  <fieldset className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        name="sort"
                        id="new-old-mobile"
                        className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-full z-10"
                        checked={
                          sortField === "created" && sortOrder === "desc"
                        }
                        onChange={handleSortChangeMobile}
                      />
                      <label htmlFor="new-old" className="my-auto text-black">
                        Sort by newest venues
                      </label>
                    </div>
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        name="sort"
                        id="old-new-mobile"
                        className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-full z-10"
                        checked={sortField === "created" && sortOrder === "asc"}
                        onChange={handleSortChangeMobile}
                      />
                      <label htmlFor="old-new" className="text-black">
                        Sort by oldest venues
                      </label>
                    </div>
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        name="sort"
                        id="price-high-mobile"
                        className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-full z-10"
                        checked={sortField === "price" && sortOrder === "desc"}
                        onChange={handleSortChangeMobile}
                      />
                      <label htmlFor="price-high" className="text-black">
                        Price: High to low
                      </label>
                    </div>
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        name="sort"
                        id="price-low-mobile"
                        className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-full z-10"
                        checked={sortField === "price" && sortOrder === "asc"}
                        onChange={handleSortChangeMobile}
                      />
                      <label htmlFor="price-low" className="text-black">
                        Price: Low to high
                      </label>
                    </div>
                  </fieldset>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-[14px] font-medium">Amenities</h3>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        id="parking"
                        className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
                        checked={filters.parking}
                        onChange={handleFilterChange}
                      />
                      <label htmlFor="parking" className="text-black">
                        {" "}
                        <FontAwesomeIcon
                          icon={faSquareParking}
                          className="primary-txt1 text-[20px] w-[25px]"
                        />{" "}
                        Parking
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        id="wifi"
                        className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
                        checked={filters.wifi}
                        onChange={handleFilterChange}
                      />
                      <label htmlFor="wifi" className="text-black">
                        {" "}
                        <FontAwesomeIcon
                          icon={faWifi}
                          className="primary-txt1 text-[20px] w-[25px]"
                        />{" "}
                        Wifi
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        id="pets"
                        className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
                        checked={filters.pets}
                        onChange={handleFilterChange}
                      />
                      <label htmlFor="pets" className="text-black">
                        {" "}
                        <FontAwesomeIcon
                          icon={faPaw}
                          className="primary-txt1 text-[20px] w-[25px]"
                        />{" "}
                        Pets allowed
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        id="breakfast"
                        className="checkbox border-2 w-[20px] h-[20px] border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
                        checked={filters.breakfast}
                        onChange={handleFilterChange}
                      />
                      <label htmlFor="breakfast" className="text-black">
                        {" "}
                        <FontAwesomeIcon
                          icon={faUtensils}
                          className="primary-txt1 text-[20px] w-[25px]"
                        />{" "}
                        Breakfast
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div></div>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex flex-col w-full gap-6">
              <Fade cascade damping={0.1} direction="right">
                {filterVenues(venues).map((venue) => (
                  <Link
                    key={venue.id}
                    to={`/venue/${venue.id}`}
                    className="flex flex-col xl:flex-row w-full max-w-[800px]"
                  >
                    <div className="rounded-l-lg custom-shadow">
                      {venue.media &&
                      venue.media.length > 0 &&
                      venue.media[0].url ? (
                        <img
                          src={venue.media[0].url}
                          className="h-[275px] xl:w-[350px] w-full rounded-t-lg xl:rounded-l-lg xl:rounded-tr-none object-cover"
                          alt={venue.media[0].alt || "Venue Image"}
                        />
                      ) : (
                        <img
                          src={DefaultMedia}
                          className="h-[275px] xl:w-[350px] w-full rounded-t-lg xl:rounded-l-lg xl:rounded-tr-none object-cover"
                          alt="Default Media if there is no image for the post"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2 p-4 rounded-b-lg xl:rounded-r-lg xl:rounded-bl-none primary-clr4 custom-shadow xl:max-w-[450px] w-full">
                      <div className="flex gap-2">
                        <p className="font-semibold text-[16px] truncate">
                          {venue.name}
                        </p>
                        <div className="h-[15px] w-[2px] primary-clr2 my-auto"></div>
                        <p className="font-medium text-[16px] primary-txt1 truncate">
                          {venue.location.city
                            ? venue.location.city
                            : "Undisclosed"}
                        </p>
                      </div>
                      <div className="flex flex-col gap-5">
                        <div className="flex gap-6">
                          <div className="rating rating-sm">
                            {renderRating(venue.rating || 0)}
                          </div>
                        </div>
                        <div className="max-w-[350px]  max-h-[85px]">
                          <p className=" text-[14px] font-light line-clamp-4	">
                            {venue.description
                              ? venue.description
                              : "There is no description for this venue. This could be an oversight or a test post that a developer has created in the hope that things are working."}
                          </p>
                        </div>
                        <div className="flex flex-row gap-2.5">
                          <p className="primary-txt1">
                            <FontAwesomeIcon
                              icon={faUsers}
                              className="text-[20px]"
                            />{" "}
                            <span className="text-[12px]">
                              {venue.maxGuests}
                            </span>
                          </p>
                          {venue.meta && renderFeatures(venue.meta)}
                        </div>
                        <p className="text-[10px] font-medium">
                          <span className="font-semibold text-[14px]">
                            {venue.price}
                          </span>{" "}
                          NOK / Night
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </Fade>
            </div>
          )}
        </div>
      </section>
      <div className="flex justify-end w-full max-w-[800px] xl:max-w-[1110px] mt-6">
        <div className="justify-end join custom-shadow">
          <button
            className="text-black border-none outline-none join-item btn primary-clr4 hover:bg-sky-600 hover:text-white"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={isFirstPage}
          >
            «
          </button>
          <button className="font-normal text-black border-none outline-none join-item btn primary-clr4 hover:bg-inherit">
            Page {currentPage} of {pageCount}
          </button>
          <button
            className="text-black border-none outline-none join-item btn primary-clr4 hover:bg-sky-600 hover:text-white text-[14px]"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={isLastPage}
          >
            »
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default VenueList;
