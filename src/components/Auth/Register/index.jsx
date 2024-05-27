import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Fade } from "react-awesome-reveal";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: {
      url: ""
    },
    venueManager: false
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z0-9_]+$/;
    return nameRegex.test(name);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateAvatarUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, venueManager: !formData.venueManager });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = "Email must be a stud.noroff.no email";
    }
    if (!validateName(formData.name)) {
      newErrors.name =
        "Name must only contain letters, numbers, and underscores";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (formData.avatar.url && !validateAvatarUrl(formData.avatar.url)) {
      newErrors.avatar = "Invalid avatar URL";
    }

    if (Object.keys(newErrors).length === 0) {
      fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          document.getElementById("register-success-modal").showModal();
          setTimeout(() => {
            navigate({ to: "/login" });
          }, 500);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <section className="flex justify-center min-h-screen px-4">
        <form
          action=""
          className="flex flex-col  py-12 m-auto  max-w-[500px] w-full auth-form"
          onSubmit={handleSubmit}
        >
          <Fade direction="up">
            <div className="max-w-[400px] w-full mx-auto px-9">
              <h1 className="text-[24px] w-[250px] text-center mx-auto font-normal mb-4">
                Welcome to{" "}
                <span className="text-white pronounced-txt pronounced-txt-width">
                  Holi<span className="pronounced-txt-color">daze</span>
                </span>
              </h1>
              <div className="w-full form-group">
                <input
                  type="text"
                  autoComplete="given-name"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <label htmlFor="">Name</label>
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="w-full form-group">
                <input
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <label htmlFor="">Email</label>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="w-full form-group">
                <input
                  type="password"
                  autoComplete="password"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <label htmlFor="">Password</label>
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="w-full form-group">
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      avatar: { url: e.target.value }
                    })
                  }
                />
                <label htmlFor="">Profile picture URL</label>
                {errors.avatar && (
                  <p className="text-red-500">{errors.avatar}</p>
                )}
              </div>
              <div className="flex mx-auto mt-6">
                <input
                  type="checkbox"
                  className="checkbox border-2 border-black checked:border-sky-700 [--chkbg:theme(colors.sky.700)] [--chkfg:white] rounded-sm z-10"
                  onChange={handleCheckboxChange}
                />
                <button
                  className=" text-[16px] ml-2 primary-txt1 font-light z-10"
                  onClick={() =>
                    document.getElementById("host-info-modal").showModal()
                  }
                >
                  Register as a venue{" "}
                  <span className="font-semibold text-black transition-all hover:underline">
                    Host
                  </span>{" "}
                  <FontAwesomeIcon className="text-black" icon={faInfoCircle} />
                </button>
              </div>
              <div className="flex justify-center w-full mx-auto">
                <button className="text-white primary-clr3 w-[155px] mt-9 py-4 tracking-wider rounded-md custom-shadow btn outline-none border-none z-10">
                  Register
                </button>
              </div>
              <div className="flex flex-row mx-auto mt-14">
                <Link
                  to="/login"
                  className="font-bold mx-auto text-black text-[14px] tracking-wider hover:underline transition-all z-10"
                >
                  {" "}
                  <span className="font-normal primary-txt1">
                    Already have an account?
                  </span>{" "}
                  Login
                </Link>
              </div>
            </div>
          </Fade>
        </form>

        <dialog id="host-info-modal" className="modal">
          <div className="bg-white rounded-md modal-box">
            <form method="dialog">
              <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="text-lg font-bold">Want to be a host?</h3>
            <p className="py-4">
              As a venue host offering real estate for private use, you're
              opening doors to unique experiences and events.
            </p>
            <p>
              Whether it's a picturesque countryside barn, a chic urban loft, or
              a sprawling estate, your spaces become the canvas for countless
              memorable occasions.
            </p>
          </div>
        </dialog>

        <dialog id="register-success-modal" className="modal">
          <div className="flex flex-col gap-4 p-0 py-4 text-center rounded-md modal-box primary-clr4 w-[350px]">
            <h3 className="text-lg font-bold">Register successful!</h3>
            <FontAwesomeIcon
              icon={faCheck}
              className="pronounced-txt-color text-[64px]"
            />
            <p className="py-4">Redirecting you to the Login</p>
          </div>
        </dialog>
      </section>
    </>
  );
}
