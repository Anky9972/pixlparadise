import React from 'react';
 

function Newsletter({ mode }) {
  return (
    <section className={`py-12 px-6 md:px-10 w-full flex flex-col md:flex-row justify-center items-center gap-10 ${mode ? "bg-[#1e2125]" : "bg-white"}`}>
      <div className="w-full md:w-1/2 h-full flex justify-center md:justify-end">
        <img src="https://res.cloudinary.com/dj0eulqd8/image/upload/v1718886068/newsletter_y29tjc.png" alt="Newsletter illustration" className="w-2/3 md:w-full " />
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff7f53] mb-4">
          Subscribe to our <br className="hidden md:block" /> newsletter!
        </h2>
        <p className={`text-gray-500 mb-6 text-base md:text-lg ${mode ? "text-gray-300" : ""}`}>
          Get the latest updates and offers right in <br className="hidden md:block" /> your inbox.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center md:justify-start mt-10 gap-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 md:w-4/5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7f53]"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#ff7f53] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
