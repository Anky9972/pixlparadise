import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const AboutPage = ({ mode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const imgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <section className={`flex flex-col md:flex-row justify-center items-center gap-10 lg:gap-32 py-8 ${mode ? "bg-[#1e2125]" : "bg-white"} transition-all duration-300`}>
      <div className="w-full md:w-1/3 flex justify-center px-4 md:px-0">
        <motion.img
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={imgVariants}
          src="https://res.cloudinary.com/dj0eulqd8/image/upload/v1718886125/about_gedfzx.jpg"
          alt="About us"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="w-full md:w-1/2 p-8 flex flex-col justify-center items-start md:ml-5"
      >
        <h1 className={`text-4xl md:text-6xl xl:text-8xl font-bold mb-6 ${mode ? "text-[#E9DFCE]" : "text-[#ff7f53]"} text-center md:text-left transition-all duration-300`}>
          About Us
        </h1>
        <p className={`mb-4 text-base md:text-lg leading-relaxed ${mode ? "text-gray-300" : "text-gray-800"} transition-all duration-300`}>
          Welcome to <span className="font-semibold">Pixl Paradise</span>, your ultimate destination for storing and exploring stunning images. Our platform offers a seamless experience for photographers, artists, and enthusiasts to upload, manage, and discover beautiful images from around the world.
        </p>
        <div className="text-center md:text-left mt-8">
          <Link
            to="/contact"
            className={`border border-[#ff7f53] font-semibold py-2 px-10 text-lg md:text-xl ${mode ? "text-[#E9DFCE] bg-[#ff7f53]" : "text-[#ff7f53]"} rounded-lg transition-all duration-300 hover:bg-[#ff7f53] hover:text-white`}
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutPage;
