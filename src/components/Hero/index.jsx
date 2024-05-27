import { Fade } from "react-awesome-reveal";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col justify-center sm:mt-[100px] mt-[30px] text-center z-0">
        <Fade direction="up">
          <h1 className="sm:text-[36px] text-[20px] text-white">
            Embrace the{" "}
            <span className="pronounced-txt pronounced-txt-color">Journey</span>
          </h1>
          <h1 className="sm:text-[36px] text-[20px] text-white">
            Find Your Path
          </h1>
        </Fade>
      </div>
    </>
  );
}
