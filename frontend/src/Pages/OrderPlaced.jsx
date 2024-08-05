import React from "react";
import { useParams } from "react-router-dom";

function OrderPlaced() {
  const { order_id } = useParams();
  return (
    <div className="w-full h-screen bg-zinc-300 flex items-center justify-center p-2">
      <div className="p-2 bg-gray-400 flex justify-center items-center h-1/2 w-full flex-col md:w-1/2 rounded-3xl dp">
        <img
          className="w-1/2 h-1/2 object-contain"
          src="\images\logo.png"
          alt=""
        />
        <h1 className="text-2xl text-white">Your Order has been Placed!</h1>
        <p className=" dp mt-3 py-2 px-4 rounded-3xl text-xl text-white bg-[#393D3F]">Order ID: {order_id}</p>
      <button className="bg-slate-200 px-4 py-2 mt-3 rounded-3xl dp">
        <a href="/">Back to Store</a>
      </button>
      </div>
    </div>
  );
}
export default OrderPlaced;
