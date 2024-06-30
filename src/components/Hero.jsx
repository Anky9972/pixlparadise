import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function Hero({ mode }) {
  return (
    <section className={`relative w-full h-screen flex flex-col items-center justify-center gap-5 ${mode ? "bg-[#1e2125]" : "bg-white"} transition-all duration-300`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut',delay:0.6 }}
        className={`overflow-hidden w-11/12 text-center `}
      >
        <h1 className={`text-6xl md:text-[7rem] lg:text-[13rem] xl:text-[14rem] font-bold mb-8 md:mb-4 border-b ${mode ? "border-white text-[#E9DFCE]" : "border-[#f5221b] text-[#f5221b]"} transition-all duration-300 tracking-wide`}>
          Pixl Paradise
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{  duration: 1, ease: 'easeInOut',delay:0.8 }}
        className='w-11/12 h-1/2 overflow-hidden relative mb-20 md:mb-0'
      >
        <img src="https://res.cloudinary.com/dj0eulqd8/image/upload/v1718885622/steve-johnson-5_cW6EcK3oo-unsplash_mxsew4.jpg" alt="error" className=' w-full h-full rounded-lg shadow-lg' loading='lazy' />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut',delay:1 }}
        className='absolute bottom-10 flex justify-center items-center'
      >
        <NavLink to="/explore" className={`mb-32 md:mb-20 lg:hidden lg:mt-6 absolute ${mode ? "text-white" : "text-black"} transition-all duration-300`}>
          <button className={`'  md:text-2xl text-xl font-bold border px-10 py-4 hover:scale-90 rounded-full transition-all duration-300 ${mode ? "border-white":"border-[#ff7f53] text-[#ff7f53]"}`}>Explore</button>
        </NavLink>
      </motion.div>
    </section>
  );
}

export default Hero;
