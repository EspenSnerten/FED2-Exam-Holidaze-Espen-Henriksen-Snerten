import { Link } from "@tanstack/react-router";
import { Fade } from "react-awesome-reveal";
import "../Styles/footer.css";
import TwitterIcon from "../Icons/twitter-icon.png";
import FacebookIcon from "../Icons/facebook-icon.png";
import InstagramIcon from "../Icons/instagram-icon.png";
import HolidazeLogo from "/holidaze-logo.png";

export default function Footer() {
  return (
    <>
      <Fade>
        <footer className="flex flex-col w-full footer-bg1">
          <div className="flex flex-col justify-center gap-5 mx-auto my-5">
            <div className="flex mx-auto">
              <img
                src={HolidazeLogo}
                alt=""
                className="min-w-[96px] max-w-[120px]"
              />
            </div>
            <nav className="flex flex-row gap-2.5">
              <Link to="/" className="transition-all hover:underline">
                Home
              </Link>
              <Link to="/#contact" className="transition-all hover:underline">
                Contact
              </Link>
              <Link to="/venues" className="transition-all hover:underline">
                Venues
              </Link>
              <Link to="/#about" className="transition-all hover:underline">
                About us
              </Link>
            </nav>
            <div className="flex flex-row gap-5 mx-auto">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={InstagramIcon} alt="" className="w-[25px] h-auto" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={FacebookIcon} alt="" className="w-[25px] h-auto" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={TwitterIcon} alt="" className="w-[25px] h-auto" />
              </a>
            </div>
          </div>
          <div className="flex w-full py-2 footer-bg2">
            <Fade direction="up" className="mx-auto">
              <p className="mx-auto text-white text-[12px] font-thin">
                Copyright © 2024{" "}
                <span className="font-medium">Holidaze Inc.</span> All rights
                reserved.
              </p>
            </Fade>
          </div>
        </footer>
      </Fade>
    </>
  );
}
