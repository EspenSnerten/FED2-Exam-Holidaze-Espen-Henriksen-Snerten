import HeaderWithBg from "../components/Layout/HeaderWithBg";
import Footer from "../components/Layout/Footer";
import Venue from "../components/Crud/Venue";

export default function VenuePage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <HeaderWithBg />
        <Venue />
      </div>
      <Footer />
    </>
  );
}
