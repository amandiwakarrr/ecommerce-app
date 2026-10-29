import { useNavigate } from "react-router-dom";
import img from "../assets/beige-chinos.jpg";
import QuantityButton from "../components/QuantityButton";
function Cart() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-auto px-5 py-5 sm:px-8 lg:px-15">
      {/* <div className="w-full h-auto flex flex-col gap-5 items-center justify-center">
        <h2 className="font-syne font-extrabold text-[clamp(1rem,2vw,3rem)] text-center">
          Your cart is empty
        </h2>
        <span className="text-gray-300 text-center">
          Add something you like and it will show up here.
        </span>
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="py-3 px-3 cursor-pointer bg-btn rounded text-dark hover:bg-btn"
        >
          Start Shoping
        </button>
      </div> */}

      <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 gap-5 place-items-start">
        <div className="w-full gap-4 min-w-0">
          <div className="w-full pb-5">
            <h2 className="text-[clamp(1rem,2vw,3rem)] font-extrabold font-syne text-primary-text">
              Your cart
            </h2>
          </div>

          {/* Cart summary */}
          <div className="w-full flex items-center justify-between gap-3 border-b border-primary-border py-2 sm:py-5">
            <div>
              <img className="w-16.5 h-16.5 rounded" src={img} alt="" />
            </div>
            <div className="w-full flex justify-between">
              <div className="w-full flex  flex-col justify-between">
                <h2 className="text-[clamp(0.9rem,2vw,1.5rem)] font-syne font-bold text-primary-text">
                  Nightfall Bomber Jacket
                </h2>
                <span className="text-[12px] text-secondary-text">Size M · $149.00</span>
                <div className="w-17.5 mt-1 text-primary-text border border-primary-border rounded h-5.5 flex items-center justify-center text-[12px]">
                  <QuantityButton />
                </div>
              </div>
              <div className="flex items-end flex-col">
                <h2 className="text-[clamp(0.9rem,2vw,1.5rem)] text-primary-text">23,989</h2>
                <button className="text-[12px] cursor-pointer text-secondary-text">Remove</button>
              </div>
            </div>
          </div>
          
        </div>


        {/* Order Symmary */}
        <div className="w-full flex flex-col min-w-0 gap-2 mt-20">
          <div className="w-full border border-primary-border p-5 rounded bg-secondary-bg">
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
            <div className="w-full flex items-center justify-between mt-2">
              <span className="text-tertiary-text">Total</span>
              <span className="text-tertiary-text">307.00</span>
            </div>
          </div>
          <div className="w-full">
            <button 
              onClick={() => navigate("/checkout")}
              className="cursor-pointer w-full text-dark bg-btn py-2 px-3 rounded">
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;