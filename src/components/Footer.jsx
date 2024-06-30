// import React from 'react';
// import { Link } from 'react-router-dom';

// function Footer({mode,setMode}) {
//   return (
//     <footer className={`  h-[50vh] py-8 ${mode ? "bg-[#1e2125] text-[#E9DFCE] " : "bg-white text-[#f5221b]" } transition-all duration-300` }>
//       <div className="container mx-auto px-4 h-full flex flex-col justify-between">
//         <div className="flex flex-col  justify-between items-center h-full">
//           <div className="mb-4 md:mb-0">
//             <h2 className="text-2xl font-bold">PixlParadise</h2>
//           </div>
//           <div className="flex space-x-4 mb-4 md:mb-0">
//             <Link to="/" className="hover:text-gray-400">Home</Link>
//             <Link to="#features" className="hover:text-gray-400">Features</Link>
//             <Link to="/gallery" className="hover:text-gray-400">Gallery</Link>
//             <Link to="#how-it-works" className="hover:text-gray-400">How It Works</Link>
//             <Link to="#testimonials" className="hover:text-gray-400">Testimonials</Link>
//             <Link to="#contact" className="hover:text-gray-400">Contact</Link>
//           </div>
//           <div>
//             <p>&copy; 2024 PixlParadise. All rights reserved.</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
import React from 'react';
import { FaDiscord, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
const Footer = ({mode}) => {
  return (
    <footer className={`border-t border-gray-200 ${mode ? "bg-[#1e2125]" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row w-full justify-center items-center mb-8">
          <div className="flex items-center justify-center space-x-2  w-full">
            <img src="https://res.cloudinary.com/dj0eulqd8/image/upload/v1718885808/file_hzbgrt.png" alt="error" className="h-14" />
            <span className="text-4xl font-bold text-[#ff7f53]">Pixl Paradise</span>
          </div>
        </div>
        <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className=' mx-auto ml-6 lg:ml-0'>
            <h4 className={`text-sm font-bold tracking-wider uppercase ${mode ? "text-white":"text-gray-900"}`}>Product</h4>
            <ul className="mt-4 space-y-1">
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Headless CMS</a></li>
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Pricing</a></li>
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>GraphQL APIs</a></li>
            </ul>
          </div>
          <div className=' m-auto md:mx-auto lg:m-0'>
            <h4 className={`text-sm font-bold tracking-wider uppercase ${mode ? "text-white":"text-gray-900"}`}>Company</h4>
            <ul className="mt-4 space-y-1 ">
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>About </a></li>
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Careers</a></li>
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Logos and media</a></li>
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Changelog</a></li>
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Feature Requests</a></li>
            </ul>
          </div>
          <div className=' m-auto md:my-0 lg:m-0'>
            <h4 className={`text-sm font-bold tracking-wider uppercase ${mode ? "text-white":"text-gray-900"}`}>Explore</h4>
            <ul className="mt-4 space-y-1">
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>My feed</a></li>
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Case studies</a></li>
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Referral Program</a></li>
            </ul>
          </div>
          <div className=' m-auto md:md:my-0 lg:m-0'>
            <h4 className={`text-sm font-bold tracking-wider uppercase ${mode ? "text-white":"text-gray-900"}`}>Blogs</h4>
            <ul className="mt-4 space-y-1">
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Official Blog</a></li>
              <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Engineering Blog</a></li>
            </ul>
          </div>
          <div className=" hidden lg:flex  gap-10 lg:gap-6 text-2xl">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <FaDiscord/>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <FaGithub/>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600">
              <FaLinkedin/>
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600">
              <FaYoutube/>
            </a>
          </div>
          
        </div>
        <div className="flex flex-col justify-center items-center gap-3 md:justify-between md:items-center mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400">&copy; 2024 Pixl Paradise</p>
          <ul className="flex space-x-4">
            <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Privacy Policy</a></li>
            <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Terms</a></li>
            <li><a href="#" className={`text-sm  ${mode ? "text-gray-300 hover:text-gray-400" : "text-gray-600 hover:text-gray-900"}`}>Code of conduct</a></li>
          </ul>
        </div>
        <div className=" lg:hidden flex gap-10 text-xl w-full justify-center items-center mt-5">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <FaDiscord/>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <FaGithub/>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600">
              <FaLinkedin/>
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600">
              <FaYoutube/>
            </a>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
