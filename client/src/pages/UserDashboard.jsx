import { Link } from "react-router-dom";
import profile from "../assets/socialprof.jpg";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function UserDashboard() {
  const navigate = useNavigate();

  const profileLinks = [
    {
      title: "Overview",
      icon: "pi pi-objects-column",
      path: "/account",
    },
    {
      title: "Orders",
      icon: "pi pi-shopping-bag",
      path: "/account/orders",
      count: 23,
    },
    {
      title: "Wishlist",
      icon: "pi pi-heart-fill",
      path: "/account/wishlist",
      count: 5,
    },
    {
      title: "Address",
      icon: "pi pi-map-marker",
      path: "/account/address",
    },
    {
      title: "Profile details",
      icon: "pi pi-user",
      path: "/account/profile",
    },
    {
      title: "Payment methods",
      icon: "pi pi-credit-card",
      path: "/account/payment-method",
    },
    {
      title: "Preferences",
      icon: "pi pi-cog",
      path: "/account/preferences",
    },
  ];

  const [selectedLink, setSelectedLink] = useState("Overview");

  return (
    <div className="w-full order h-auto py-10 grid grid-cols-1 gap-4 sm:grid-cols-[220px_1fr] md:grid-cols-[260px_1fr] items-start md:px-6 lg:px-5 xl:px-16">
      {/* Sidebar */}
      <div className="w-full order-2 sm:order-1 flex flex-col py-5 gap-2 px-5">
        <div className="flex w-full items-center gap-3 border-b border-primary-border py-2">
          <div className="w-12 h-12 shrink-0 rounded-full bg-amber-400 overflow-hidden">
            <img src={profile} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="truncate">Aman diwakar</h2>
            <span className="text-[12px] text-secondary-text truncate">
              amandiwakar@gmail.com
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          {profileLinks.map((pl, index) => (
            <Link key={index} to={`${pl.path}`}>
              <div
                onClick={() => setSelectedLink(pl.title)}
                className={`hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between  ${selectedLink === pl.title ? "bg-[#767676] hover:bg-[#ababab]" : "bg-dark hover:bg-[#1b1b1b]"} `}
              >
                <div className="flex items-center gap-2">
                  <i className={`${pl.icon}`}></i>
                  <span>{pl.title}</span>
                </div>
                <span>{pl.count}</span>
              </div>
            </Link>
          ))}
          <button className="text-black w-full px-3 py-2 mt-1 rounded bg-btn">
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full order-1 sm:order-2 min-w-0 grid grid-cols-1 gap-2">
        <div className="w-full px-5">
          <div className="w-full px-5 flex items-center justify-between gap-3 border border-primary-border rounded bg-secondary-bg py-5">
            <div>
              <h2 className="text-[clamp(0.9rem,2vw,2rem)]">
                Welcome back, <span>Aman</span>
              </h2>
              <p className="text-[10px] sm:text-[16px]">
                Member since March 2024
              </p>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="text-[12px] cursor-pointer  bg-btn py-2 px-4 sm:text-[16px] rounded text-black whitespace-nowrap"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Overview */}
        <div className="grid px-5 ">
          <div className="w-full  grid grid-cols-2 lg:grid-cols-4 gap-2 py-2 place-content-between">
            <div className="w-full p-2 flex flex-col items-center justify-center border border-primary-border rounded bg-secondary-bg">
              <span className="text-[16px] text-secondary-text">Total orders</span>
              <h2 className="text-[clamp(1rem,3vw,2.25rem)]">23</h2>
              {/* <span className="text-[12px] text-secondary-text">2 in progress</span> */}
            </div>
            <div className="w-full p-2 flex flex-col items-center justify-center border border-primary-border rounded bg-secondary-bg">
              <span className="text-[16px] text-secondary-text">Total spent</span>
              <h2 className="text-[clamp(1rem,3vw,2.25rem)]">$23,234</h2>
              {/* <span className="text-[12px] text-secondary-text">Since joining</span> */}
            </div>
            <div className="w-full p-2 flex flex-col items-center justify-center border border-primary-border rounded bg-secondary-bg">
              <span className="text-[16px] text-secondary-text">Reward points</span>
              <h2 className="text-[clamp(1rem,3vw,2.25rem)]">2,343</h2>
              {/* <span className="text-[12px] text-secondary-text">Worth $23</span> */}
            </div>
            <div className="w-full p-2 flex flex-col items-center justify-center border border-primary-border rounded bg-secondary-bg">
              <span className="text-[16px] text-secondary-text">Wishlist</span>
              <h2 className="text-[clamp(1rem,3vw,2.25rem)]">5</h2>
              {/* <span className="text-[12px] text-secondary-text">2 on sale now</span> */}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default UserDashboard;
