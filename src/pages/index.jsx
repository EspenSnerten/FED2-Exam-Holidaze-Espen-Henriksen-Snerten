import { Fade } from "react-awesome-reveal";
import Hero from "../components/Hero";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import About from "../components/About";
import Contact from "../components/Forms/Contact";
import LatestVenues from "../components/Crud/LatestVenues";

export default function IndexPage() {
  return (
    <>
      <div className="min-h-screen">
        <div className="hero-bg sm:min-h-[900px] min-h-[500px]">
          <Header />
          <Hero className=" hero-container" />
        </div>
        <Fade className="flex flex-col gap-28">
          <div className="flex flex-col mb-24 mt-[10vh]">
            <LatestVenues />
            <About />
            <Contact />
          </div>
        </Fade>
      </div>
      <Footer />
    </>
  );
}
