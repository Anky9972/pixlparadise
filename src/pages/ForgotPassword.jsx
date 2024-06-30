import React, { useContext, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { CiMail } from "react-icons/ci";
import { Auth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const[mailSent,setMailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSignin, setSignup } = useContext(Auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://pixlparadise.onrender.com/api/v1/forgot-password",
        { email }
      );
      toast.success("Password reset email sent");
      setLoading(false);
      setMailSent(true)
    } catch (error) {
      console.error(error);
      alert("Error sending password reset email");
    }
  };

  if (mailSent) navigate("/confirm")

  return (
    <section className="flex flex-col md:flex-row md:justify-around w-full h-full bg-white fixed top-0 left-0">
      <div className="flex p-10 flex-col justify-center items-center lg:w-1/2 w-full h-full md:p-20 lg:p-10 gap-10">
        <div className="flex flex-col gap-5 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl lg:text-6xl font-bold text-[#ff7f53]">Forgot <br />Password?</h1>
          <p className="text-lg md:text-xl">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="relative w-full flex flex-col gap-5">
          <div className="relative w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="h-12 w-full px-10 py-4 font-bold border-b-2 outline-none"
            />
            <CiMail className="absolute left-2 top-3 text-red-400 text-2xl" />
          </div>
          <div className="w-full flex justify-between items-center mt-16">
            <span className="text-3xl font-bold">Send Link</span>
            <button
              type="submit"
              className="w-16 h-16 bg-[#f5221b] rounded-full flex justify-center items-center"
            >
              {loading ? (
                <ThreeDots width="38" color="#ffffff" />
              ) : (
                <img
                  src="https://cdn.prod.website-files.com/639b3e775b326dcf7cea3e70/639b3e775b326d53d1ea3ece_go-to-top.svg"
                  alt="go"
                  className="w-full h-full rotate-90 "
                />
              )}
            </button>
          </div>
        </form>
        <p className="mt-20 text-center md:text-left">
          Already have an account?{" "}
          <span
            onClick={() => {
              setSignup(false);
              navigate("/auth");
              setSignin(true);
            }}
            className="text-red-400 cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
        <img src="https://res.cloudinary.com/dj0eulqd8/image/upload/v1719670430/4498897_l1bw2d.jpg" alt="reset" className="w-full h-full object-contain" loading="lazy"/>
      </div>
    </section>
  );
};

export default ForgotPassword;
