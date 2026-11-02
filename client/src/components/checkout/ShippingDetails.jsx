import PaymentMethods from "./PaymentMethods";

function ShippingDetails() {


  return (
    <div className="w-full">
      <div className="w-full border rounded border-primary-border p-2 flex flex-col items-center justify-center bg-secondary-bg">
        <div className="w-full">
          <h2 className="text-[clamp(1.2rem,2vw,2rem)] text-primary-text font-bold font-syne">
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
            <label
              htmlFor="address"
              className="text-secondary-text text-[14px]"
            >
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="phone"
                className="text-secondary-text text-[14px]"
              >
                Phone
              </label>
              <input
                type="text"
                className="border text-primary-text   border-primary-border rounded px-2 py-2 focus:outline-btn"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-secondary-text text-[14px]"
              >
                Email
              </label>
              <input
                type="text"
                className="border text-primary-text   border-primary-border rounded px-2 py-2 focus:outline-btn"
              />
            </div>
          </div>
                {/* Payment */}
                <PaymentMethods/>
        </form>
      </div>
    </div>
  );
}

export default ShippingDetails;
