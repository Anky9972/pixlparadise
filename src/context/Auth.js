import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  saveToken,
  getToken,
  removeToken,
  saveUserIdInCookies,
} from "../components/AuthService";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

export const Auth = createContext();

const AuthContextProvider = ({ children }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [signin, setSignin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [authPage, setAuthPage] = useState(false);
  const [email, setEmail] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const url = "https://pixlparadise.onrender.com/api/v1/signup";
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        toast.error(json.msg);
        setLoading(false);
      }
      if (json.success) {
        toast.success("Signup successful");
        setLoading(false);
        setSignin(true);
        setSignup(false);
      }
    } catch (e) {
      console.error("Error during signup:", e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://pixlparadise.onrender.com/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log("json res in login", json);
      if (json.success) {
        setIsLoggedIn(true);
        saveToken(json.token);
        toast.success("Successfully Logged In");
        setLoading(false);
        setAuthPage(false);
        saveUserIdInCookies(json.userId);
        setUserId(json.userId);
        setEmail(json.email);
      } else {
        toast.error(json.msg);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    console.log("response", response);
    const userObject = jwtDecode(response.credential);
    const tokenId = response.credential;
    try {
      const res = await fetch("https://pixlparadise.onrender.com/api/v1/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenId: tokenId,
        }),
      });
      // Save the token and user info as needed
      const json = await res.json();
      console.log("json in google", json);
      if (json) {
        saveToken(json.token);
        saveUserIdInCookies(json.userId); // Assuming the user ID is in the 'sub' field

        setIsLoggedIn(true);
        setAuthPage(false);
        setUserId(json.userId);
        setEmail(json.email);
        setUser(userObject);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleGoogleSignup = async (response) => {
    try {
      const tokenId = response.credential; // Extract the id_token

      const res = await fetch("https://pixlparadise.onrender.com/api/v1/google-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenId: tokenId,
        }),
      });

      const json = await res.json();
      console.log("Response from backend:", json);

      if (json.success) {
        saveToken(json.token);
        saveUserIdInCookies(json.userId); // Assuming the user ID is in the 'sub' field

        setIsLoggedIn(true);
        setAuthPage(false);
        setUserId(json.userId);
        setEmail(json.email);
      }
    } catch (error) {
      console.error("Error in Google signup:", error);
    }
  };

  const setUser = (userObject) => {
    setCredentials({
      email: userObject.email,
      password: "", // Password is not needed here
    });
    // You can add more user info to the state if needed
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const states = {
    credentials,
    setCredentials,
    signin,
    setSignin,
    signup,
    setSignup,
    handleLogin,
    handleSignup,
    isLoggedIn,
    setIsLoggedIn,
    formData,
    setFormData,
    removeToken,
    loading,
    authPage,
    setAuthPage,
    userId,
    email,
    handleGoogleLogin,
    setUser,
    handleGoogleSignup,
  };

  return <Auth.Provider value={states}>{children}</Auth.Provider>;
};

export default AuthContextProvider;
