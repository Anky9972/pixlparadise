import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../context/Auth";

const MailConfirm = () => {
  const { setSignin, setSignup } = useContext(Auth);
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center w-full h-full bg-white p-4 md:p-10">
      <div className="flex flex-col h-screen items-center justify-center w-full max-w-lg gap-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#ff7f53] text-center">Check your email</h1>
        <img src="https://res.cloudinary.com/dj0eulqd8/image/upload/v1719670433/3497810_vnl6uj.jpg" alt="mail" className="w-full object-cover" loading="lazy"/>
        <p className="text-center px-4 md:px-8">
          We just sent an email to your inbox with a link to reset your password.
        </p>
        <div className="flex justify-between items-center w-full mt-4">
          <button
            type="button"
            className="w-16 h-16 bg-[#f5221b] -rotate-90 rounded-full flex justify-center items-center"
            onClick={() => {
              setSignup(false);
              navigate("/auth");
              setSignin(true);
            }}
          >
            <img
              src="https://cdn.prod.website-files.com/639b3e775b326dcf7cea3e70/639b3e775b326d53d1ea3ece_go-to-top.svg"
              alt="go"
              className="w-full h-full"
            />
          </button>
          <span
            className="text-2xl md:text-3xl font-bold text-[#ff7f53] mt-4 md:mt-0 cursor-pointer"
            onClick={() => {
              setSignup(false);
              navigate("/auth");
              setSignin(true);
            }}
          >
            Sign in
          </span>
        </div>
      </div>
    </section>
  );
};

export default MailConfirm;
