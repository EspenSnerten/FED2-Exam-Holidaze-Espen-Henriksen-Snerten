import { Fade } from "react-awesome-reveal";
import AuthMedia from "/auth-bg.jpg";

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        className="flex flex-col mt-28 justify-center max-w-[1150px] mx-auto w-full px-4 relative"
      >
        <div className="absolute hidden xl:flex w-full max-w-[1120px]  mx-auto">
          <img
            src={AuthMedia}
            alt="A geometric picture"
            className="h-[400px] w-full  object-cover"
          />
        </div>
        <Fade delay={300}>
          <form
            action=""
            className="flex mx-auto flex-col xl:max-w-[400px] max-w-[520px] custom-shadow auth-form xl:ml-14"
          >
            <div className="flex flex-col justify-center w-full py-12 mx-auto rounded-lg px-9 xl:bg-none bg-[url('/auth-bg-blur.jpg')] bg-cover bg-center">
              <div>
                <h2 className="text-[24px]">
                  Get in{" "}
                  <span className="pronounced-txt pronounced-txt-color text-[22px]">
                    Touch
                  </span>
                </h2>
                <h2 className="text-[24px]">with us</h2>
              </div>
              <div className="form-group sm:min-w-[300px] w-full">
                <input type="text" autoComplete="given-name" required />
                <label htmlFor="">First Name</label>
              </div>
              <div className="form-group sm:min-w-[300px] w-full">
                <input type="text" autoComplete="family-name" required />
                <label htmlFor="">Last Name</label>
              </div>
              <div className="form-group sm:min-w-[300px] w-full">
                <input type="text" autoComplete="email" required />
                <label htmlFor="">Email</label>
              </div>
              <div className="form-group sm:min-w-[300px] w-full">
                <input type="text" required />
                <label htmlFor="">Subject</label>
              </div>
              <div className="form-group sm:min-w-[300px] w-full">
                <textarea
                  name=""
                  required
                  id=""
                  className="z-10 p-1 bg-transparent border-b-2 outline-none placeholder:text-black placeholder:text-[14px] placeholder:font-medium border-b-black"
                ></textarea>
                <label htmlFor="">Your message</label>
              </div>
              <Fade direction="up" className="mx-auto">
                <button className="z-10 mt-9 text-white border-none rounded-md outline-none btn primary-clr3 max-w-[155px] mx-auto">
                  Send Message
                </button>
              </Fade>
            </div>
          </form>
        </Fade>
      </section>
    </>
  );
}
