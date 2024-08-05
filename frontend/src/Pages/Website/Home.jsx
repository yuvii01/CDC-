import React, { useContext, useEffect, useState, useRef } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import ProductBox2 from "../../Components/Website/ProductBox2";
// import Slider from "../../Components/Website/Slider";
import { context } from "../../Context/MainContext";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CdcBox from "../../Components/Website/CdcBox";
import landingbox from "../../Components/Website/landingbox";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const {
    products,
    productImageUrl,
    Category,
    fetchCategory,
    fetchBestSeller,
    setLoader,
    bestseller,
    API_BASE_URL,
    categoryImageUrl,
    fetchProduct,
  } = useContext(context);

  const [selCat, setSelCat] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [filteredProduct, setFilteredProducts] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchCategory();
    // console.log(Category);
    fetchBestSeller();
  }, []);


  useEffect(() => {
    const productLoader = async () => {
      await fetchProduct();
      // console.log(products); 
    };

    productLoader();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.src = isMobile
              ? "public/LandingpgVid2.mp4"
              : "public/LandingpgVid.mp4";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (selCat !== null) {
      setLoader(true);
      const data = bestseller.filter((prod) => prod.category_id._id === selCat);
      setFilteredProducts(data);
      setTimeout(() => {
        setLoader(false);
      }, 300);
    }
  }, [selCat, bestseller, setLoader]);

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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: false,
    lazyLoad: "ondemand",
    swipe: true,
  };
  const settings2 = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 300,
    responsive: false,
  };

  const textRef = useRef(null);
  const logos = useRef(null);
  useEffect(() => {
    const letters = textRef.current.querySelectorAll(".letter");

    gsap.fromTo(
      letters,
      { color: "#61677A" }, // Initial color
      {
        color: () => `#fff`,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 50%",
          end: "top 30%",
          scrub: true,
          // markers: true,
        },
        stagger: {
          each: 0.1, // Delay between each letter's animation
          from: "start", // Animation starts from the first letter
        },
      }
    );
    gsap.fromTo(
      logos.current,
      { opacity: 0 }, // Initial opacity
      {
        opacity: 1,
        scrollTrigger: {
          trigger: logos.current,
          start: "top 60%",
          end: "top 50%",
          scrub: true,
          // markers: true,
        },
      }
    );
  }, []);

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="letter">
        {char}
      </span>
    ));
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when this component mounts
  }, []);

  return (
    <div className="w-full">
      <div className="h-[130vh] w-full overflow-hidden bg-zinc-400 flex flex-col justify-center items-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        ></video>
      </div>

      <CdcBox />

      <div className="max-w-[1280px] mx-auto">
        <div>
          <div className="font-extrabold text-3xl text-center uppercase mt-3 w-full flex justify-center">
            <h1 className="text-4xl bg-[#393D3F] w-fit text-yellow-50 py-2 px-5 rounded-3xl">
              Best Sellers
            </h1>
          </div>
          <ul className="md:flex hidden justify-center my-3 gap-10">
            <li
              onClick={() => setSelCat(null)}
              className={`text-xl ${
                selCat == null ? "text-blue-400 font-bold" : ""
              } cursor-pointer`}
            >
              All
            </li>
            {Category.map((cat) => (
              <li
                key={cat.id}
                onClick={() => setSelCat(cat._id)}
                className={`text-xl ${
                  selCat === cat._id
                    ? "text-[#61677A] font-bold"
                    : "text-gray-700"
                } cursor-pointer`}
              >
                {cat.name}
              </li>
            ))}
          </ul>
          <hr className="border border-black" />
          <br />
          <select
            onChange={(e) => {
              setSelCat(e.target.value === "" ? null : e.target.value);
            }}
            className="block md:hidden my-3 w-[70%] bg-[#F8F8F8] p-3 focus:outline-none"
          >
            <option value={""}>All</option>
            {Category.map((cat) => (
              <option key={cat.id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <BestSeller products={selCat === null ? bestseller : filteredProduct} />
      </div>
      <div className="w-5/6 h-fit bg-[#393D3F] p-5 rounded-3xl mx-auto flex flex-wrap ">
        <Slider {...settings} className="w-full md:w-1/2 lg:w-2/5 h-full">
          {Category.map((cat) => (
            <div key={cat._id} className="h-[600px] w-full p-3 rounded-3xl">
              <NavLink
                key={cat._id}
                to={`/store/${cat.slug}`}
                className="relative w-full h-full group"
              >
                <div className="w-full h-full rounded-3xl ">
                  <img
                    src={`${API_BASE_URL}${categoryImageUrl}${cat.image}`}
                    alt={cat.name}
                    className="w-full h-full object-cover transition duration-300 absolute z-10 rounded-3xl dp "
                  />
                  <button className="absolute inset-0 m-auto w-max h-max z-10 bg-transparent text-white p-2 hover:bg-gray-800 hover:bg-opacity-50 transition duration-300 rounded-3xl px-2">
                    Shop {cat.name}
                  </button>
                </div>
              </NavLink>
              <div className="absolute bottom-0 left-0 w-full h-full bg-[#393D3F] p-4 rounded-3xl transition-opacity duration-500 ease-in-out">
                <h1 className="text-3xl font-bold">{cat.name}</h1>
              </div>
            </div>
          ))}
        </Slider>
        <div className="w-full md:w-1/2 lg:w-3/5 h-full font-bold text-3xl text-yellow-50 p-4 text-center m-auto">
          <div ref={textRef} className="h-full w-full">
            {splitText(
              "Welcome to CrepDogCrew,  Discover our curated collection of premium sneakers, from iconic classics to the latest releases, each pair tells a unique story of craftsmanship. Join our community for updates on trends and releases!"
            )}
          </div>
          <div
            ref={logos}
            className="card mt-8 rounded-3xl w-full lg:w-1/2 mx-auto bg-[#61677A] dp"
          >
            <a href="#" className="socialContainer containerOne rounded-xl">
              <svg className="socialSvg instagramSvg" viewBox="0 0 16 16">
                <path
                  fill="#000"
                  d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                />
              </svg>
            </a>

            <a href="#" className="socialContainer containerTwo rounded-xl dp">
              <svg className="socialSvg twitterSvg" viewBox="0 0 16 16">
                <path
                  fill="#000"
                  d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
                />
              </svg>
            </a>

            <a
              href="#"
              className="socialContainer containerThree rounded-xl dp"
            >
              <svg className="socialSvg linkdinSvg" viewBox="0 0 448 512">
                <path
                  fill="#000"
                  d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                />
              </svg>
            </a>

            <a href="#" className="socialContainer containerFour rounded-xl dp">
              <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
                <path
                  fill="#000"
                  d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* <div className="w-5/6 h-[500px] bg-[#393D3F] p-5 rounded-3xl mx-auto flex items-center justify-center ">
        <Slider
          {...settings2}
          className="w-1/2 lg:w-2/5 h-full flex items-center justify-center"
        >
          {products.map((prod) => (
            <div key={prod._id} className="h-96 w-full p-3 rounded-3xl">
              <NavLink
                key={prod._id}
                to={`/store/${prod.slug}`}
                className="relative w-full h-full group object-scale-down"
              >
                <div className="w-full h-full rounded-3xl ">
                  <img
                    src={`${API_BASE_URL}${productImageUrl}${prod.image}`}
                    alt={prod.name}
                    className="w-full h-full object-cover absolute z-10 rounded-3xl dp object-center"
                  />
                </div>
              </NavLink>
            </div>
          ))}
        </Slider>
        <div
          className="h-1/2 w-full mx-auto"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-extrabold tracking-tighter leading-none">
            CREP DOG CREW
          </h1>
        </div>
      </div> */}
      {/* <landingbox /> */}
    </div>
  );
}

function BestSeller({ products }) {
  return (
    <div
      className="max-w-[1280px] mx-auto lg:grid-cols-4 md:grid-cols-2 grid gap-5 mt-12 mb-32 place-items-center"
    >
      {products.map((prod, index) => (
        <ProductBox2 class="" key={index} {...prod} />
      ))}
    </div>
  );
}

export default Home;
