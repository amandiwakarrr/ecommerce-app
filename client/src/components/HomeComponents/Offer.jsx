import { useNavigate } from "react-router-dom";
function Offer() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-auto px-5 sm:px-15 py-10 flex items-center justify-center ">
      <div className="w-full rounded h-auto flex  items-center justify-around bg-linear-to-r from-[#2a2114] to-[#171a1f] p-5  max-[700px]:flex-wrap">
        <div className=" flex justify-center flex-col flex-1  p-5 gap-5 max-[425px]:p-2">
          <h1 className="font-bold font-syne text-[clamp(1rem,4vw,6rem)] text-white">
            Winter drop is live. Take 20% off outerwear.
          </h1>
        </div>
        <div className="flex-1 w-full flex justify-center sm:justify-end items-center font-sans">
          <button
            onClick={() => navigate("/shop?category=Jackets")}
            className="w-35 py-2 px-3  rounded text-black bg-btn hover:bg-btn cursor-pointer"
            type="button"
          >
            Shop jackets
          </button>
        </div>
      </div>
    </div>
  );
}

export default Offer;
