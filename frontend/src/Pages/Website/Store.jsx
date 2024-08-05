import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Context/MainContext";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductBox from "../../Components/Website/ProductBox";
import Cookies from "js-cookie";


function Store() {
        useEffect(() => {
          window.scrollTo(0, 0); // Scroll to the top when this component mounts
        }, []);
  const { category_slug } = useParams();
  const [selColor, setSelColor] = useState(null);
  const [limit, setLimit] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 4);
  };

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full cursor-pointer mr-4 z-10"
        onClick={onClick}
      >
        ❯
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full cursor-pointer ml-4 z-10"
        onClick={onClick}
      >
        ❮
      </div>
    );
  };

  const {
    Category,
    Colors,
    API_BASE_URL,
    categoryImageUrl,
    products,
    productImageUrl,
    fetchProduct,
    fetchCategory,
    fetchColor,
  } = useContext(context);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    fetchCategory();
    fetchColor();
    if (searchParams.get("color_id")) {
      setSelColor(searchParams.get("color_id"));
    }
    if (searchParams.get("limit")) {
      setLimit(searchParams.get("limit"));
    }
    // console.log(Cookies.get("token"));
  }, []);

  useEffect(() => {
    fetchProduct(limit, selColor, category_slug);
    const searchQuery = { limit };
    if (selColor) {
      searchQuery.color_id = selColor;
    }
    setSearchParams({ limit, color_id: selColor });
  }, [limit, category_slug, selColor]);

  return (
    <div className="w-full h-full flex mt-32">
      <div
        className={`w-full md:w-1/3 lg:w-1/6 h-full p-2 fixed left-0 top-0 bg-white z-20 transition-all duration-300 ease-in-out ${
          showFilter ? "translate-x-0 mt-32" : "-translate-x-full"
        } md:static md:translate-x-0`}
      >
        <div className={`${showFilter ? "h-5/6 overflow-y-auto" : ""}`}>
          <div className="bg-slate-300 mb-3 p-3 rounded-2xl overflow-auto">
            <h1 className="font-extrabold bg-slate-100 rounded-3xl text-4xl py-1 px-2">
              Categories
            </h1>
            <br />
            <ul>
              <NavLink
                to="/store"
                className="cursor-pointer hover:text-blue-500 transition-colors duration-300"
              >
                <li>All</li>
              </NavLink>
              {Category.map((cat) => (
                <NavLink
                  key={cat._id}
                  to={`/store/${cat.slug}`}
                  className="cursor-pointer hover:text-blue-500 transition-colors duration-300"
                >
                  <li
                    style={{
                      fontWeight:
                        category_slug === cat.slug ? "bold" : "normal",
                    }}
                  >
                    {cat.name}
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="overflow-auto bg-slate-300 p-3 rounded-2xl">
            <h1 className="font-extrabold bg-slate-100 rounded-3xl text-4xl py-1 px-2">
              Colors
            </h1>
            <br />
            <br />
            <ul className="">
              {Colors.map((color) => (
                <li
                  onClick={() => {
                    setSelColor(color._id);
                  }}
                  className="cursor-pointer flex gap-3 items-center mt-1 "
                  style={{
                    fontWeight: selColor === color._id ? "bold" : "normal",
                  }}
                  key={color._id}
                >
                  <div
                    style={{
                      backgroundColor: color.code,
                      borderColor: "black",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></div>
                  {color.name}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setSelColor(null);
              }}
              className="mt-5 flex mx-auto px-4 py-2 rounded-3xl bg-slate-200 dp"
            >
              Reset Color
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 lg:w-5/6 h-full">
        <Slider {...settings} className="">
          {Category.map((cat) => (
            <div key={cat._id} className="h-[450px] w-full p-3">
              <NavLink
                key={cat._id}
                to={`/store/${cat.slug}`}
                className="relative w-full h-full group"
              >
                <div className="w-full h-full">
                  <img
                    src={`${API_BASE_URL}${categoryImageUrl}${cat.image}`}
                    alt={cat.name}
                    className="w-full h-full object-cover transition duration-300 absolute z-10 rounded-3xl dp"
                  />
                  <button className="absolute inset-0 m-auto w-max h-max z-10 bg-transparent text-white p-2 hover:bg-gray-800 hover:bg-opacity-50 transition duration-300 rounded-3xl px-2">
                    Shop {cat.name}
                  </button>
                </div>
              </NavLink>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 transition-opacity duration-500 ease-in-out"></div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-white p-4 rounded-2xl transition-opacity duration-500 ease-in-out">
                <h1 className="text-3xl font-bold">{cat.name}</h1>
              </div>
            </div>
          ))}
        </Slider>
        {/* ------------product listing-------------- */}
        <hr className="mt-10 border-black" />
        <div className="mt-5 w-full flex gap-3 flex-wrap items-center justify-center">
          {products.map((prod, index) => (
            <ProductBox key={index} {...prod} />
          ))}
        </div>
        <button
          className="w-auto py-1 px-3 rounded-md bg-slate-200 dp flex mx-auto mt-10"
          onClick={handleShowMore}
        >
          Show More
        </button>
      </div>
      <button
        className="fixed bottom-4 right-4 bg-slate-200 text-black px-4 py-2 rounded-md z-20 md:hidden border border-slate-600"
        onClick={handleFilterClick}
      >
        {showFilter ? "Close Filters" : "Filters"}
      </button>
    </div>
  );
}

export default Store;
