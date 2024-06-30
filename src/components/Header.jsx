import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Auth } from "../context/Auth";
import toast from "react-hot-toast";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const { setSignin, setSignup, setAuthPage, isLoggedIn, setIsLoggedIn, removeToken } = useContext(Auth);
  const [isOpen, setIsOpen] = useState(false);

  function handleGallery() {
    if (!isLoggedIn) {
      toast.error('Please log in to view gallery');
    }
  }

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`header h-20 w-full backdrop-blur-sm bg-opacity-10 fixed top-0 z-10 flex justify-between items-center px-5 transition-all duration-300 ${mode ? 'bg-gray-900 ' : 'bg-gray-100'}`}>
      <div className="flex justify-between items-center md:gap-10 w-full md:w-auto">
        <Link to="/" className="h-full w-12 md:w-16">
          <img src="https://res.cloudinary.com/dj0eulqd8/image/upload/v1718885808/file_hzbgrt.png" alt="error" loading="lazy" />
        </Link>
        <button className="md:hidden text-[#f5221b]" onClick={toggleMenu}>
          {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
        <div className="hidden md:flex gap-5 md:gap-14 justify-center items-center">
        <NavLink to="/explore" className={`font-bold ${mode ? 'text-[#E9DFCE]' : 'text-gray-900'} py-2`}>Explore</NavLink>
        <button onClick={() => setMode(!mode)}>{mode ? (<FaMoon className="text-white text-xl" />) : (<FaSun className="text-xl text-orange-500" />)}</button>
      </div>
      </div>
      
      <nav className={`hidden md:flex justify-center items-center ${mode ? 'text-[#E9DFCE]' : 'text-gray-900'}`}>
        <ul className="nav-links flex justify-center items-center gap-2 md:gap-3">
          <li className="w-auto h-8 p-2 flex justify-center items-center font-semibold">
            <NavLink to="/" className="py-1">Home</NavLink>
          </li>
          {isLoggedIn &&
            <li className="w-auto h-8 p-2 flex justify-center items-center font-semibold" onClick={handleGallery}>
              <NavLink to="/gallery" className="py-1">Gallery</NavLink>
            </li>
          }
          <li className="w-auto h-8 p-2 flex justify-center items-center font-semibold hover:cursor-pointer" onClick={() => { setSignin(true); setSignup(false); setAuthPage(true); handleLogout() }}>
            {isLoggedIn ? 'Log out' : 'Log in'}
          </li>
          {!isLoggedIn &&
            <li className="w-auto h-8 p-2 flex justify-center items-center font-semibold hover:cursor-pointer" onClick={() => { setSignup(true); setSignin(false); setAuthPage(true) }}>
              Sign up
            </li>
          }
        </ul>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`absolute top-20 left-0 w-full  backdrop-blur-md ${mode ? 'bg-gray-900 text-[#E9DFCE] ' : 'bg-white'} md:hidden`}
          >
            <ul className="flex flex-col items-center gap-4 p-4">
              <li className="w-auto h-8 p-2 flex justify-center items-center font-semibold">
                <NavLink to="/" className="py-1" onClick={toggleMenu}>Home</NavLink>
              </li>
              <li className="w-auto h-8 p-2 flex justify-center items-center font-semibold">
                <NavLink to="/explore" className="py-1" onClick={toggleMenu}>Explore</NavLink>
              </li>
              {isLoggedIn &&
                <li className="w-auto h-8 p-2 flex justify-center items-center font-semibold" onClick={() => { handleGallery(); toggleMenu(); }}>
                  <NavLink to="/gallery" className="py-1">Gallery</NavLink>
                </li>
              }
              <li className="w-auto h-8 p-2 flex justify-center items-center font-semibold hover:cursor-pointer" onClick={() => { setSignin(true); setSignup(false); setAuthPage(true); handleLogout(); toggleMenu(); }}>
                {isLoggedIn ? 'Log out' : 'Log in'}
              </li>
              {!isLoggedIn &&
                <li className="w-auto h-8 p-2 flex justify-center items-center font-semibold hover:cursor-pointer" onClick={() => { setSignup(true); setSignin(false); setAuthPage(true); toggleMenu(); }}>
                  Sign up
                </li>
              }
              <button onClick={() => setMode(!mode)} className="py-2">
                {mode ? (<FaMoon className="text-white text-xl" />) : (<FaSun className="text-xl text-orange-500" />)}
              </button>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
