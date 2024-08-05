import React, { useContext, useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { context } from "../../Context/MainContext";
import { BsCartPlus } from "react-icons/bs";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../reducers/CartSlice";
import axios from "axios";
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
  const { productImageUrl, API_BASE_URL } =
    useContext(context);
  const productRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  const dispatcher = useDispatch()
  useEffect(() => {
    gsap.from(productRef.current, {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: "power1.out",
    }); 
  }, []);
  const user = useSelector((state) => state.user);
  const addtoDbCart = (pId) => {
    if(user.data != null){
      axios.post("http://localhost:5000/cart/add-to-cart",{user_id:user.data._id,pId})
      .then(
        ()=>{
          
        }
      )
      .catch(
        ()=>{

        }
      )
    }
  }

  const cartItems = useSelector((state) => state.cart.data);
  const cartItem = cartItems.find((item) => item.pId === _id);
  const handleClick = () => {
    dispatcher(addToCart({ price:discount_price,pId: _id, qty: 1 }));
    addtoDbCart(_id);
    setIsClicked(!isClicked);
  };

  return (
    <div
      ref={productRef}
      className="w-[300px] h-[500px] rounded-md shadow text-center bg-gray-200 dp flex flex-col items-center justify-center p-2"
    >
      <img
        src={API_BASE_URL + productImageUrl + image}
        className="mx-auto my-4 block w-64 h-2/3 object-contain object-center overflow-y-auto"
        alt=""
      />
      <Stars yellow={rating} />

      <div className="font-bold">{name}</div>
      <div className="my-4 flex flex-col gap-2 items-center w-full">
        {discount_percent === 0 ? (
          <span className="text-[#FF4858]">₹{price}</span>
        ) : (
          <>
            <span className="text-[#FF4858] mr-1">₹{discount_price}</span>
            <span className="text-[#C1C8CE] line-through">₹{price}</span>
            <span className="text-[#c0e5a1] ml-2">(₹{discount_percent})</span>
          </>
        )}
        <div className="flex w-full justify-center shrink-0 gap-5 relative">
          <button
            onClick={handleClick}
            className={`p-1 dp rounded-3xl flex  items-center gap-3 transition-colors px-3 duration-300 ${
              isClicked ? "bg-green-500" : "bg-slate-400"
            }`}
          >
            {isClicked ? (
              <BsFillCartCheckFill className="text-2xl" />
            ) : (
              <BsCartPlus className="text-2xl " />
            )}
          </button>
          {cartItem && cartItem.qty > 1 && (
            <div className="dp absolute bottom-2 right-24 mt-2 font-bold bg-slate-300 p-1 z-0 rounded-3xl text-md">
              + {cartItem.qty}
            </div>
          )}
        </div>
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
