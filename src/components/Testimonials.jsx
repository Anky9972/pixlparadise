import React, { useState } from "react";

const Testimonials = ({ mode }) => {
  const reviews = [
    {
      name: "John Doe",
      title: "Photographer",
      text: "PixlParadise has an amazing collection of high-quality images. It's my go-to resource for all my photography projects.",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Jane Smith",
      title: "Graphic Designer",
      text: "I love the variety and quality of images available on PixlParadise. It helps me create stunning designs every time.",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Michael Brown",
      title: "Content Creator",
      text: "PixlParadise offers the best royalty-free images. It's an invaluable resource for my content creation needs.",
      image: "https://via.placeholder.com/150"
    }
  ];

  const [currentReview, setCurrentReview] = useState(0);

  const handlePrevClick = () => {
    setCurrentReview((prevReview) =>
      prevReview === 0 ? reviews.length - 1 : prevReview - 1
    );
  };

  const handleNextClick = () => {
    setCurrentReview((prevReview) =>
      prevReview === reviews.length - 1 ? 0 : prevReview + 1
    );
  };

  const { name, title, image, text } = reviews[currentReview];

  return (
    <section className={`w-full flex flex-col items-center  justify-center py-12 px-4 md:px-10 lg:px-20 gap-10 md:gap-14  ${mode ? "bg-[#1e2125]" : "bg-white"}`}>
      <div className="flex justify-center md:justify-between items-center w-full max-w-6xl px-4 sm:px-6 md:px-5 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-[#ff7f53] tracking-wider uppercase">
          Reviews
        </h2>
        <div className="md:flex gap-5 hidden">
          <button
            onClick={handlePrevClick}
            className="text-gray-400 hover:text-[#ff7f53] border hover:border-[#ff7f53] w-10 h-10 flex justify-center items-center rounded-full"
          >
            <span className="sr-only">Previous</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
          </button>
          <button
            onClick={handleNextClick}
            className="text-gray-400 hover:text-[#ff7f53] border hover:border-[#ff7f53] w-10 h-10 flex justify-center items-center rounded-full"
          >
            <span className="sr-only">Next</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center lg:justify-around sm:flex-row sm:items-start gap-2 md:gap-10 w-full ">
        <div>
          <img
            className="w-48 h-48 md:w-72 md:h-72 rounded-full border-2 border-gray-300 shadow-lg"
            src={image}
            alt={name}
          />
        </div>
        <blockquote className="mt-6 flex flex-col justify-start py-10 h-full sm:mt-0 w-full sm:w-3/5 md:w-1/2 lg:w-2/5 text-center sm:text-left">
          <p className={` md:text-lg leading-relaxed ${mode ? "text-gray-300" : "text-gray-800"}`}>
            {text}
          </p>
          <footer className="mt-4 text-sm text-gray-500">
            <span className="font-semibold text-lg text-[#ff7f53]">{name}</span><br />
            {title}
          </footer>
        </blockquote>
        <div className="flex gap-20 md:hidden">
          <button
            onClick={handlePrevClick}
            className="text-gray-400 hover:text-[#ff7f53] border hover:border-[#ff7f53] w-10 h-10 flex justify-center items-center rounded-full"
          >
            <span className="sr-only">Previous</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
          </button>
          <button
            onClick={handleNextClick}
            className="text-gray-400 hover:text-[#ff7f53] border hover:border-[#ff7f53] w-10 h-10 flex justify-center items-center rounded-full"
          >
            <span className="sr-only">Next</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
