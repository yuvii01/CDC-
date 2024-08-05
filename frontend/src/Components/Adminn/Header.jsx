import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import gsap from "gsap";
import { useSelector } from "react-redux";

function Header() {
  const [toggle, setToggle] = useState(false);
  const logoRef = useRef(null);
  const sidebarRef = useRef(null);
  const navLinkRefs = useRef([]);
  //cart leke aana from redux reducer
  useEffect(() => {
    // Animate logo when header appearsf
    gsap.fromTo(
      logoRef.current,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          // Add a subtle bounce effect after the logo appears
          gsap.to(logoRef.current, {
            y: -5,
            repeat: 1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 0.3,
          });
        },
      }
    );

    if (toggle) {
      // Slide in sidebar
      gsap.fromTo(
        sidebarRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.2, ease: "none" }
      );

      // Create a GSAP timeline for staggered NavLink animations
      const tl = gsap.timeline();
      navLinkRefs.current.forEach((navLink, index) => {
        tl.fromTo(
          navLink,
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4 },
          index * 0.2 // stagger each animation by 0.1 seconds
        );
      });
    } else {
      // Slide out sidebar
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [toggle]);

  return (
    <>
      <div className="bg-[#61677A] flex-col w-full min-h-24 rounded-b-2xl md:hidden">
        {!toggle && (
          <div className="h-24 flex justify-between items-center">
            <img
              ref={logoRef}
              src="/images/logo.png"
              alt="Logo"
              className="h-full object-scale-down ml-5"
            />
            <IoMdMenu
              onClick={() => setToggle(true)}
              className="cursor-pointer text-2xl mr-5 hover:rotate-180 transition-transform"
            />
          </div>
        )}
      </div>
      {/* Sidebar */}
      {toggle && (
        <div
          ref={sidebarRef}
          className="rounded-l-3xl fixed top-0 right-0 h-full w-[150px] bg-[#61677A] text-[#D8D9DA] p-4 transition-transform duration-400 transform translate-x-0 z-50 flex justify-center"
        >
          <ul className="flex flex-col gap-4 mt-8 text-[#D8D9DA]">
            <NavLink
              ref={(el) => (navLinkRefs.current[0] = el)}
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white"
              }
              to="/admin"
            >
              <li className="flex items-center gap-1">
                <MdDashboardCustomize />
                Dashboard
              </li>
            </NavLink>
            <NavLink
              ref={(el) => (navLinkRefs.current[1] = el)}
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white"
              }
              to="/admin/category"
            >
              <li className="flex items-center gap-1">
                <MdCategory />
                Category
              </li>
            </NavLink>
            <NavLink
              ref={(el) => (navLinkRefs.current[2] = el)}
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white"
              }
              to="/admin/product"
            >
              <li className="flex items-center gap-1">
                <FaClipboardList />
                Products
              </li>
            </NavLink>
            <NavLink
              ref={(el) => (navLinkRefs.current[3] = el)}
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white"
              }
              to="/admin/colors"
            >
              <li className="flex items-center gap-1">
                <FaClipboardList />
                Colors
              </li>
            </NavLink>
            <IoIosCloseCircleOutline
              onClick={() => setToggle(false)}
              className="mt-10 text-3xl cursor-pointer ml-4"
            />
          </ul>
        </div>
      )}
      {/* Dark overlay */}
      {toggle && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={() => setToggle(false)}
        ></div>
      )}
    </>
  );
}

export default Header;
