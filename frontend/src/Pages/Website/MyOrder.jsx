import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { context } from "../../Context/MainContext";

export default function MyOrder() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when this component mounts
  }, []); 
  const { API_BASE_URL, productImageUrl } = useContext(context);
  const user = useSelector((store) => store.user);
  const navigator = useNavigate();
  const [orders, setOrder] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const lsUser = localStorage.getItem("user");
    if (!lsUser) {
      navigator("/login");
    }
  }, [navigator]);

  useEffect(() => {
    if (user.data) {
      setFormData({
        name: user.data.name,
        email: user.data.email,
        image: user.data.image,
      });
    }
  }, [user]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("userId", user.data._id);
        
        if (formData.image) {
          data.append("image", formData.image);
        }
        // console.log(data)
    axios
      .post(`${API_BASE_URL}/user/update`, data)
      .then((response) => {
        setIsEditMode(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="w-full h-screen mt-32 mx-auto">
      <h1 className="bg-slate-200 w-fit px-4 py-2 rounded-3xl m-2 text-2xl font-bold">
        User Profile
      </h1>
      <div className="dp flex flex-col m-3 rounded-3xl p-4 bg-slate-200 gap-2 ">
        {!isEditMode ? (
          <>
            {user.data ? (
              <>
                <div>name: {user.data.name}</div>
                <div>email: {user.data.email}</div>
                <div>image: {user.data.image}</div>
                <button
                  onClick={toggleEditMode}
                  className="dp btn btn-primary bg-green-200 w-fit rounded-3xl px-4 py-2 mx-auto"
                >
                  Edit
                </button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </>
        ) : (
          <form
            onSubmit={handleFormSubmit}
            className="bg-slate-300 p-4 rounded-3xl"
          >
            <div className="form-group mt-2 p-1 rounded-lg">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-2 p-1">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-2 p-1">
              <label htmlFor="image">Image: </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              // onClick={toggleEditMode}
              className="btn btn-primary mt-5 rounded-3xl px-4 py-2 bg-green-200 mr-5 dp"
            >
              Save
            </button>
            <button
              type="button"
              onClick={toggleEditMode}
              className="btn btn-primary mt-5 rounded-3xl px-4 py-2 bg-red-200 mr-5 dp"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
      <div className="p-3">
        <h1 className="bg-slate-200 w-fit px-4 py-2 rounded-3xl m-2 text-2xl font-bold">
          Your Orders
        </h1>
        <div className="relative max-h-[600px] overflow-auto bg-slate-100 rounded-3xl border border-gray-300 dp">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-slate-200 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Order Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    {order.product_details.map((item, j) => (
                      <div key={j + 1}>
                        <h1 className="text-lg">
                          {j + 1}. {item.name}
                        </h1>
                        <h1 className="text-black">
                          ₹{item.discount_price} × {item.qty}
                        </h1>
                        <hr />
                      </div>
                    ))}
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4">₹{order.order_total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="sticky bottom-0 z-10">
              <tr>
                <td
                  colSpan="6"
                  className="text-right font-bold px-6 py-4 text-xl text-gray-500"
                >
                  {/* Total: ₹{cart.total.toLocaleString("en-IN", { style: "decimal" })} */}
                  {/* <button
                    onClick={checkout}
                    className="text-xl bg-[#c0e5a1] py-1 px-3 rounded-3xl dp"
                  >
                    Checkout
                  </button> */}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
