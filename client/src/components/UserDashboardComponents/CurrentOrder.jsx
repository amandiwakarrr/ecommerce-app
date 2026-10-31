import recentOrder from "../../assets/BestSell1.jpg";
import { Link } from "react-router-dom";
function CurrentOrder() {
  return (
    <div className="grid py-2 mt-5">
      <div className="w-full px-2 flex flex-col items-center justify-around bg-secondary-bg rounded border border-primary-border">
        <div className="w-full flex items-center justify-between py-3">
          <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
          Order in progress 
        </h1>
          <Link className=" text-tertiary-text ">View order</Link>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 place-items-center p-2">
          <div className="w-full col-span-1">
            <img
              className="w-30 h-30 border rounded"
              src={recentOrder}
              alt="Order Img"
            />
          </div>
          <div className="w-full col-span-2 grid grid-cols-1 gap-3 py-2 place-items-center h-full">
            <div className="w-full flex flex-col">
              <h2 className="text-primary-text">Heavyweight Bomber Jacket</h2>
              <span className="text-[12px] text-secondary-text">
                Order #UW-20481 · Size M · Arriving Friday, 30 Oct
              </span>
            </div>
            <div className="w-full grid grid-cols-4 gap-2 ">
              <div className=" flex flex-col items-start justify-around gap-2">
                <div className="w-full h-1 rounded bg-btn"></div>
                <span className="text-primary-text text-[12px]">Confirmed</span>
              </div>
              <div className=" flex flex-col items-start justify-around gap-2">
                <div className="w-full h-1 rounded bg-btn"></div>
                <span className="text-primary-text text-[12px]">Packed</span>
              </div>
              <div className=" flex flex-col items-start justify-around gap-2">
                <div className="w-full h-1 rounded bg-btn"></div>
                <span className="text-primary-text text-[12px]">Shipped</span>
              </div>
              <div className=" flex flex-col items-start justify-around gap-2">
                <div className="w-full h-1 rounded bg-btn"></div>
                <span className="text-primary-text text-[12px]">Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentOrder;
