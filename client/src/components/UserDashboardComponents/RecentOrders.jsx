// import recentOrder from "../../assets/BestSell1.jpg";
// import { Link } from "react-router-dom";
import CurrentOrder from "./CurrentOrder";
function RecentOrders() {
  return (
    <div className="w-full flex flex-col px-5  sm:px-5 py-2">
      <CurrentOrder />
      <div className="w-full flex flex-col gap-5 border border-primary-border p-2 rounded">
        <div className="w-full ">
          <span className="w-full text-[clamp(1rem,3vw,2rem)] text-primary-text font-syne font-extrabold">
            Recent Orders
          </span>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 border-b border-primary-border py-2">
            <p className="w-full text-tertiary-text col-span-2 sm:col-span-1">Order</p>
            <p className="w-full text-tertiary-text">Date</p>
            <p className="w-full text-tertiary-text hidden sm:flex">Amount</p>
            <p className="w-full text-tertiary-text">Status</p>
            <p className="w-full text-tertiary-text hidden md:flex">Payment</p>
            <p className="w-full text-tertiary-text hidden lg:flex">View</p>
          </div>
          <div className="w-full grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 border-b border-primary-border py-2">
            <p className="w-full text-primary-text col-span-2 sm:col-span-1">#UW-48102</p>
            <p className="w-full text-primary-text">Oct 12</p>
            <p className="w-full text-primary-text hidden sm:flex">2334.00</p>
            <p className="w-full text-green-700">Delivered</p>
            <p className="w-full text-primary-text hidden md:flex">COD</p>
            <p className="w-full text-primary-text hidden lg:flex items-center"><i className="cursor-pointer pl-2 pi pi-eye"></i></p>
          </div>
          <div className="w-full grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 border-b border-primary-border py-2">
            <p className="w-full text-primary-text col-span-2 sm:col-span-1">#UW-48093</p>
            <p className="w-full text-primary-text">Oct 15</p>
            <p className="w-full text-primary-text hidden sm:flex">234.00</p>
            <p className="w-full text-yellow-700">Shipped</p>
            <p className="w-full text-primary-text hidden md:flex">COD</p>
            <p className="w-full text-primary-text hidden lg:flex items-center"><i className="cursor-pointer pl-2 pi pi-eye"></i></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentOrders;
