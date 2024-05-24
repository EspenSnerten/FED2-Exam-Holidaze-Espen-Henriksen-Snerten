import HeaderWithBg from "../components/Layout/HeaderWithBg";
import Footer from "../components/Layout/Footer";
import AdminUser from "../components/User/AdminUser";

export default function UserPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <HeaderWithBg />
        <div className="px-4">
          <div className="flex max-w-[1150px] mt-[10vh] mx-auto w-full">
            <div className="flex flex-row gap-2.5 mb-6">
              <h2 className="text-[20px] font-medium my-auto">My venues</h2>
              <div className="h-[3px] w-[60px] primary-clr3 my-auto"></div>
            </div>
          </div>

          <AdminUser />
        </div>
      </div>
      <Footer />
    </>
  );
}
