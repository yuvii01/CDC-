import React, { useContext, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { context } from "../../Context/MainContext";
import { MdDelete } from "react-icons/md";
import { removeFromCart, changeCartQty } from "../../reducers/CartSlice.js"; // Correct import path
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Cart() {

  const { fetchProduct, products, productImageUrl, API_BASE_URL } =
  useContext(context);

  const dispatcher = useDispatch();
  
  useEffect(() => {
    fetchProduct();
  }, []);

  const cart = useSelector((store) => store.cart);
  const cartProducts = [];
  for (let p of products) {
    for (let c of cart.data) {
      if (c.pId == p._id) {
        cartProducts.push({
          //creating combined obj having prod data and cart data
          ...c,
          ...p,
        });
      }
    }
  }
  //-----------------after login in changes handler----------------------------
  const user = useSelector((store) => store.user);
  const upateDbCart = (pId, newQty) => {
    // console.log(pId , newQty)
    if (user.data != null) {
      console.log(cart.data);
      axios.put("http://localhost:5000/cart/change-quantity", {
        user_id: user.data._id,
        pId,
        newQty,
      });
    }
  };
  const removeFromDbCart = (pId)=>{
    if(user.data != null)
    {
      axios
        .post("http://localhost:5000/cart/remove-from-cart",
          {pId,user_id:user.data._id})
        .then(() => {})
        .catch(() => {});
    }
  }
        useEffect(() => {
          window.scrollTo(0, 0); // Scroll to the top when this component mounts
        }, []);
  const navigator = useNavigate();
  const checkout=()=>{
    if(user.data!= null)
      {
        navigator("/checkout")

    }
    else{
      navigator("/login")
      alert('Please Login First')
    }
  }
  return (
    <div className="w-full h-screen px-7">
      <div className=" mt-32 relative overflow-auto bg-slate-100 rounded-3xl border border-gray-300 dp max-h-5/6 ">
        <table
          className="w-full text-sm text-left rtl:text-right text-gray-500 
        "
        >
          <thead className="text-xs text-gray-700 uppercase bg-slate-200 sticky top-0 z-10 ">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Product
              </th>
              <th></th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((cp, index) => (
              <tr key={index} className="">
                <td className="px-6 py-4">{cp.name}</td>
                <td>
                  <img
                    className="w-48 min-w-14"
                    src={API_BASE_URL + productImageUrl + cp.image}
                    alt=""
                  />
                </td>
                <td className="px-6 py-4 ">
                  ₹
                  {cp.discount_price.toLocaleString("en-IN", {
                    style: "decimal",
                  })}
                </td>
                <td className="px-6 py-4">
                  <div className="border border-black rounded-3xl flex justify-around px-3 py-1 items-center">
                    <button
                      className="font-black"
                      onClick={() => {
                        dispatcher(
                          changeCartQty({
                            pId: cp._id,
                            flag: true,
                            price: cp.discount_price,
                          })
                        );
                        upateDbCart(cp._id, cp.qty + 1);
                      }}
                    >
                      <h1 className="font-extrabold text-xl">+</h1>
                    </button>
                    <span>{cp.qty}</span>
                    <button
                      onClick={() => {
                        dispatcher(
                          changeCartQty({
                            pId: cp._id,
                            flag: false,
                            price: cp.discount_price,
                          })
                        );
                        upateDbCart(cp._id, cp.qty - 1);
                      }}
                    >
                      <h1 className="font-extrabold text-xl">-</h1>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  ₹
                  {(cp.discount_price * cp.qty).toLocaleString("en-IN", {
                    style: "decimal",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      dispatcher(
                        removeFromCart({
                          pId: cp._id,
                          total_price: cp.discount_price * cp.qty,
                        })
                      );
                      removeFromDbCart(cp._id);
                    }}
                    className="text-2xl text-red-400 cursor-pointer"
                  >
                    <MdDelete className="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky bottom-0 z-10">
            <tr>
              <td
                colSpan="6"
                className="text-right font-bold px-6 py-4 text-xl text-gray-500"
              >
                <h1 className="">
                  Total: ₹{" "}
                    {cart.total.toLocaleString("en-IN", { style: "decimal" })}
                </h1>
                <button 
                onClick={checkout}
                className="text-xl bg-[#c0e5a1] py-1 px-3 rounded-3xl dp">Checkout</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Cart;
