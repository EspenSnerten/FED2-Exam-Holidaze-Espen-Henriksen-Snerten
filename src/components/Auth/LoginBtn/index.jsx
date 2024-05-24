import { Link } from "@tanstack/react-router";

export default function LoginBtn() {
  return (
    <>
      <Link
        to="/login"
        my-auto
        className="px-4 w-full  btn md:btn-sm outline-none border-none py-1 text-[14px] my-auto tracking-widest text-white md:rounded-md rounded-none pronounced-txt primary-clr3 custom-shadow "
      >
        {" "}
        Login
      </Link>
    </>
  );
}
