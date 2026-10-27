import { Link } from "react-router-dom";
function UserProfile() {
  return (
    <div className="w-full h-auto grid grid-cols-1 gap-4 sm:grid-cols-[220px_1fr] md:grid-cols-[260px_1fr] items-start md:px-6 lg:px-5 xl:px-16">
      {/* Sidebar */}
      <div className="w-full flex flex-col py-5 gap-2 px-5">
        <div className="flex w-full items-center gap-3 border-b border-gray-800 py-2">
          <div className="w-12 h-12 shrink-0 rounded-full bg-amber-400 overflow-hidden">
            <img src="/" alt="" className="w-full h-full object-cover" />
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
              <Link to="#">OverView</Link>
            </div>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-shopping-bag"></i>
              <Link to="#">Orders</Link>
            </div>
            <span>23</span>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-heart-fill"></i>
              <Link to="#">Wishlist</Link>
            </div>
            <span>23</span>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-map-marker"></i>
              <Link to="#">Address</Link>
            </div>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-credit-card"></i>
              <Link to="#">Payment methods</Link>
            </div>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-user"></i>
              <Link to="#">Profile details</Link>
            </div>
          </div>

          <div className="hover:bg-[#252424] w-full px-3 py-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="pi pi-cog"></i>
              <Link to="#">Preferences</Link>
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

        {/* Current Order Progress */}
        <div className="grid px-5 py-2">
          <div className="w-full px-2 flex flex-col items-center justify-around bg-[#1b1b1b] rounded">
            <div className="w-full flex items-center justify-between py-3">
              <span className="text-[clamp(1.1rem,3vw,2rem)]">
                Order in progress
              </span>
              <Link className=" text-btn ">View order</Link>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 place-items-center p-2">
              <div className="w-full col-span-1">
                <img
                  className="w-30 h-30 border "
                  src="/"
                  alt="Order Img"
                />
              </div>
              <div className="w-full col-span-2 grid grid-cols-1 gap-3 py-2 place-items-center h-full">
                <div className="w-full flex flex-col">
                  <h2>Heavyweight Bomber Jacket</h2>
                  <span className="text-[12px]">
                    Order #UW-20481 · Size M · Arriving Friday, 30 Oct
                  </span>
                </div>
                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <div className=" flex flex-col items-start justify-around gap-2">
                    <div className="w-full h-1 rounded bg-gray-400"></div>
                    <span>Confirmed</span>
                  </div>
                  <div className=" flex flex-col items-start justify-around gap-2">
                    <div className="w-full h-1 rounded bg-gray-400"></div>
                    <span>Packed</span>
                  </div>
                  <div className=" flex flex-col items-start justify-around gap-2">
                    <div className="w-full h-1 rounded bg-gray-400"></div>
                    <span>Shipped</span>
                  </div>
                  <div className=" flex flex-col items-start justify-around gap-2">
                    <div className="w-full h-1 rounded bg-gray-400"></div>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        {/* <div className="grid px-5 py-2">
          <div className="w-full px-2 flex flex-col items-center justify-around bg-[#1b1b1b] rounded">
            <div className="w-full flex items-center justify-between py-3">
              <span className="text-[clamp(1.1rem,3vw,2rem)]">
                Recent orders
              </span>
              <Link className="text-[16px]  text-btn">See all orders</Link>
            </div>

            <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-2 py-2">
             
              <div className="grid grid-cols-4 sm:grid-cols-1 place-items-center border p-1">
                <div className="col-span-1">
                  <img
                    className="w-[60px] h-[90px] sm:w-[150px] sm:h-[150px] border rounded"
                    src="/"
                    alt=""
                  />    
                </div>
                <div className="col-span-3 w-full flex flex-col pl-2">
                  <h2 className="text-[12px]">Heavyweight Bomber Jacket</h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                  <span className="text-[10px]">#UW-20481</span>
                  <span className="text-[10px]">24 Oct 2026</span>
                  <span className="text-[10px]">Shipped</span>
                  <span className="text-[10px]">Total 2,034</span>
                </div>
              </div>
              <div className="grid grid-cols-4 place-items-center border p-1">
                <div className="col-span-1">
                  <img
                    className="w-[60px] h-[90px] border rounded"
                    src="/"
                    alt=""
                  />
                </div>
                <div className="col-span-3 w-full flex flex-col pl-2">
                  <h2 className="text-[12px]">Heavyweight Bomber Jacket</h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                  <span className="text-[10px]">#UW-20481</span>
                  <span className="text-[10px]">24 Oct 2026</span>
                  <span className="text-[10px]">Shipped</span>
                  <span className="text-[10px]">Total 2,034</span>
                </div>
              </div>
              <div className="grid grid-cols-4 place-items-center border p-1">
                <div className="col-span-1">
                  <img
                    className="w-[60px] h-[90px] border rounded"
                    src="/"
                    alt=""
                  />
                </div>
                <div className="col-span-3 w-full flex flex-col pl-2">
                  <h2 className="text-[12px]">Heavyweight Bomber Jacket</h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                  <span className="text-[10px]">#UW-20481</span>
                  <span className="text-[10px]">24 Oct 2026</span>
                  <span className="text-[10px]">Shipped</span>
                  <span className="text-[10px]">Total 2,034</span>
                </div>
              </div>
              <div className="grid grid-cols-4 place-items-center border p-1">
                <div className="col-span-1">
                  <img
                    className="w-[60px] h-[90px] border rounded"
                    src="/"
                    alt=""
                  />
                </div>
                <div className="col-span-3 w-full flex flex-col pl-2">
                  <h2 className="text-[12px]">Heavyweight Bomber Jacket</h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                  <span className="text-[10px]">#UW-20481</span>
                  <span className="text-[10px]">24 Oct 2026</span>
                  <span className="text-[10px]">Shipped</span>
                  <span className="text-[10px]">Total 2,034</span>
                </div>
              </div>
              <div className="grid grid-cols-4 place-items-center border p-1">
                <div className="col-span-1">
                  <img
                    className="w-[60px] h-[90px] border rounded"
                    src="/"
                    alt=""
                  />
                </div>
                <div className="col-span-3 w-full flex flex-col pl-2">
                  <h2 className="text-[12px]">Heavyweight Bomber Jacket</h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                  <span className="text-[10px]">#UW-20481</span>
                  <span className="text-[10px]">24 Oct 2026</span>
                  <span className="text-[10px]">Shipped</span>
                  <span className="text-[10px]">Total 2,034</span>
                </div>
              </div>
              <div className="grid grid-cols-4 place-items-center border p-1">
                <div className="col-span-1">
                  <img
                    className="w-[60px] h-[90px] border rounded"
                    src="/"
                    alt=""
                  />
                </div>
                <div className="col-span-3 w-full flex flex-col pl-2">
                  <h2 className="text-[12px]">Heavyweight Bomber Jacket</h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                  <span className="text-[10px]">#UW-20481</span>
                  <span className="text-[10px]">24 Oct 2026</span>
                  <span className="text-[10px]">Shipped</span>
                  <span className="text-[10px]">Total 2,034</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default UserProfile;
