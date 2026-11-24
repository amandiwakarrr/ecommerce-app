import { Link } from "react-router-dom";
import useOrders from "../../context/useOrders";
function CurrentOrder() {
  const { orders, loading } = useOrders();
  const currentOrder = orders[0];

  const steps = ["Placed", "Confirmed", "Processing", "Shipped", "Delivered"];

  const currentStep = steps.indexOf(currentOrder?.orderStatus);



  if (loading) {
    return (
      <div className="w-full p-5 text-center text-secondary-text">
        Loading recent order...
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="w-full p-5 text-center text-secondary-text">
        No Current orders found.
      </div>
    );
  }
  return (
    <div className="grid py-2 mt-5">
      <div className="w-full px-2 flex flex-col items-center justify-around bg-secondary-bg rounded border border-primary-border">
        <div className="w-full flex flex-row items-center justify-between py-3">
          <h1 className="text-[clamp(1.3rem,3vw,2.25rem)] text-primary-text font-bold font-syne">
            Order in progress
          </h1>
          <Link to={`/account/view-order//${currentOrder._id}`} className=" text-tertiary-text text-[12px]">View order</Link>
        </div>
        <div className="w-full flex flex-col gap-4">
          {currentOrder.items.map((item, index) => (
            <div
              key={`${currentOrder._id}-${index}`}
              className="w-full flex  gap-4"
            >
              <img
                className="w-20 h-20 object-cover border rounded"
                src={item.image}
                alt={item.title}
              />

              <div className="flex flex-col gap-2">
                <h2 className="text-primary-text font-semibold text-[clamp(1rem,3vw,2.25rem)]">
                  {item.title}
                </h2>
                <div className="w-full flex flex-col sm:flex-row sm:gap-2">
                  <p className="text-secondary-text text-sm">
                    Price: ₹{item.price}
                  </p>

                  <p className="text-secondary-text text-sm">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-secondary-text text-sm">
                    Size: {item.size || "N/A"} · Color: {item.color || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* Order Progress */}
          <div className="w-full grid grid-cols-5 gap-2 py-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex flex-col items-start gap-2"
              >
                <div
                  className={`w-full h-1 rounded ${currentStep >= index
                    ? "bg-btn"
                    : "bg-primary-border"
                    }`}
                />

                <span className="text-primary-text text-[11px] sm:text-xs">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentOrder;
