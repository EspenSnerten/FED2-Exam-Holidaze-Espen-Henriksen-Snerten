import Login from "../components/Auth/Login";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

export default function LoginPage() {
  return (
    <>
      <div className="min-h-screen auth-bg">
        <Header />
        <Login />
      </div>
      <Footer />
    </>
  );
}
