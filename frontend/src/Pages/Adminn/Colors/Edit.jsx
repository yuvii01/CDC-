import React, { useContext, useEffect, useRef, useState } from "react";
  import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { context } from "../../../Context/MainContext";
function View() {
  const { id } = useParams();
  const navigator = useNavigate();
  const { API_BASE_URL, COLORS_BASE_URL, openToast } = useContext(context);
  const [color, setColor] = useState({ name: "", code: "" });
  //---------------------------------auto loading the preexisting componenets of the color to be edited-----------------------------
  useEffect(() => 
    {
    if (id != undefined) {
      axios.get(API_BASE_URL + COLORS_BASE_URL + "/" + id).then((success) => {
        if (success.data.status === 1) {
          setColor(success.data.data);
        } else {
          openToast(success.data.msg, "error");
        }
      });
    } else {
    }
  }, [id, API_BASE_URL, COLORS_BASE_URL, openToast]);

    //-----------------------------------------Form submission--------------------------------------------
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const colorr = e.target.color.value;
    // console.log(name);
    // console.log(colorr);
    if (name != "" && colorr != "") {
      axios
        .post(`${API_BASE_URL}${COLORS_BASE_URL}/edit/${id}`, {
          name,
          colorr,
        })
        .then((success) => {
          if (success.data.status === 1) {
            openToast(success.data.msg, "success");
            navigator("/admin/colors");
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
  };
    //-------------------------------------------------------------------------------------
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
              value={color?.name} //adding ?so that no erro comes till the name loads
              onChange={(e) => {
                setColor({ ...color, name: e.target.value });
              }}
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
                value={color?.code} //adding ?so that no erro comes till the name loads
                onChange={(e) => {
                  setColor({ ...color, code: e.target.value });
                }}
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

export default View;
