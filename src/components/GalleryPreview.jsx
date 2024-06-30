import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function GalleyPreview() {
  const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, [currentIndex]);

  const fetchImages = async () => {
    // setLoading(true);
    try {
      const response = await fetch(
        `https://pixlparadise.onrender.com/api/v1/getImages?limit=${10}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const json = await response.json();
      setImages(prevImages => [...prevImages, ...json]);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div
        className="gallery-container"
        style={{ display: "flex", overflowX: "hidden" }}
      >
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image.image_url}
            alt={`Image ${index + 1}`}
            style={{
              width: "100%",
              flexShrink: 0,
              marginRight: "10px",
              marginLeft: index === 0 ? `-${currentIndex * 100}%` : 0,
              transition: "margin-left 0.5s ease-in-out",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default GalleyPreview;
