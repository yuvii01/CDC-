import axios from "axios";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../reducers/UserReducer";
import { context } from "../Context/MainContext";
import { useDispatch, useSelector } from "react-redux";
import { dbtoCart } from "../reducers/CartSlice";
function Login() {
  const dispatcher = useDispatch();
  const navigator = useNavigate();
  const { openToast } = useContext(context);
  // to import data of cart
  const cart = useSelector((store) => store.cart);

  const loginHandler = (e) => {
    e.preventDefault();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios.post("http://localhost:5000/user/login", data).then((success) => {
      // console.log(adminEmail, adminPassword);
      // console.log(data.email, data.password);

      if (success.data.status === 1) {
        if (data.email === adminEmail && data.password === adminPassword) 
          {
          try {
            // console.log("broooooooooooo")
            navigator("/admin");
          } catch (error) {
            console.error("Error during authentication:", error);
          }
        } else {
          dispatcher(
            login({
              token: success.data.token,
              user: success.data.user,
            })
          );
          stateToCart(success.data.user._id);
          // e.target.reset();
          navigator("/");
        }
      } else {
        openToast(success.data.msg, "error");
      }
    });
  };
  // already agar without login data dala ho to vo add ho jaye login hone ke baad
  const stateToCart = (userId) => {
    axios
      .post("http://localhost:5000/cart/state-to-cart/" + userId, {
        state_cart: cart.data,
      })
      .then((success) => {
        if (success.data.status === 1) {
          let total = 0;
          // console.log(success.data.userCart)
          const cartData = success.data.userCart.map((c) => {
            total += c.pId.discount_price * c.qty;
            return {
              pId: c.pId._id,
              qty: c.qty,
            };
          });
          dispatcher(dbtoCart({ data: cartData, total }));
        }
      })
      .catch((error) => {});
  };
  return (
    <div>
      <section className="bg-[#61677a] h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-48 p-3" src="\images\logo.png" alt="logo" />
          </a>
          <div className="w-full bg-[#272829] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 shad">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-400 md:text-2xl">
                Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={loginHandler}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 ">
                        Remember me
                      </label>
                    </div>
                  </div> */}
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Log in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <NavLink
                    to="/sign-up"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
