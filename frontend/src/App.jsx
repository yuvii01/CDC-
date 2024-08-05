import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminMain from "./Pages/Adminn/Main";
import WebsiteMain from "./Pages/Website/Main";
import Home from "./Pages/Website/Home";

import Dashboard from "./Pages/Adminn/Dashboard";

import CategoryView from "./Pages/Adminn/Category/View"

import ProductsView from "./Pages/Adminn/Products/View"
import ProductsAdd from "./Pages/Adminn/Products/Add"
import ProductsEdit from "./Pages/Adminn/Products/Edit"

import ColorView from "./Pages/Adminn/Colors/View";
import ColorAdd from "./Pages/Adminn/Colors/Add";
import ColorEdit from "./Pages/Adminn/Colors/Edit";
import Store from "./Pages/Website/Store";
import { useDispatch } from "react-redux";
import { lsToCart } from "./reducers/CartSlice";
import Cart from "./Pages/Website/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { lsLogin } from "./reducers/UserReducer";
import Checkout from "./Pages/Website/Checkout";
import MyOrder from "./Pages/Website/MyOrder";
import OrderPlaced from "./Pages/OrderPlaced";

function App() {
  //means req should be sent with cookies
  // axios.defaults.withCredentials = true;
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(lsToCart());
    dispatcher(lsLogin());
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteMain />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/store/:category_slug?",
          element: <Store />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/my-orders",
          element: <MyOrder />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <Signup />,
    },
    {
      path: "/order-placed/:order_id",
      element: <OrderPlaced />,
    },
    {
      path: "/admin",
      element: <AdminMain />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "category",
          element: <CategoryView />,
        },
        {
          path: "product",
          element: <ProductsView />,
        },
        {
          path: "product/add",
          element: <ProductsAdd />,
        },
        {
          path: "product/edit/:id",
          element: <ProductsEdit />,
        },
        {
          path: "colors",
          element: <ColorView />,
        },
        {
          path: "colors/add/",
          element: <ColorAdd />,
        },
        {
          path: "colors/edit/:id",
          element: <ColorEdit />,
        },
      ],
    },
  ]);  
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
export default App; 
