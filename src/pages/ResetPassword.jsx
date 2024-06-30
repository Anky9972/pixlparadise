import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Auth } from "../context/Auth";

const ResetPassword = () => {
  const[success,setSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const { setSignin, setSignup } = useContext(Auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        `https://pixlparadise.onrender.com/api/v1/reset-password/${token}`,
        { newPassword }
      );
      toast.success("Password reset successful");
      setLoading(false);
      setSuccess(true);
      // navigate("/auth");
    } catch (error) {
      console.error(error);
      toast.error("Error resetting password");
      setLoading(false);
    }
  };
  if(success)navigate('/reset-success');

  return (
    <section className="flex flex-col lg:flex-row lg:justify-around w-full h-full lg:h-screen bg-white">
      <div className="flex flex-col h-screen justify-center items-center lg:w-1/2 w-full p-10 md:p-20 lg:p-10 gap-10">
        <div className="flex flex-col gap-5 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#ff7f53]">
            Reset Password?
          </h1>
          <p className="text-lg lg:text-xl">
            You're a step away from accessing your account!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 relative">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter Password"
              required
              className="h-12 w-full border-b-2 py-4 font-bold outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="h-12 w-full border-b-2 py-4 font-bold outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="w-full flex justify-between items-center mt-16">
            <span className="text-3xl font-bold text-[#ff7f53]">Reset</span>
            <button
              type="submit"
              className="w-16 h-16 bg-[#f5221b]  rounded-full flex justify-center items-center"
            >
              {loading ? (
                <ThreeDots width="38" color="#ffffff" />
              ) : (
                <img
                  src="https://cdn.prod.website-files.com/639b3e775b326dcf7cea3e70/639b3e775b326d53d1ea3ece_go-to-top.svg"
                  alt="go"
                  className="w-full h-full rotate-90"
                />
              )}
            </button>
          </div>
        </form>
        <p className="mt-20 text-center lg:text-left">
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
      <div className="hidden md:flex lg:w-1/2 w-full justify-center items-center p-10 lg:p-0">
        <img
          src="https://res.cloudinary.com/dj0eulqd8/image/upload/v1719670431/4860253_gsn4dt.jpg"
          alt="reset"
          className="w-full h-full object-contain lg:h-screen"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default ResetPassword;
