import React, { useContext, useRef } from "react";
//for the selection options in category and color we are using react select package
import { context } from "../../../Context/MainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Add() {
 const { openToast, API_BASE_URL, COLORS_BASE_URL } = useContext(context);
       const navigator = useNavigate();

  const formSubmitHandler = (e) => 
    {
      e.preventDefault();
      const name = e.target.name.value;
      const colorr = e.target.color.value;

      if (name != "" && colorr != "") {
        axios
          .post(API_BASE_URL + COLORS_BASE_URL + "/create", { name, colorr })
          .then((success) => {
            if (success.data.status === 1) {
              openToast(success.data.msg, "success");
              navigator("/admin/colors")
              e.target.reset();
            } else {
              openToast(success.data.msg, "error");
            }
          })
          .catch((error) => {
            openToast(error.message, "error");
          });
      } else {
        openToast("Pleaseee select all the fields ", "error");
      }
    }
  
  return (
    <div className="bg-[#393d3f] w-full min-h-screen overflow-hidden rounded-3xl p-5 md:m-2">
      <h1 className=" font-extrabold p-2 rounded-md text-2xl md:text-5xl ">
        Add Color
      </h1>
      <hr className="border border-black mb-4" />
      <div className="bg-[#374151] rounded-3xl p-4 shad hover:">
        <form
          encType="multipart/form-data"
          className="p-3"
          onSubmit={formSubmitHandler}
        >
          <div className="mb-5">
            <label
              htmlFor="color"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              <h1 className="text-black text-xl">Color Name</h1>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="dp bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#61677A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="Color"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              <h1 className="text-black text-xl">Color</h1>
            </label>
            <div className="rounded-full">
              <input
                type="color"
                id="color"
                name="color"
                // className="dp dark:bg-[#61677A] rounded-full "
                className="dp dark:bg-[#61677A] rounded-full border-2 border-white"
                style={{ width: "60px", height: "60px", padding: "1vh" }}
                required=""
              />
            </div>
          </div>

          <button
            type="submit"
            className="dp text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
