import React, { useState, useEffect, useContext, useRef } from "react";
import { FaRegUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/UserReducer";
import { GiEgyptianProfile } from "react-icons/gi";
import { emptyCart } from "../../reducers/CartSlice";

function Header() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuItemsRef = useRef([]);

  const navigate = useNavigate();
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const dispatcher = useDispatch();

  const handleProfileClick = () => {
    if (!user.data) {
      navigate("/login");
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleLogout = () => {
    dispatcher(logout());
    dispatcher(emptyCart());
    console.log("Logging out...");
    setIsOpen(false);
  };

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;

      if (currentScrollTop > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", url: "/" },
    { name: "Store", url: "/store" },
    { name: "Shoes", url: "/shoes" },
    { name: "Accessories", url: "/accessories" },
    { name: "Jewellery", url: "/jewellery" },
    { name: "Care", url: "/care" },
    { name: "Collectibles", url: "/collectibles" },
  ];

  useEffect(() => {
    if (toggle) {
      // Animate menu items when sidebar is opened
      gsap.fromTo(
        menuItemsRef.current,
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, stagger: 0.1, duration: 0.5 }
      );
    }
  }, [toggle]);

  return (
    <>
      <header
        className={`z-30 min-h-24 lg:h-30 rounded-b-2xl ${
          scrollDirection === "up" ? "bg-transparent" : "bg-[#61677A]"
        } transition-all duration-500 ease-in-out fixed top-0 w-full`}
      >
        <Container extraClass="my-0.5 flex justify-between md:justify-center items-center">
          <div className="w-full flex justify-between items-center ml-6 ">
            <NavLink to="/">
              <img
                className="w-auto h-auto max-h-16 sm:max-h-20 md:max-h-24 lg:max-h-30"
                src="/images/logo.png"
                alt="Logo"
              />
            </NavLink>
            <span className="p-5 header-icons">
              <div className="relative flex gap-3 items-center">
                <div className="relative">
                  <button onClick={handleProfileClick}>
                    <FaRegUser className="text-xl" />
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-300 rounded-md shadow-lg z-20 p-3 flex flex-col items-center justify-center ">
                      Hello {user.data.name} !!
                      <hr className="border border-black" />
                      <NavLink
                        to="/my-orders"
                        className="flex flex-col justify-center items-center px-4 py-2 text-gray-800 hover:bg-gray-200 gap-2 mb-2 rounded-3xl"
                      >
                        <GiEgyptianProfile className="text-5xl bg-white rounded-full w-20 h-20 p-3" />
                        My Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="flex w-full justify-center items-center px-4 py-2 bg-[#1F2937] text-slate-300 dp rounded-3xl "
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-slate-300 p-2 rounded-3xl">
                  <NavLink to={"/cart"}>
                    <div className="relative">
                      <FaShoppingCart className="text-2xl " />
                      {cart.data.length > 0 && (
                        <span className="absolute bottom-3 left-4 bg-zinc-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {cart.data.length}
                        </span>
                      )}
                    </div>
                  </NavLink>
                  <span>
                    ₹{" "}
                    {cart.total.toLocaleString("en-IN", {
                      style: "decimal",
                    })}
                  </span>
                </div>
                <MdMenu
                  className="hover:rotate-90 ease-in-out "
                  size={24}
                  onClick={() => setToggle(!toggle)}
                />
              </div>
            </span>
          </div>
        </Container>
        <Container extraClass="flex justify-center font-semibold">
          <div
            className={`
              sidebar
              w-2/3
              md:w-1/4
              rounded-3xl
              ${toggle ? "right-[1%]" : "right-[-100%]"}
              duration-300
              h-full
              flex
              flex-col
              justify-center
              items-center
              gap-9
              uppercase
              fixed
              top-6
              bg-[#393D3F]
              dp
            `}
          >
            <div
              className="
                gap-2
                bg-white
                rounded-[10px]
                w-[80%]
                flex
                items-center
                overflow-hidden
                dp
                p-1
              "
            >
              <FaSearch className="m-2 text-black" />
              <input
                type="text"
                className="
                  text-gray-500
                  flex-1
                  rounded-md
                  focus:outline-none
                  h-full
                "
                placeholder="Search"
              />
            </div>
            {menuItems.map((item, index) => (
              <Link key={index} to={item.url} onClick={() => setToggle(false)}>
                <div
                  ref={(el) => (menuItemsRef.current[index] = el)} // Assign ref for animation
                  className="menu-item text-white hover:text-blue-500 transition-colors duration-300"
                >
                  {item.name}
                </div>
              </Link>
            ))}
            <IoCloseSharp
              onClick={() => setToggle(false)}
              className="text-white cursor-pointer p-2 w-10 h-10 rounded-full bg-black dp hover:rotate-90"
            />
          </div>
        </Container>
      </header>
      {toggle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5"
          onClick={() => setToggle(false)}
        ></div>
      )}
    </>
  );
}

export default Header;
