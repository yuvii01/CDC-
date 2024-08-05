import React, { useEffect, useRef } from "react";
import {
  MdDashboardCustomize,
  MdCategory,
  MdInvertColors,
} from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import gsap from "gsap";

function SideBar() {
  const sidebarRef = useRef(null);
  const logoRef = useRef(null);
  const navLinkRefs = useRef([]);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const logo = logoRef.current;

    // Animate logo when sidebar appears
    gsap.fromTo(
      logo,
      { y: -20, opacity: 0 },
      {
        x: -5,
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          // Add a subtle bounce effect after the logo appears
          gsap.to(logo, {
            x: -10,
            repeat: 2,
            yoyo: true,
            ease: "power1.inOut",
            duration: 0.3,
          });
        },
      }
    );

    // Slide in sidebar
    gsap.fromTo(
      sidebar,
      { x: "-100%" },
      { x: "0%", duration: 0.7, ease: "none" }
    );

    // Create a GSAP timeline for staggered NavLink animations
    const tl = gsap.timeline();
    navLinkRefs.current.forEach((navLink, index) => {
      tl.fromTo(
        navLink,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4 },
        index * 0.2 // stagger each animation by 0.1 seconds
      );
    });

    return () => {
      gsap.to(sidebar, { x: "-100%", duration: 0.3, ease: "power3.in" });
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="hidden bg-[#61677A] w-1/4 min-h-100 md:flex flex-col rounded-xl"
    >
      <div className="h-[15vh] rounded-xl flex justify-center">
        <img
          ref={logoRef}
          src="/public/images/logo.png"
          alt="Logo"
          className="ml-2 object-scale-down"
        />
      </div>

      {/* Sidebar components */}
      <ul className="text-[#D8D9DA] md:text-2xl ml-5 flex flex-col gap-6">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-[#272829]" : "text-[#D8D9DA] hover:text-[#272829]"
          }
          to="/admin"
          end
        >
          <li
            ref={(el) => (navLinkRefs.current[0] = el)}
            className="flex items-center gap-1"
          >
            <MdDashboardCustomize className="dp" />
            Dashboard
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-[#272829]" : "text-[#D8D9DA] hover:text-[#272829]"
          }
          to="/admin/category"
        >
          <li
            ref={(el) => (navLinkRefs.current[1] = el)}
            className="flex items-center gap-1"
          >
            <MdCategory className="dp" />
            Category
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-[#272829]" : "text-[#D8D9DA] hover:text-[#272829]"
          }
          to="/admin/product"
        >
          <li
            ref={(el) => (navLinkRefs.current[2] = el)}
            className="flex items-center gap-1"
          >
            <FaClipboardList className="dp" />
            Products
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-[#272829]" : "text-[#D8D9DA] hover:text-[#272829]"
          }
          to="/admin/colors"
        >
          <li
            ref={(el) => (navLinkRefs.current[3] = el)}
            className="flex items-center gap-1"
          >
            <MdInvertColors className="dp" />
            Colors
          </li>
        </NavLink>
      </ul>
    </div>
  );
}

export default SideBar;
