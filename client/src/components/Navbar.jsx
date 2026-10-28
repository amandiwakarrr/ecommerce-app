import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="sticky font-syne top-0 z-40 w-full min-h-16 bg-dark/90 backdrop-blur-[2px] flex items-center justify-center border-b border-b-border px-3 sm:px-5 md:px-10  xl:px-15">
      <div className="w-full flex flex-row items-center justify-between pl-2">
        <div
          className={`h-16 flex flex-row items-center justify-center max-[720px]:gap-4 gap-5 ${isMenuOpen}? flex-col`}
        >
          <div className="flex gap-2  items-center  justify-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="hidden max-[720px]:flex text-white text-center items-center"
            >
              {/* Menu */}
              <i className="pi pi-bars" style={{ fontSize: "25px" }}></i>
            </button>
            <Link
              to={"/"}
              className="inline-block origin-center text-center text-[clamp(1rem,3vw,2rem)] font-extrabold tracking-tight text-white"
            >
              Urban<span className="text-[#F5B544]">Wear</span>
            </Link>
          </div>
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            }  absolute top-full left-0 z-50 w-full flex-col items-start gap-5 bg-[#0f1114] border border-border p-5
              min-[721px]:static min-[721px]:flex min-[721px]:w-auto min-[721px]:flex-row min-[721px]:items-center min-[721px]:gap-3 min-[721px]:border-0 min-[721px]:bg-transparent min-[721px]:p-0`}
          >
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/shop"}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to={"/product"}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400"
                }`
              }
            >
              Contact us
            </NavLink>
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="px-5 max-[1080px]:hidden">
            <input
              className="border border-gray-800 bg-[#8988880f] px-5 py-2 rounded-4xl text-white"
              type="search"
              placeholder="Search Products"
            />
          </div>
          <Link
            to={"/account/wishlist"}
            className=" flex items-center text-btn  hover:bg-gray-800 active:text-white px-2 py-2 rounded max-[510px]:hidden"
          >
            Wishlist
          </Link>
          <Link
            to={"/account"}
            className=" flex items-center text-btn  hover:bg-gray-800 active:text-white px-2 py-2 rounded "
          >
            Account
          </Link>
          <Link
            to={"/cart"}
            className=" flex items-center text-btn  hover:bg-gray-800 active:text-white px-2 py-2 rounded max-[425px]:hidden"
          >
            Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
