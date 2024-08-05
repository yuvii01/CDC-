import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/MainContext";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
function Dashboard() {
  
  const { fetchProduct, products, productImageUrl, API_BASE_URL } =
    useContext(context);
  const user = useSelector((store) => store.user);

      useEffect(() => {
        if (user.data) {
          setFormData({
            name: user.data.name,
            email: user.data.email,
            image: user.data.image,
          });
        }
      }, [user]); 
  const [orders, setOrder] = useState([]);
  useEffect(() => {
    if (orders.length === 0) {
      axios
        .post(`${API_BASE_URL}/order/get-orders`, {
          user_id: user.data?._id,
        })
        .then((response) => {
          setOrder(response.data.orders);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [orders, user, API_BASE_URL]);
    const formatDate = (isoString) => {
      const date = new Date(isoString);
      return date.toLocaleString();
    };
  return (
    <div className="bg-[#393d3f] w-full min-h-screen overflow-hidden rounded-3xl p-5 md:m-2">
      <div className="flex justify-between items-center mb-2 text-2xl">
        <h1 className="font-extrabold p-2 rounded-md text-2xl md:text-5xl">
          Dashboard
        </h1>
      </div>
      <hr className="border border-black mb-4" />

      <div className="overflow-auto max-h-[750px] rounded-3xl">
        <table className="w-full csm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-[#1F2937]">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>

              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th>User</th>
            </tr>
          </thead>
          <tbody className="">
            {orders.map((order, i) => (
              <tr key={i}>
                <td className="px-6 py-4">{i+1}</td>

                <td className="px-6 py-4">
                  {order.product_details.map((item, j) => (
                    <div key={j + 1}>
                      <h1 className="text-lg">
                        {j + 1}. {item.name}
                      </h1>
                      <h1 className="text-black">
                        ₹{item.discount_price} × {item.qty}
                      </h1>
                      {/* <hr /> */}
                    </div>
                  ))}
                </td>
                <td>{formatDate(order.createdAt)}</td>
                <td className="px-6 py-4">₹{order.order_total}</td>
                <td className="px-6 py-4">
                  <div className=" flex">
                    <div className="text-[#61677A]">UserEmail :</div>
                    {order.user_id.email}
                  </div>
                  <br />
                  <div className=" flex">
                    <div className="text-[#61677A]">Address :</div>
                    {order.shipping_details.address}
                  </div>
                  <div className=" flex">
                    <div className="text-[#61677A]">PinCode :</div>
                    {order.shipping_details.pincode}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard