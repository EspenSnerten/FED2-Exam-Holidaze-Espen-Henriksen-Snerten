import Register from "../components/Auth/Register";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

export default function RegisterPage() {
  return (
    <>
      <div className="min-h-screen auth-bg">
        <Header />
        <Register />
      </div>
      <Footer />
    </>
  );
}
