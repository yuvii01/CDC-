import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const context = createContext();

export default function mainContext(props) 
{
  const[loader,setLoader] = useState(false)
  //-------------------------------category url-----------------------------------
  const [Category, setCategory] = useState([]);
  const [categoryImageUrl, setCategoryImageUrl] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const CATEGORY_BASE_URL = import.meta.env.VITE_CATEGORY_BASE_URL;

  const fetchCategory = async () => {
    await axios
      .get(`${API_BASE_URL}${CATEGORY_BASE_URL}`)
      .then((success) => {
        // console.log("Fetch category success:", success.data);
        if (success.data.status === 1) {
          setCategory(success.data.category);
          setCategoryImageUrl(success.data.imageBaseUrl);
        } else {
          console.error("Error while fetching category");
        }
      })
      .catch((error) => {
        console.error("Error while fetching category", error.message);
      });
  };

  //------------------------------color----------------------------------------------
  const [Colors, setColors] = useState([]);
  const COLORS_BASE_URL = import.meta.env.VITE_COLORS_BASE_URL;

  const fetchColor = async () => {
    await axios
      .get(`${API_BASE_URL}${COLORS_BASE_URL}`)
      .then((success) => {
        // console.log("Fetch color success:", success.data);
        if (success.data.status === 1) {
          setColors(success.data.data);
        } else {
          console.error("Error while fetching Color");
        }
      })
      .catch((error) => {
        console.error("Error while fetching Color", error.message);
      });
  };

  // -------------------------PRODUCT-----------------------------------------
  const [products, setProducts] = useState([]);
  const [productImageUrl, setProductImageUrl] = useState([]);
  const PRODUCT_BASE_URL = import.meta.env.VITE_PRODUCT_BASE_URL;

  const fetchProduct = async (limit = 0,color_id=null,category_slug=0) => {
    const urlQuery = new URLSearchParams({ limit, color_id, category_slug });
    await axios
      .get(`${API_BASE_URL}${PRODUCT_BASE_URL}?${urlQuery.toString()}`)
      .then((success) => {
        if (success.data.status === 1) {
          setProducts(success.data.product);
          setProductImageUrl(success.data.imageBaseUrl);
        } else {
          console.error("Error while fetching Product");
        }
      })
      .catch((error) => {
        console.error("Error while fetching Product", error.message);
      });
  };
  
    //-------------------------bestsetller prod---------------------------------
    const[bestseller,setBestseller] = useState([]);
    const[bestsellerImgURl,setBestsellerImgURl] = useState([])
      const fetchBestSeller = async () => {
        await axios 
          .get(`${API_BASE_URL}${PRODUCT_BASE_URL}/best-seller/`)
          .then((success) => {
            if (success.data.status === 1) {
              setBestseller(success.data.product);
              setBestsellerImgURl(success.data.imageBaseUrl);
            } else {
              console.error("Error while fetching Product");
            }
          })
          .catch((error) => {
            console.error("Error while fetching Product", error.message);
          });
      };

  const openToast = (msg, flag) => {
    toast(msg, {
      type: flag,
    });
  };

  useEffect(() => {
    fetchCategory();
    fetchColor();
  }, []);

  return (
    <context.Provider
      value={{
        openToast,
        fetchCategory,
        API_BASE_URL,
        CATEGORY_BASE_URL,
        fetchColor,
        Category,
        categoryImageUrl,
        Colors,
        COLORS_BASE_URL,
        PRODUCT_BASE_URL,
        fetchProduct,
        products,
        productImageUrl,
        setLoader,
        bestseller,
        bestsellerImgURl,
        fetchBestSeller,
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.8)",
          display: loader ? "flex" : "none",
        }}
        className="loader top-0 left-0 fixed flex justify-center items-center h-screen w-full z-20"
      >
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <ToastContainer />
      {props.children}
    </context.Provider>
  );
}

export { context };
