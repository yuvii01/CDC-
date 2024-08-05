import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { context } from '../../Context/MainContext';
import axios from 'axios';
import { emptyCart } from '../../reducers/CartSlice';
import useRazorpay from "react-razorpay";
function Checkout() {
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top when this component mounts
    }, []);
  const { fetchProduct, products, productImageUrl, API_BASE_URL } =
    useContext(context);
    const [Razorpay] = useRazorpay();
      const navigator = useNavigate()
      const dispatcher = useDispatch()
      const cart = useSelector((store) => store.cart);
      const user  = useSelector((store)=>store.user);
      const [cartProducts , setCartProducts] = useState([]);
      useEffect(
        ()=>{
            fetchProduct()
        },[]
      )
      useEffect(
        ()=>{
            const data = []
            for (let p of products) {
            for (let c of cart.data) {
                if (c.pId == p._id) {
                data.push({
                    //creating combined obj having prod data and cart data
                    ...c,
                    ...p,
                });
                }
            }
            }
            setCartProducts(data)
        },[cart,products]
      )
     const formSubmitHandler=(e)=>{
        e.preventDefault();
        const shipping_details = {
          name: e.target.name.value,
          email: e.target.email.value,
          contact: e.target.contact.value,
          address: e.target.address.value,
          pincode: e.target.pincode.value,
        }
        const payment_mode = e.target.payment_modee.value;
        // console.log(payment_mode)
        const order_total = cart.total + (payment_mode == "2" ? 50 :0)
        axios.post("http://localhost:5000/order/place-order", {
          payment_mode,
          order_total,
          shipping_details,
          product_details: cartProducts,
          user_id: user.data._id,
        })
        .then(
          (success)=>{
            // console.log(success.data)
            if(success.data.status == 1)
            {
              dispatcher(emptyCart())
              if(payment_mode == 1){
                // console.log(success.data.order_id);
                navigator("/order-placed/"+ success.data.order_id)
              }
              else{
                initRazorpayOrder(success.data.order_id ,order_total,success.data.razor_order.id,shipping_details)
              }
            }
          }
        )
     }
     const initRazorpayOrder=(order_id,amount,razorpay_order_id,userData)=>{
        const options = {
          key: "rzp_test_2qgRJ9mQue9a9P", // Enter the Key ID generated from the Dashboard
          amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "CrepDogCrew",
          description: "Test Transaction",
          image: "images/logo.png",
          order_id: razorpay_order_id,
          handler: function (razorpay_response) {
            // console.log("success", razorpay_response);
            axios.post("http://localhost:5000/order/payment-success" , {order_id , razorpay_response}).then(
              (success)=>{
                if(success.data.status == 1 )
                {
                  navigator("/order-placed/" + success.data.order_id);
                }
                else{
                }
              }
            )
          },
          prefill: {
            name: userData.name,
            email: userData.email,
            contact: userData.contact,
          },
          theme: { 
            color: "#393D3F",
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          console.log("failed payment",response);
          axios
            .post("localhost://localhost:5000/order/payment-failed", {
              order_id,
              razorpay_response,
            })
            .then(() => {})
            .catch(() => {});
        });
        rzp1.open();
     }
  return (
    <div className="w-full flex flex-wrap">
      <div className=" w-full md:w-1/2  max-h-screen px-2 mt-32 ">
        <div className=" relative overflow-auto bg-slate-100 rounded-3xl border border-gray-300 dp h-5/6 ">
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
                  Total
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
                    ×
                    {cp.qty.toLocaleString("en-IN", {
                      style: "decimal",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    ₹
                    {(cp.discount_price * cp.qty).toLocaleString("en-IN", {
                      style: "decimal",
                    })}
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
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="min-h-screen w-full flex items-center justify-center md:mt-12 p-6 md:w-1/2">
        <div className="bg-slate-200 text-gray-700 p-8 rounded-3xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Signup Form
          </h2>
          <form onSubmit={formSubmitHandler}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                defaultValue={user.data?.name}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                defaultValue={user.data?.email}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="contact"
              >
                Contact
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="tel"
                id="contact"
                name="contact"
                placeholder="Your Contact Number"
                defaultValue={user.data?.contact}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="address"
                name="address"
                placeholder="Your Address"
                defaultValue={user.data?.address}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="pincode"
              >
                Pincode
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="pincode"
                name="pincode"
                placeholder="Your Pincode"
                defaultValue={user.data?.pincode}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Payment Method
              </label>
              <div className="flex items-center mb-2">
                <input
                  className="mr-2 leading-tight"
                  type="radio"
                  id="cod"
                  name="payment_modee"
                  defaultValue="1"
                  required
                />
                <label className="text-sm" htmlFor="cod">
                  COD (₹ 50 extra)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="mr-2 leading-tight"
                  type="radio"
                  id="razorpay"
                  name="payment_modee"
                  defaultValue="2"
                  required
                />
                <label className="text-sm" htmlFor="razorpay">
                  Razorpay
                </label>
              </div>
            </div>
            <button
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Proceed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout