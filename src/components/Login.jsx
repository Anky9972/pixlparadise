import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../context/Auth";
import { ThreeDots } from "react-loader-spinner";
import ForgotPassword from "../pages/ForgotPassword";
import { FaApple, FaEye, FaEyeSlash, FaTwitter } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { jwtDecode } from "jwt-decode";

const Login = ({ handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgot, setForgot] = useState(false);
  const {
    credentials,
    setCredentials,
    handleLogin,
    setSignup,
    signup,
    setSignin,
    loading,
    handleGoogleLogin,
    setUser,
  } = useContext(Auth);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);

    handleGoogleLogin(response);
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "816329215835-l1uhp8md0irt9muio9qshn2ssqoea843.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("google-signin"),
      {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "pill",
        logo_alignment: "center",
      }
    );
  }, []);

  return (
    <>
      {forgot ? (
        <ForgotPassword />
      ) : (
        <div className="flex items-center justify-center min-h-screen ">
          <div className="bg-white px-8 py-4  md:p-8 rounded-3xl shadow-md max-w-md md:max-w-3xl lg:max-w-2xl xl:max-w-md md:py-16 lg:py-16 xl:p-8 relative">
            <span
              onClick={handleClose}
              className="absolute top-4 right-4 hover:cursor-pointer text-slate-400 hover:text-red-400"
            >
              <IoMdCloseCircle className="text-2xl" />
            </span>
            <div className="text-center mb-6 md:mb-12 lg:mb-16 xl:mb-6">
              <img
                src="https://res.cloudinary.com/dj0eulqd8/image/upload/v1718885963/logonew2_pssiep.png"
                alt="Logo"
                className="mx-auto mb-4 w-12 h-12 rounded-full shadow-xl shadow-blue-300"
              />
              <h2 className="text-2xl font-semibold mb-2 lg:text-3xl xl:text-2xl">
                Welcome back
              </h2>
              <p className="text-gray-600 lg:text-lg xl:text-sm">
                Please enter your details to sign in.
              </p>
            </div>
            <div className="flex justify-center space-x-2 lg:space-x-2 mb-6 md:mb-12 lg:mb-16 xl:mb-6">
              <button className="flex w-10 md:w-28 h-10 lg:w-36 lg:h-14 xl:w-28 xl:h-10 bg-black text-white rounded-full  items-center justify-center">
                <span className="sr-only">Sign in with Apple</span>
                <FaApple />
              </button>
              <div
                id="google-signin"
                className="flex justify-center items-center "
              ></div>
              <button className="flex w-10 md:w-28 h-10 lg:w-36 lg:h-14 xl:w-28 xl:h-10 bg-blue-500 text-white rounded-full  items-center justify-center">
                <span className="sr-only">Sign in with Twitter</span>
                <FaTwitter />
              </button>
            </div>
            <div className="mb-4 md:mb-8 lg:mb-12 xl:mb-4 flex w-full justify-center items-center">
              <div className="h-[0.8px] w-1/2 bg-slate-300"></div>
              <span className="px-3 font-medium text-slate-500">OR</span>
              <div className="h-[0.8px] w-1/2 bg-slate-300"></div>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4 md:mb-8 lg:mb-12 xl:mb-4 text-left">
                <label
                  className="block text-black font-semibold mb-2"
                  htmlFor="email"
                >
                  E-Mail Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  autoComplete="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter your email..."
                />
              </div>
              <div className="mb-6 md:mb-12 lg:mb-16 xl:mb-6 text-left font-semibold relative">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter Password."
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  autoComplete="password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute  right-3 mt-3 text-lg"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex items-center justify-between  gap-10 mb-4 md:mb-8 lg:mb-12 xl:mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-black font-semibold">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-red-400 hover:underline"
                  onClick={() => setForgot(true)}
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 h-10 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 flex justify-center items-center"
              >
                {loading ? <ThreeDots width="28" color="#ffffff" /> : "Sign in"}
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account yet?{" "}
                <a
                  href="#"
                  className="text-red-400 hover:underline"
                  onClick={() => {
                    setSignin(false);
                    setSignup(true);
                  }}
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
