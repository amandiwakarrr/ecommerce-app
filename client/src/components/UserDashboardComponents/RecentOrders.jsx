import recentOrder from "../../assets/BestSell1.jpg";
import { Link } from "react-router-dom";
function RecentOrders() {

  return (
    <div className="grid px-3 sm:px-5 py-2">
      <div className="w-full px-2 flex flex-col items-center justify-around bg-[#1b1b1b] rounded">
        <div className="w-full flex flex-wrap items-center justify-between gap-2 py-3">
          <span className="text-[clamp(1.1rem,3vw,2rem)]">Recent orders</span>
          <Link className="text-sm sm:text-[16px] text-btn">
            See all orders
          </Link>
        </div>
        {/* Cards */}
        <div className="w-full h-auto grid place-items-center gap-2 py-2">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
            {/* card */}
            <div className="w-full min-w-0 cursor-pointer border border-gray-800 bg-dark px-2 rounded p-1">
              <div className="w-full flex justify-between gap-2 py-2">
                <img
                  className="w-12.5 h-12.5 shrink-0 border rounded"
                  src={recentOrder}
                  alt=""
                />
                <div className="min-w-0 flex flex-col">
                  <h2 className="text-[14px] truncate">
                    Heavyweight Bomber Jacket
                  </h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-between px-2 py-2">
                <span className="text-[10px]">24 Oct 2026</span>
                <span className="text-[10px]">Total 2,034</span>
              </div>
            </div>
            <div className="w-full min-w-0 cursor-pointer border border-gray-800 bg-dark px-2 rounded p-1">
              <div className="w-full flex justify-between gap-2 py-2">
                <img
                  className="w-12.5 h-12.5 shrink-0 border rounded"
                  src={recentOrder}
                  alt=""
                />
                <div className="min-w-0 flex flex-col">
                  <h2 className="text-[14px] truncate">
                    Heavyweight Bomber Jacket
                  </h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-between px-2 py-2">
                <span className="text-[10px]">24 Oct 2026</span>
                <span className="text-[10px]">Total 2,034</span>
              </div>
            </div>
            <div className="w-full min-w-0 cursor-pointer border border-gray-800 bg-dark px-2 rounded p-1">
              <div className="w-full flex justify-between gap-2 py-2">
                <img
                  className="w-12.5 h-12.5 shrink-0 border rounded"
                  src={recentOrder}
                  alt=""
                />
                <div className="min-w-0 flex flex-col">
                  <h2 className="text-[14px] truncate">
                    Heavyweight Bomber Jacket
                  </h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-between px-2 py-2">
                <span className="text-[10px]">24 Oct 2026</span>
                <span className="text-[10px]">Total 2,034</span>
              </div>
            </div>
            <div className="w-full min-w-0 cursor-pointer border border-gray-800 bg-dark px-2 rounded p-1">
              <div className="w-full flex justify-between gap-2 py-2">
                <img
                  className="w-12.5 h-12.5 shrink-0 border rounded"
                  src={recentOrder}
                  alt=""
                />
                <div className="min-w-0 flex flex-col">
                  <h2 className="text-[14px] truncate">
                    Heavyweight Bomber Jacket
                  </h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-between px-2 py-2">
                <span className="text-[10px]">24 Oct 2026</span>
                <span className="text-[10px]">Total 2,034</span>
              </div>
            </div>
            <div className="w-full min-w-0 cursor-pointer border border-gray-800 bg-dark px-2 rounded p-1">
              <div className="w-full flex justify-between gap-2 py-2">
                <img
                  className="w-12.5 h-12.5 shrink-0 border rounded"
                  src={recentOrder}
                  alt=""
                />
                <div className="min-w-0 flex flex-col">
                  <h2 className="text-[14px] truncate">
                    Heavyweight Bomber Jacket
                  </h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-between px-2 py-2">
                <span className="text-[10px]">24 Oct 2026</span>
                <span className="text-[10px]">Total 2,034</span>
              </div>
            </div>
            <div className="w-full min-w-0 cursor-pointer border border-gray-800 bg-dark px-2 rounded p-1">
              <div className="w-full flex justify-between gap-2 py-2">
                <img
                  className="w-12.5 h-12.5 shrink-0 border rounded"
                  src={recentOrder}
                  alt=""
                />
                <div className="min-w-0 flex flex-col">
                  <h2 className="text-[14px] truncate">
                    Heavyweight Bomber Jacket
                  </h2>
                  <span className="text-[10px]">Size M · Charcoal</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-between px-2 py-2">
                <span className="text-[10px]">24 Oct 2026</span>
                <span className="text-[10px]">Total 2,034</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentOrders;
