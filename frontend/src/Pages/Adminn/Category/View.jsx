import React, { useContext, useRef, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios"
import { context } from "../../../Context/MainContext";
import { FaTrash } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
function View() {
  const [toggle, setToggle] = useState(false);
  const {
    openToast,
    fetchCategory,
    API_BASE_URL,
    CATEGORY_BASE_URL,
    Category,
    categoryImageUrl,
  } = useContext(context);

  const nameRef = useRef();
  const slugRef = useRef();

  const titleToSlug = () => {
    // this function is to automatically get what we type in category name to slug
    const slug = nameRef.current.value
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("'", "");
    slugRef.current.value = slug;
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const slug = event.target.slug.value;
    const image = event.target.image.files[0];

    if (name != "" && slug != "" && image != undefined) 
    {
      // as we have to submit a image also therefore using .post(`${API_BASE_URL + CATEGORY_BASE_URL}/create`, { name, slug }) and sending info as a JS object wont work thereyby we try submitting this as a form 

      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("image", image);

      axios
        .post(API_BASE_URL + CATEGORY_BASE_URL+/create/, formData)
        .then((success) => {
          if (success.data.status == 1) {
            event.target.reset();
            fetchCategory();
            openToast(success.data.msg, "Success");
            setToggle(false);
          } else {
            openToast(success.data.msg, "Error");
          }
        })
        .catch((Error) => {
          console.log(Error);
        });
    }
  };
  const deleteData=(id)=>{
    axios
      .delete(API_BASE_URL + CATEGORY_BASE_URL + "/delete/" + id)
      .then((success) => {
        if (success.data.status == 1) {
          fetchCategory();
          openToast(success.data.msg, "Success");
          fetchCategory();
        } else {
          openToast(success.data.msg, "Error");
        }
      })
      .catch((Error) => {
        openToast("Client Side Error", "Error");
        console.log(Error);
      });
      
      useEffect(() => {
        fetchCategory();
      }, []);
  }
  const changeStatus=(id,new_status)=>{
    axios.put(API_BASE_URL +CATEGORY_BASE_URL+"/change-status/"+id+"/"+new_status)
    .then(
      (success) => {
        if (success.data.status) {
          openToast(success.data.msg, "Success");
          fetchCategory();

        } else {
          openToast(success.data.msg, "Error");
        }
      }).catch(
        (error) => {
          openToast("Client Side Error", "Error");
          console.log(error);
        }
      )
  }
  return (
    <div className="bg-[#393d3f] w-full min-h-screen overflow-hidden rounded-3xl p-5 md:m-2">
      <div className="flex justify-between items-center mb-2 text-2xl">
        <h1 className=" font-extrabold p-2 rounded-md text-2xl md:text-5xl ">
          Category Listing
        </h1>
        <button
          onClick={() => {
            setToggle(true);
          }}
          className="hover:rotate-180 dp ml-auto flex items-center gap-1 bg-[#93B65A] rounded-3xl px-4 py-2"
        >
          <IoMdAddCircleOutline color="" />
        </button>
      </div>
      <hr className="border border-black mb-4" />
      <div
        className={`fixed top-0 left-0 
        ${toggle ? "z-[9999]" : "-z-[99]"}
        // todo gsap here
        transition-opacity duration-500 ease-in-out
        w-full h-full
        flex justify-center items-center
      
        ${toggle ? "backdrop-filter backdrop-blur-md" : ""}`}
      >
        <div
          className="
          w-[60%] mx-auto
          bg-zinc-300 shadow
          rounded-xl
          overflow-hidden
          p-3
          border border-black dark:border-black" // Add the desired border
        >
          <div
            className="
            text-3xl font-semibold p-3
            flex justify-between items-center gap-3"
          >
            <h1 className="font-extrabold border p-2 rounded-md ">
              Add Category
            </h1>
            <IoCloseSharp
              onClick={() => {
                setToggle(false);
              }}
            />
          </div>
          {/* //!adding below line to enable file addition in the form   */}
          <form
            encType="multipart/form-data"
            className="p-3"
            onSubmit={formSubmitHandler}
          >
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                <h1 className="text-black text-xl">Category</h1>
              </label>
              <input
                onChange={titleToSlug}
                ref={nameRef}
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#61677A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                <h1 className="text-black text-xl">Category slug</h1>
              </label>
              <input
                readOnly
                ref={slugRef}
                type="text"
                id="slug"
                name="slug"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#61677A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                <h1 className="text-black text-xl">Category Image</h1>
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="bg-[#61677A]"
                required=""
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
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
            {Category.map((cat, index) => {
              return (
                <tr
                  key={cat._id}
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
                    {cat.name}
                  </th>
                  <td class="px-6 py-4">{cat.slug}</td>
                  <td class="py-2">
                    <img
                      src={API_BASE_URL + categoryImageUrl + cat.image}
                      alt=""
                      className="object-scale-down w-28"
                    />
                  </td>
                  <td class="px-6 py-4">
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
                  <td class="px-6 py-4 text-xl flex gap-3">
                    <MdEditNote className="cursor-pointer text-3xl" />
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
