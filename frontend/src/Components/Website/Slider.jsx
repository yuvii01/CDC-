import React, { useState, useEffect } from "react";

const images = [
  "./Slider/adidas.jpg",
  "./Slider/aj1lows.jpg",
  "./Slider/converse.jpg",
  "./Slider/highestintheroom.jpg",
  "./Slider/newbalance.jpg",
  "./Slider/yeezy.jpg",
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleImages = 4;
  const totalImages = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - visibleImages : prevIndex - visibleImages
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= totalImages - visibleImages ? 0 : prevIndex + visibleImages
    );
  };

  return (
    <div className="relative w-11/12 h-full mx-auto rounded-3xl overflow-x-clip bg-transparent ">
      <div
        className="flex transition-transform duration-1000 ease-in-out gap-3"
        style={{
          transform: `translateX(-${(currentIndex / totalImages) * 100}%)`,
        }}
      >
        {[...images, ...images].map((image, index) => (
          <div
            key={index}
            className="dp w-[350px] h-96 rounded-3xl flex-shrink-0 relative group"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:rotateY-10 group-hover:scale-105 group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 bg-black bg-opacity-50">
              <span className="text-white text-2xl font-bold">Shop</span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full ml-4"
      >
        ❮
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full mr-4"
      >
        ❯
      </button>
    </div>
  );
};

export default Slider;
