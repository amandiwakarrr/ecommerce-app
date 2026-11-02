import QuantityButton from "../../components/QuantityButton";
import img from "../../assets/BestSell1.jpg";
function CheckoutProduct() {
  return (
    <div className="w-full flex items-center justify-between gap-3 border-b border-primary-border py-2">
      <div>
        <img className="w-16.5 h-16.5 rounded" src={img} alt="" />
      </div>
      <div className="w-full flex justify-between">
        <div className="w-full flex  flex-col justify-between">
          <h2 className="text-[clamp(0.9rem,2vw,1.5rem)] font-syne font-bold text-primary-text">
            Nightfall Bomber Jacket
          </h2>
          <span className="text-[12px] text-secondary-text">
            Size M · ₹149.00
          </span>
          <div className="w-17.5 mt-1 text-primary-text border border-primary-border rounded h-5.5 flex items-center justify-center text-[12px]">
            <QuantityButton />
          </div>
        </div>
        <div className="flex items-end flex-col">
          <h2 className="text-[clamp(0.9rem,2vw,1.5rem)] text-primary-text">
            {" "}
            ₹149
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CheckoutProduct;
