import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios"
import { NavLink } from "react-router-dom";
import { context } from "../../../Context/MainContext";
import { MdEditNote } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
function View() 
{
  const {
    fetchProduct,
    products,
    productImageUrl = "",
    API_BASE_URL,
    PRODUCT_BASE_URL,
    openToast,
    fetchCategory,
  } = useContext(context);
  useEffect(() => {
    fetchProduct();
  }, []);
  //---------------------------------------delete----------------------------------------------
  const deleteData = (id) => {
    axios
      .delete(`${API_BASE_URL}${PRODUCT_BASE_URL}/delete/${id}`)
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
    //----------------------status change---------------------------------------------------------------
    const changeStatus = (id, new_status) => {
      axios
        .put(
          `${API_BASE_URL}${PRODUCT_BASE_URL}/change-status/${id}/${new_status}`
        )

        .then((success) => {
          if (success.data.status) {
            openToast(success.data.msg, "Success");
            fetchProduct();
          } else {
            openToast(success.data.msg, "Error");
          }
        })
        .catch((error) => {
          openToast("Client Side Error", "Error");
          console.log(error);
        });
    };
      //----------------------best seller---------------------------------------------------------------
        const changeBestSeller = (id, new_status) => {
          axios
            .put(
              API_BASE_URL +
                PRODUCT_BASE_URL +
                "/change-BestSellerStatus/" +
                id +
                "/" +
                new_status
            )
            .then((success) => {
              if (success.data.status) {
                openToast(success.data.msg, "Success");
                fetchProduct();
              } else {
                openToast(success.data.msg, "Error");
              }
            })
            .catch((error) => {
              openToast("Client Side Error", "Error");
              console.log(error);
            });
        };
  return (
    <div className="bg-[#393d3f] w-full min-h-screen overflow-hidden rounded-3xl p-5 md:m-2">
      <div className="flex justify-between items-center mb-2 text-2xl">
        <h1 className=" font-extrabold p-2 rounded-md text-2xl md:text-5xl ">
          Product Listing
        </h1>
        <NavLink to={"/admin/product/add"}>
          <button className="dp hover:rotate-180 ml-auto flex items-center gap-1 bg-[#93B65A] rounded-3xl px-4 py-2">
            <IoMdAddCircleOutline />
          </button>
        </NavLink>
      </div>
      <hr className="border border-black mb-4" />

      <div class="overflow-auto max-h-[750px] rounded-3xl">
        <table class="w-full csm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                S.No.
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Slug
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Colors
              </th>
              <th scope="col" class="px-6 py-3">
                Image
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => {
              return (
                <tr
                  key={prod._id}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {prod.name}
                    <hr />
                    <div className="flex items-center">
                      <h1 className="line-through opacity-50 mt-3">
                        ₹ {prod.price}
                      </h1>
                      <h1 className="mt-3 ml-2 text-xl">
                        ₹ {prod.price - prod.discount_price}
                      </h1>
                    </div>
                    {/* {prod.} */}
                  </th>
                  <td class="px-6 py-4">{prod.slug}</td>
                  <td class="px-6 py-4">{prod.category_id.name}</td>
                  <td class="px-6 py-6 grid grid-cols-2 ">
                    {prod.color?.map((c, i) => {
                      return (
                        <td
                          className="m-1 dp block px-4 py-4 rounded-full h-2 w-2 border-2 border-black"
                          style={{ backgroundColor: c.code }}
                        ></td>
                      );
                    })}
                  </td>

                  <td class="py-2">
                    {/* {prod.image} */}
                    <img
                      src={API_BASE_URL + productImageUrl + prod.image}
                      alt=""
                      className="object-scale-down w-28"
                    />
                  </td>
                  <td class="px-6 py-4">
                    {prod.status == true ? (
                      <button
                        onClick={() => {
                          changeStatus(prod._id, false);
                        }}
                        className="dp bg-[#93B65A] p-1 text-black rounded-xl"
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          changeStatus(prod._id, true);
                        }}
                        className="dp p-1 text-black rounded-xl bg-gray-400"
                      >
                        Inactive
                      </button>
                    )}
                    {prod.best_seller == true ? (
                      <button
                        onClick={() => {
                          changeBestSeller(prod._id,false);
                        }}
                        className="dp mt-3 bg-[#ebe575] p-1 text-black rounded-xl"
                      >
                        BestSeller
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          console.log(prod.best_seller)
                          changeBestSeller(prod._id, true);
                          console.log(prod.best_seller);

                        }}
                        className="dp p-1 mt-3 opacity-65 text-black rounded-xl bg-gray-400"
                      >
                        BestSeller
                      </button>
                    )}
                  </td>
                  <td class="px-6 py-4 text-xl flex gap-3">
                    <NavLink
                      className="cursor-pointer"
                      to={"/admin/product/edit/" + prod._id}
                    >
                      <MdEditNote className="cursor-pointer text-3xl" />
                    </NavLink>
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => {
                        deleteData(prod._id);
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

export default View