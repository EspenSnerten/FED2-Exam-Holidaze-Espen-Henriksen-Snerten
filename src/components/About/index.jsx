import { Link } from "@tanstack/react-router";
import { Fade } from "react-awesome-reveal";
import AboutMedia from "/about-media.jpg";

export default function About() {
  return (
    <>
      <section
        id="about"
        className="flex justify-center mt-28 max-w-[1150px] mx-auto w-full px-4"
      >
        <div className="flex flex-row gap-12 mx-auto">
          <div className="hidden lg:flex max-w-[575px] max-h-auto">
            <Fade direction="up">
              <img src={AboutMedia} alt="" />
            </Fade>
          </div>
          <div className="flex flex-col gap-4 my-auto">
            <div className="flex flex-row gap-2.5">
              <h2 className="text-[20px] font-medium my-auto">About us</h2>
              <div className="h-[3px] w-[60px] primary-clr3 my-auto"></div>
            </div>
            <Fade delay={500}>
              <div className="flex flex-col gap-6 ">
                <div>
                  <h2 className="font-semibold text-[24px]">
                    Crafting Memories One
                  </h2>
                  <h2 className="font-semibold text-[24px]">trip at a time</h2>
                </div>
                <div className="flex lg:hidden max-w-[520px]">
                  <img src={AboutMedia} alt="" />
                </div>
                <p className="sm:text-justify tracking-wider max-w-[520px]">
                  Holidaze offers a platform where private individuals can
                  effortlessly share their exceptional spaces with travelers
                  seeking more than just a place to stay.{" "}
                </p>
                <p className="sm:text-justify tracking-wider max-w-[520px]">
                  Whether it's a cozy cabin nestled in the mountains, a chic
                  urban loft with skyline views, or a beachfront villa with the
                  sound of waves as your soundtrack, our diverse selection of
                  accommodations ensures that every traveler finds their perfect
                  match.
                </p>
                <div>
                  <Fade direction="up">
                    <Link
                      to="/register"
                      className="primary-clr3 px-12 py-3 btn hover rounded-md outline-none border-none my-auto text-white text-[14px] tracking-wider"
                    >
                      Become a host
                    </Link>
                  </Fade>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>
    </>
  );
}
