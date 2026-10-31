import { useNavigate } from "react-router-dom";
function Checkout() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-auto px-5 py-5 sm:px-8 lg:px-15">
      <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-5 ">
        {/* Checkout form */}
        <div className=" w-full flex flex-col items-center justify-between">
          <div className="w-full py-5 text-[14px] flex font-syne text-secondary-text gap-2 font-bold">
            <span className="text-tertiary-text">Shipping </span>
            {">"}
            <span className="text-tertiary-text">Payment</span>
            {">"}
            <span>Confirm</span>
          </div>
          <div className="w-full border rounded border-primary-border p-2 flex flex-col items-center justify-center bg-secondary-bg">
            <div className="w-full">
              <h2 className="text-[clamp(1.2rem,2vw,2rem)] text-primary-text font-extrabold font-syne">
                Shipping details
              </h2>
            </div>
            <form className="w-full flex flex-col gap-2">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="firstname"
                    className="text-secondary-text text-[14px]"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    className="border text-primary-text     border-primary-border rounded px-2 py-2 focus:outline-btn"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="lastname"
                    className="text-secondary-text text-[14px]"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    className="border text-primary-text   border-primary-border rounded px-2 py-2 focus:outline-btn"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="address" className="text-secondary-text text-[14px]">
                  Address
                </label>
                <input
                  type="text"
                  className=" border text-primary-text  border-primary-border rounded px-2 py-2 focus:outline-btn"
                />
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="city" className="text-secondary-text text-[14px]">
                    City
                  </label>
                  <input
                    type="text"
                    className="border text-primary-text   border-primary-border rounded px-2 py-2 focus:outline-btn"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="Pincode"
                    className="text-secondary-text text-[14px]"
                  >
                    Pin code
                  </label>
                  <input
                    type="text"
                    className="border text-primary-text   border-primary-border rounded px-2 py-2 focus:outline-btn"
                  />
                </div>
              </div>
              <h2 className="text-[clamp(1.2rem,2vw,2rem)] text-primary-text font-extrabold font-syne">
                Payment
              </h2>
              <div className="w-full flex flex-col gap-1">
                <label className="text-secondary-text text-[14px]">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className=" border text-primary-text  border-primary-border rounded px-2 py-2 focus:outline-btn"
                />
              </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="city" className="text-secondary-text text-[14px]">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="border text-primary-text   border-primary-border rounded px-2 py-2 focus:outline-btn"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="Pincode" 
                    className="text-secondary-text text-[14px]"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="border text-primary-text  border-primary-border rounded px-2 py-2 focus:outline-btn"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* checkout order summary */}
        <div className=" w-full flex flex-col min-w-0 gap-2 sm:mt-15">
          <div className="w-full border border-primary-border p-5 rounded bg-secondary-bg ">
            <h2 className="font-syne font-extrabold text-primary-text">Order summary</h2>
            <div className="w-full flex flex-col border-b border-primary-border gap-2 py-1">
              <div className="w-full flex items-center justify-between text-secondary-text">
                <span>Subtotal</span>
                <span>307.00</span>
              </div>
              <div className="w-full flex items-center justify-between text-secondary-text">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <div className="w-full flex items-center justify-between mt-2 text-tertiary-text">
              <span>Total</span>
              <span>307.00</span>
            </div>
          </div>
          <div className="w-full">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer w-full text-dark bg-btn py-2 px-3 rounded"
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
