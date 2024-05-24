import Footer from "../components/Layout/Footer";
import HeaderWithBg from "../components/Layout/HeaderWithBg";
import VenueList from "../components/Crud/Venues";

export default function VenuesPage() {
  return (
    <>
      <div className="min-h-screen">
        <HeaderWithBg />
        <div className="max-w-[1150px] mx-auto flex flex-col px-4  mt-24 mb-12">
          <div className="flex flex-row gap-2.5">
            <h2 className="text-[20px] font-medium my-auto">Our venues</h2>
            <div className="h-[3px] w-[60px] primary-clr3 my-auto"></div>
          </div>
          <VenueList />
        </div>
      </div>
      <Footer />
    </>
  );
}
