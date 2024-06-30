import { useContext, useEffect, useState } from "react";
import { Auth } from "../context/Auth";
import { ThreeDots } from "react-loader-spinner";
import { FaApple, FaEye, FaEyeSlash, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {jwtDecode} from "jwt-decode";
import { IoMdCloseCircle } from "react-icons/io";
function Signup({ handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    formData,
    setFormData,
    setSignup,
    signup,
    handleSignup,
    setSignin,
    loading,
    handleGoogleSignup,
  } = useContext(Auth);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);

    handleGoogleSignup(response);
  };

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "816329215835-l1uhp8md0irt9muio9qshn2ssqoea843.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("google-signup"), {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "signup_with",
        shape: "pill",
        logo_alignment: "center",
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white px-8 py-6 rounded-3xl shadow-md w-full max-w-md md:max-w-xl xl:max-w-md md:py-12 lg:max-w-2xl lg:py-10 xl:py-6 relative">
        <span
          onClick={() => handleClose()}
          className="hover:cursor-pointer absolute top-4 right-4 text-slate-400 hover:text-red-400"
        >
          <IoMdCloseCircle className="text-2xl " />
        </span>
        <div className="text-center mb-6 md:mb-12 lg:mb-16 xl:mb-6">
          <img
            src="https://res.cloudinary.com/dj0eulqd8/image/upload/v1718885963/logonew2_pssiep.png"
            alt="Logo"
            className="mx-auto mb-4 w-12 h-12 shadow-xl shadow-blue-300 rounded-full"
          />
          <h2 className="text-2xl lg:text-3xl xl:text-2xl font-semibold mb-2">
            Create an account
          </h2>
          <p className="text-gray-600 lg:text-lg xl:text-sm">
            Please fill in the details to sign up.
          </p>
        </div>
        <div className="flex justify-center space-x-4 lg:space-x-2 mb-6 md:mb-12 lg:mb-16 xl:mb-6">
          <button className="w-10 md:w-28 h-10 lg:w-36 lg:h-16 xl:w-28 xl:h-10 bg-black text-white rounded-full flex items-center justify-center">
            <span className="sr-only">Sign in with Apple</span>
            <FaApple />
          </button>
            <div id="google-signup" className="flex justify-center items-center"></div>
          <button className="w-10 md:w-28 h-10 lg:w-36 lg:h-16 xl:w-28 xl:h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
            <span className="sr-only">Sign in with Twitter</span>
            <FaTwitter />
          </button>
        </div>
        <div className=" mb-4 md:mb-8 lg:mb-12 xl:mb-4 flex w-full justify-center items-center">
          <div className="h-[0.8px] w-1/2  bg-slate-300"></div>
          <span className="px-3 font-medium text-slate-500">OR</span>
          <div className="h-[0.8px] w-1/2 bg-slate-300"></div>
        </div>
        <form
          onSubmit={(e) => {
            handleSignup(e);
          }}
        >
          <div className="mb-4 md:mb-8 lg:mb-12 xl:mb-4">
            {/* <label className="block text-gray-700 mb-2" htmlFor="name">
          Full Name
        </label> */}
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your first name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>
          <div className="mb-6 md:mb-12 lg:mb-16 xl:mb-6">
            {/* <label className="block text-gray-700 mb-2" htmlFor="confirm-password">
          Confirm Password
        </label> */}
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Last name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>
          <div className="mb-4 md:mb-8 lg:mb-12 xl:mb-4">
            {/* <label className="block text-gray-700 mb-2" htmlFor="email">
          E-Mail Address
        </label> */}
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-4 md:mb-8 lg:mb-12 xl:mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute  right-3 mt-3"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="mb-4 md:mb-8 lg:mb-12 xl:mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 h-10 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 flex justify-center items-center"
          >
            {loading ? <ThreeDots width="38" color="#ffffff" /> : "Sign up"}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              className="text-red-400 hover:underline"
              onClick={() => {
                setSignup(false);
                setSignin(true);
              }}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
