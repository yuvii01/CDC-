import React, { useContext, useEffect, useRef, useState } from "react";
//for the selection options in category and color we are using react select package
import Select from "react-select";
import { context } from "../../../Context/MainContext";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function Add() {
  //----------------------------------------------------------------------------
  const slugRef = useRef();
  const nameRef = useRef();
  const discount_price_ref = useRef();
  const discount_pre_ref = useRef();
  const price_ref = useRef();
  const navigator = useNavigate();

  const {
    fetchCategory,
    Category,
    fetchColor,
    Colors,
    PRODUCT_BASE_URL,
    API_BASE_URL,
    openToast,
    productImageUrl,
  } = useContext(context);
  const { id } = useParams();

  //--------------------------------------------------------------------------------
  const [editProduct, seteditProduct] = useState(null);
  const [productCategory, setproductCategory] = useState(null);
  const [productColor, setproductColor] = useState(null);
//this function is to make the category auto appear
  useEffect(() => {
    if (editProduct != null || editProduct != undefined) {
      setproductCategory({
        value: editProduct?.category_id._id,
        label: editProduct?.category_id.name,
      });
      //sirf value aur label extract karke naya array bana diya
      const colorData = editProduct?.color?.map((color) => {
        return {
          value: color._id,
          label: color.name,
        };
      });
      setproductColor(colorData )
      // console.log(colorData)
    }
  }, [editProduct]);

  useEffect(() => {
    fetchColor();
    fetchColor();
  }, []);
    //--------------------auto the dataloading --------------------------------------
    useEffect(() => {
      if (id != null) {
        axios
          .get(API_BASE_URL + PRODUCT_BASE_URL + "/" + id)
          .then((success) => {
            if (success.data.status === 1) {
              seteditProduct(success.data.product);
              // setproductCategory(success.data.data.category);
              // setproductColor(success.data.data.color);
            } else {

            }
          })
          .catch((error) => {
            console.error("Error while fetching product", error.message);
          });
      }
    }, [id]);

  // ----------------------------------file drop-----------------------------------
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  //-----------------------------------------------------------------------
  const categoryOptions = Category?.map((cat) => {
    return {
      label: cat.name,
      value: cat._id,
    };
  });

  const colorOptions = Colors?.map((cat) => {
    return {
      label: cat.name,
      value: cat._id,
    };
  });
  //---------------------slug creating ---------------------------------
  const titleToSlug = (title) => {
    // this function is to automatically get what we type in category name to slug
    const slug = title
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("'", "");
      return slug;
  };

  // ---------------------Automatic calculation for discount--------------
  function calculateDiscount() {
    const price = price_ref.current.value;
    const discountPer = discount_pre_ref.current.value;
    if (price != "" && discountPer / 100) {
      const d = (discountPer / 100) * price;
      return (price - d)
    } else {
      // discount_price_ref.current.value = 0;
    }
  }
  //------------------------form submission handler---------------------
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("slug", e.target.slug.value);
    formData.append("price", e.target.price.value);
    formData.append("discount_percent", e.target.discount_pre.value);
    formData.append("discount_price", e.target.discount_price.value);
    formData.append("image", file);
    //label and value both are stored unlike previous , where we only stored value therefore we do productCategory.value
    formData.append("category", productCategory.value);
    //sirf value ko stringify karke bhejna hai 
    const colorData = productColor.map(colors=>colors.value);
    formData.append("color", JSON.stringify(colorData));

    axios
      .post(`${API_BASE_URL}${PRODUCT_BASE_URL}/edit/${id}`, formData)
      .then((success) => {
        if (success.data.status === 1) {
          openToast(success.data.msg, "success");
          navigator("/admin/product");
          e.target.reset();
        } else {
          openToast(success.data.msg, "error");
        }
      })
      .catch((error) => {
        openToast(error.message, "error");
      });
  };
  //------------------------------------------------------------------------
  return (
    <div className="bg-[#393d3f] w-full min-h-screen overflow-hidden rounded-3xl p-5 md:m-2">
      <h1 className=" font-extrabold p-2 rounded-md text-2xl md:text-5xl ">
        Product Edit
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
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              <h1 className="text-black text-xl">Product Name</h1>
            </label>
            <input
              onChange={(e) => {
                seteditProduct({
                  ...editProduct,
                  name: e.target.value,
                  slug: titleToSlug(e.target.value),
                });
              }}
              ref={nameRef}
              type="text"
              value={editProduct?.name}
              id="name"
              name="name"
              className="dp bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#61677A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              value={editProduct?.slug}
              type="text"
              id="slug"
              name="slug"
              className="dp bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#61677A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>

          {/* //---------------------Discount area------------------------------- */}

          <div className="flex gap-3 w-full">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <h1 className="text-black text-xl">Price</h1>
              </label>
              <input
                onChange={(e) => {
                  seteditProduct({
                    ...editProduct,
                    price: e.target.value,
                    discount_price:calculateDiscount(),
                  })
                }}
                value={editProduct?.price}
                // onChange={calculateDiscount}
                ref={price_ref}
                min={0}
                type="number"
                id="price"
                name="price"
                className="dp bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#61677A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <h1 className="text-black text-xl">Discount(%)</h1>
              </label>
              <input
                value={editProduct?.discount_percent}
                onChange={(e) => {
                  seteditProduct({
                    ...editProduct,
                    discount_percent: e.target.value,
                    discount_price: calculateDiscount(),
                  });
                }}
                ref={discount_pre_ref}
                max={99}
                min={0}
                type="number"
                id="discount_pre"
                name="discount_pre"
                className="dp bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#61677A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <h1 className="text-black text-xl">Discount(₹)</h1>
              </label>
              <input
                readOnly
                value={editProduct?.discount_price}
                ref={discount_price_ref}
                type="number"
                id="discount_price"
                name="discount_price"
                className="dp bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#61677A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
          </div>
          <div className="flex gap-3 w-full">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <h1 className="text-black text-xl">Category</h1>
              </label>
              <Select
                className="basic-single dp bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#61677A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 z-20"
                classNamePrefix="select"
                isSearchable={true}
                name="category"
                options={categoryOptions}
                onChange={(option) => {
                  setproductCategory(option);
                }}
                value={productCategory}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <h1 className="text-black text-xl">Color</h1>
              </label>
              <Select
                className="basic-single dp bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#61677A] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 z-20"
                classNamePrefix="select"
                isSearchable={true}
                name="category"
                isMulti={true}
                options={colorOptions}
                value={productColor}
                onChange={(option) => {
                  // const d = option.map((o) => o.value);
                  setproductColor(option);
                }}
              />
            </div>
          </div>
          <div className="p-5 rounded-3xl w-full bg-white">
            <label htmlFor="">
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
              <span className="block mt-2 text-center text-gray-500 dark:text-gray-400 z-10">
                {file?.name}
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="dp text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
