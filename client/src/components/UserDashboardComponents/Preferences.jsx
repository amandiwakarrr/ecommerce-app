import { useState } from "react";
function Preferences() {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const sizesOfWaist = [28, 30, 32, 34, 36];
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedSizeOfWaist, setSelectedSizeOfWaist] = useState(28);

  return (
    <div className="w-full h-auto py-5 px-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 pb-5">
        <div className="w-full pb-5 gap-1 max-[425px]:py-2 flex flex-col">
          <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
            Your preferences
          </h1>
          <span className="text-secondary-text text-[12px]">
            Set your sizes, delivery details and how we contact you. You can
            change these any time.
          </span>
        </div>
      </div>

      <div className="w-full  py-5 flex flex-col gap-2">
        <div className="w-full flex flex-col border border-primary-border p-2">
          <h2 className="text-[20px] text-primary-text">Sizes and fit</h2>
          <span className="text-[12px] text-secondary-text">
            We use these to show your size first on every product.
          </span>
          <div className="w-full flex flex-col gap-2">
            <span className="text-primary-text">Tops and jackets</span>
            <span className="text-tertiary-text">
              Selected size : {selectedSize}
            </span>
            <div className="w-70 grid grid-cols-5 gap-2 ">
              {sizes.map((size, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className=" py-1 rounded cursor-pointer text-primary-text border-primary-border border flex items-center justify-center"
                >
                  <span>{size}</span>
                </div>
              ))}
            </div>

            <span className="text-primary-text">Trousers (waist, inches)</span>
            <span className="text-tertiary-text">
              Selected size : {selectedSizeOfWaist}
            </span>
            <div className="w-70 grid grid-cols-5 gap-2 ">
              {sizesOfWaist.map((size, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSizeOfWaist(size)}
                  className=" py-1 rounded cursor-pointer text-primary-text border-primary-border border flex items-center justify-center"
                >
                  <span>{size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 border border-primary-border p-2">
          <div className="w-full">
            <h2 className="text-[20px] text-primary-text">Notifications</h2>
            <span className="text-[12px] text-secondary-text">
              Choose what we send and how.
            </span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="w-full flex items-center justify-between">
              <div className="w-full">
                <span className="text-primary-text">Order updates</span>
                <p className="text-secondary-text">
                  Confirmation, dispatch and delivery.
                </p>
              </div>
              <button className="cursor-pointer px-2 py-1 bg-btn rounded">
                On
              </button>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="w-full">
                <span className="text-primary-text">New arrivals</span>
                <p className="text-secondary-text">
                  A message when a new drop goes live.
                </p>
              </div>
              <button className=" cursor-pointer px-2 py-1 bg-btn rounded">
                On
              </button>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="w-full">
                <span className="text-primary-text">Sales and offers</span>
                <p className="text-secondary-text">
                  Discounts and members-only deals.
                </p>
              </div>
              <button className="cursor-pointer px-2 py-1 border text-primary-text border-primary-border rounded">
                Off
              </button>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="w-full">
                <span className="text-primary-text">Back in stock</span>
                <p className="text-secondary-text">
                  When an item you saved returns in your size.
                </p>
              </div>
              <button className=" cursor-pointer px-2 py-1 bg-btn rounded">
                On
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex  gap-5">
        <button className="py-2 px-3 cursor-pointer rounded bg-btn text-dark">
          Save preferences
        </button>
        <button className="py-2 px-3 cursor-pointer rounded bg-secondary-bg text-primary-text border border-primary-border">
          Reset to default
        </button>
      </div>
    </div>
  );
}

export default Preferences;
