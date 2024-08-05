import React, { useContext, useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { context } from "../../../Context/MainContext";
import { MdEditNote } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

function View() {
  const [toggle, setToggle] = useState(false);

  const { Colors, fetchColor, API_BASE_URL, COLORS_BASE_URL, openToast } =
    useContext(context);

  const changeStatus = (id, new_status) => {
    axios
      .put(
        `${API_BASE_URL}${COLORS_BASE_URL}/change-status/${id}/${new_status}`  
      )
      .then((success) => {
        if (success.data.status) {
          openToast(success.data.msg, "Success");
          fetchColor();
        } else {
          openToast(success.data.msg, "Error");
        }
      })
      .catch((error) => {
        openToast("Client Side Error", "Error");
        console.log(error);
      });
  };

  const deleteData = (id) => {
    axios
      .delete(`${API_BASE_URL}${COLORS_BASE_URL}/delete/${id}`)
      .then((success) => {
        if (success.data.status == 1) {
          fetchColor();
          openToast(success.data.msg, "Success");
        } else {
          openToast(success.data.msg, "Error");
        }
      })
      .catch((Error) => {
        openToast("Client Side Error", "Error");
        console.log(Error);
      });
  };

  useEffect(() => {
    fetchColor();
  }, []);

  return (
    <div className="bg-[#393d3f] w-full min-h-screen overflow-hidden rounded-3xl p-5 md:m-2">
      <div className="flex justify-between items-center mb-2 text-2xl">
        <h1 className="font-extrabold p-2 rounded-md text-2xl md:text-5xl">
          Color Listing
        </h1>
        <NavLink to={"/admin/colors/add"}>
          <button className="dp hover:rotate-180 ml-auto flex items-center gap-1 bg-[#93B65A] rounded-3xl px-4 py-2">
            <IoMdAddCircleOutline />
          </button>
        </NavLink>
      </div>
      <hr className="border border-black mb-4" />

      <div className="overflow-auto max-h-[750px] rounded-3xl">
        <table className="w-full csm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 sticky top-0 bg-gray-50 dark:bg-gray-700"
              >
                S.No.
              </th>
              <th
                scope="col"
                className="px-6 py-3 sticky top-0 bg-gray-50 dark:bg-gray-700"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 sticky top-0 bg-gray-50 dark:bg-gray-700"
              >
                Color
              </th>
              <th
                scope="col"
                className="px-6 py-3 sticky top-0 bg-gray-50 dark:bg-gray-700"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 sticky top-0 bg-gray-50 dark:bg-gray-700"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Colors.map((cat, index) => {
              return (
                <tr
                  key={cat._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {cat.name}
                  </th>
                  <td
                    className="dp block px-4 py-4 rounded-full h-2 w-2 border-2 border-black"
                    style={{ backgroundColor: cat.code }}
                  ></td>
                  <td className="px-6 py-4">
                    {cat.status == true ? (
                      <button
                        onClick={() => {
                          changeStatus(cat._id, false);
                        }}
                        className="dp bg-[#93B65A] p-1 text-black rounded-xl"
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          changeStatus(cat._id, true);
                        }}
                        className="dp p-1 text-black rounded-xl bg-gray-400"
                      >
                        Inactive
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xl flex gap-3">
                    <NavLink
                      className="cursor-pointer"
                      to={"/admin/colors/edit/" + cat._id}
                    >
                      <MdEditNote className="cursor-pointer text-3xl" />
                    </NavLink>
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => {
                        deleteData(cat._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
  