import React, { useContext, useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { context } from "../../Context/MainContext";
import { BsCartPlus } from "react-icons/bs";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from '../../reducers/CartSlice';

gsap.registerPlugin(ScrollTrigger);

function ProductBox({
  _id,
  name,
  image,
  price,
  discount_price,
  discount_percent,
  rating,
}) {
  const { productImageUrl, API_BASE_URL, bestsellerImgURl } = useContext(context);
  const productRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const dispatcher = useDispatch();

  useEffect(() => {
    // Create a GSAP animation for the product box
    const animation = gsap.from(productRef.current, {
      // opacity: 1,
      y: 100, // Start from 100 pixels below
      duration: 0.3,
      ease: "power1.out",
      scrollTrigger: {
        // markers:true,
        trigger: productRef.current,
        start: "top 80%", // Trigger when the top of the product box is 80% from the top of the viewport
        end: "top 40%", 
        toggleActions: "play none none reverse", // Play the animation on scroll down and reverse it on scroll up
      },
    });

    return () => {
      // Cleanup the ScrollTrigger instance
      animation.scrollTrigger;
    };
  }, []);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      ref={productRef}
      className="w-[300px] h-[500px] rounded-md shadow text-center bg-gray-200 dp flex flex-col items-center justify-center p-2"
    >
      <img
        src={API_BASE_URL + bestsellerImgURl + image}
        className="mx-auto my-4 block w-64 h-2/3 object-contain object-center overflow-y-auto"
        alt={name}
      />
      <Stars yellow={rating} />
      <div className="font-bold">{name}</div>
      <div className="my-4 flex flex-col gap-2 items-center">
        {discount_percent === 0 ? (
          <span className="text-[#FF4858]">₹{price}</span>
        ) : (
          <>
            <span className="text-[#FF4858] mr-1">₹{discount_price}</span>
            <span className="text-[#C1C8CE] line-through">₹{price}</span>
            <span className="text-[#c0e5a1] ml-2">(₹{discount_percent})</span>
          </>
        )}
        <button
          onClick={handleClick}
          className={`p-2 rounded-full transition-colors duration-300 ${
            isClicked ? "bg-green-500" : "bg-slate-400"
          }`}
        >
          {isClicked ? (
            <BsFillCartCheckFill className="text-2xl" />
          ) : (
            <BsCartPlus
              onClick={() => {
                dispatcher(addToCart({ pId: _id, pty: 1 }));
              }}
              className="text-2xl"
            />
          )}
        </button>
      </div>
    </div>
  );
}

function Stars({ yellow }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= yellow) {
      stars.push(<FaStar key={i} color="#FFC600" />);
    } else {
      stars.push(<FaStar key={i} color="#C1C8CE" />);
    }
  }
  return <div className="flex justify-center mt-[30px]">{stars}</div>;
}

export default ProductBox;
