import { Link } from "react-router-dom";
import profile from "../../assets/socialprof.png";
import { Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <div className="w-full h-auto grid grid-cols-1 gap-4 sm:grid-cols-[220px_1fr] md:grid-cols-[260px_1fr] items-start md:px-6 lg:px-5 xl:px-16">
      {/* Sidebar */}
      <div className="w-full flex flex-col py-5 gap-2 px-5">
        <div className="flex w-full items-center gap-3 border-b border-gray-800 py-2">
          <div className="w-12 h-12 shrink-0 rounded-full bg-amber-400 overflow-hidden">
            <img src={profile} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="truncate">Aman diwakar</h2>
            <span className="text-[12px] text-gray-400 truncate">
              amandiwakar@gmail.com
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-0.5">
          <div className="bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-objects-column"></i>
              <Link to="/account">OverView</Link>
            </div>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-shopping-bag"></i>
              <Link to="/account">Orders</Link>
            </div>
            <span>23</span>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-heart-fill"></i>
              <Link to="/account/wishlist">Wishlist</Link>
            </div>
            <span>23</span>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-map-marker"></i>
              <Link to="/account">Address</Link>
            </div>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-credit-card"></i>
              <Link to="/account">Payment methods</Link>
            </div>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-user"></i>
              <Link to="/account">Profile details</Link>
            </div>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-cog"></i>
              <Link to="/account">Preferences</Link>
            </div>
          </div>

          <button className="text-black w-full px-3 py-2 mt-1 rounded bg-btn">
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full min-w-0 grid grid-cols-1 gap-2">
        <div className="w-full px-5 flex items-center justify-between gap-3 py-5">
          <div>
            <h2 className="text-[clamp(0.9rem,2vw,2rem)]">
              Welcome back, <span>Aman</span>
            </h2>
            <p className="text-[10px] sm:text-[16px]">
              Member since March 2024
            </p>
          </div>
          <button className="text-[12px]  bg-btn py-2 px-4 sm:text-[16px] rounded text-black whitespace-nowrap">
            Continue Shopping
          </button>
        </div>

        {/* Overview */}
        <div className="grid px-5">
          <div className="w-full  grid grid-cols-2 lg:grid-cols-4 gap-2 py-5 place-content-between">
            <div className="w-full p-2 flex flex-col items-center justify-center border border-gray-800 rounded bg-[#1b1b1b]">
              <span className="text-[16px] text-gray-400">Total orders</span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)]">23</h2>
              {/* <span className="text-[12px] text-gray-400">2 in progress</span> */}
            </div>
            <div className="w-full p-2 flex flex-col items-center justify-center border border-gray-800 rounded bg-[#1b1b1b]">
              <span className="text-[16px] text-gray-400">Total spent</span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)]">$23,234</h2>
              {/* <span className="text-[12px] text-gray-400">Since joining</span> */}
            </div>
            <div className="w-full p-2 flex flex-col items-center justify-center border border-gray-800 rounded bg-[#1b1b1b]">
              <span className="text-[16px] text-gray-400">Reward points</span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)]">2,343</h2>
              {/* <span className="text-[12px] text-gray-400">Worth $23</span> */}
            </div>
            <div className="w-full p-2 flex flex-col items-center justify-center border border-gray-800 rounded bg-[#1b1b1b]">
              <span className="text-[16px] text-gray-400">Wishlist</span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)]">5</h2>
              {/* <span className="text-[12px] text-gray-400">2 on sale now</span> */}
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default UserProfile;
