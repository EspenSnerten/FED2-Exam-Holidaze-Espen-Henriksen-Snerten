import { useState } from "react";
import { Link } from "@tanstack/react-router";
import LoginBtn from "../../Auth/LoginBtn";
import LoggedInUser from "../../User/LoggedInUser";
import LoggedInMobileUser from "../../User/LoggedInMobileUser";
import HolidazeLogo from "/holidaze-logo.png";
import HolidazeBlackLogo from "/holidaze-black-logo.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="w-full px-4 pt-4">
        <nav className="max-w-[1150px] w-full flex flex-row mx-auto">
          <div className="flex justify-center w-full mx-auto">
            <div>
              {" "}
              <Link to="/" className="flex ">
                <img
                  className="h-auto my-auto min-w-[96px] max-w-[140px]"
                  src={HolidazeLogo}
                  alt="Holidaze Logo"
                />
              </Link>
            </div>
            <div className="justify-end hidden w-full gap-4 my-auto md:flex">
              <Link
                to="/venues"
                className="px-2 py-1 my-auto text-white pronounced-txt text-[14px] tracking-widest"
              >
                Venues
              </Link>
              <Link
                to="/#contact"
                className="px-2 py-1 my-auto text-white pronounced-txt text-[14px] tracking-widest"
              >
                Contact
              </Link>
              <div className="z-40 flex my-auto">
                {accessToken && apiKey ? <LoggedInUser /> : <LoginBtn />}
              </div>
            </div>

            <div className="flex justify-end w-full md:hidden">
              <button
                className="z-20 flex my-auto text-white"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="black"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div
        className={`custom-shadow primary-clr4  top-0 absolute z-10 w-full text-center md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav>
          <ul className="flex flex-col gap-6 text-center">
            <div className="pt-7">
              <img
                src={HolidazeBlackLogo}
                alt=""
                className="w-[120px] mx-auto h-auto"
              />
            </div>
            <li>
              <Link
                to="/venues"
                className="px-2 py-1 my-auto text-black font-medium text-[16px] tracking-widest"
              >
                Venues
              </Link>
            </li>
            <li>
              <Link
                to="/#contact"
                className="px-2 py-1 my-auto text-black font-medium text-[16px] tracking-widest"
              >
                Contact
              </Link>
              <div className="z-40 flex justify-center w-full mx-auto mt-6">
                {accessToken && apiKey ? <LoggedInMobileUser /> : <LoginBtn />}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
