import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        const responseData = data.data;

        localStorage.setItem("accessToken", responseData.accessToken);
        localStorage.setItem("user_email", responseData.email);
        localStorage.setItem("user_name", responseData.name);

        const apiKeyResponse = await fetch(
          "https://v2.api.noroff.dev/auth/create-api-key",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${responseData.accessToken}`
            },
            body: JSON.stringify({ name: "My API Key" })
          }
        );

        if (apiKeyResponse.ok) {
          const apiKeyData = await apiKeyResponse.json();

          localStorage.setItem("apiKey", apiKeyData.data.key);

          document.getElementById("login-success-modal").showModal();

          setTimeout(() => {
            navigate({ to: "/" });
          }, 500);
        } else {
          console.error("Failed to get API key:", apiKeyResponse.statusText);
          setErrorMessage(
            "Failed to sign in. Incorrect login info, please try again."
          );
        }
      } else {
        console.log("Login failed:", data);
        setErrorMessage("Incorrect login info, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Fade>
        <section className="flex justify-center min-h-screen px-4">
          <form
            action=""
            className="flex flex-col py-12 m-auto max-w-[500px] w-full auth-form"
            onSubmit={handleSubmit}
          >
            <Fade direction="up">
              <div className="max-w-[400px] w-full mx-auto px-9 justify-center flex flex-col">
                <h1 className="text-[24px] w-[250px] text-center mx-auto font-normal mb-4">
                  Welcome to{" "}
                  <span className="text-white pronounced-txt pronounced-txt-width">
                    Holi<span className="pronounced-txt-color">daze</span>
                  </span>
                </h1>
                <div className="form-group sm:min-w-[340px] w-full">
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <label htmlFor="">Email</label>
                </div>
                <div className="form-group sm:min-w-[340px] w-full">
                  <input
                    type="password"
                    autoComplete="password"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <label htmlFor="">Password</label>
                </div>
                <button
                  className="text-white primary-clr3 w-[155px] mt-9 mx-auto py-4 tracking-wider rounded-md custom-shadow z-10 btn outline-none border-none"
                  type="submit"
                >
                  Sign in
                </button>
                {errorMessage && (
                  <p className="absolute text-sm text-red-500 top-[280px]">
                    {errorMessage}
                  </p>
                )}
                <div className="flex flex-row mx-auto mt-14">
                  <p className="mr-1 text-[14px] tracking-wider primary-txt1">
                    Don't have an account?
                  </p>
                  <Link
                    to="/register"
                    className="font-bold text-black text-[14px] tracking-wider hover:underline transition-all z-10"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </Fade>
          </form>

          <dialog id="login-success-modal" className="modal">
            <div className="flex flex-col gap-4 p-0 py-4 text-center rounded-md modal-box primary-clr4 w-[350px]">
              <h3 className="text-lg font-bold">Login successful!</h3>
              <FontAwesomeIcon
                icon={faCheck}
                className="pronounced-txt-color text-[64px]"
              />
              <p className="py-4">Redirecting you to the homepage</p>
            </div>
          </dialog>
        </section>
      </Fade>
    </>
  );
}
