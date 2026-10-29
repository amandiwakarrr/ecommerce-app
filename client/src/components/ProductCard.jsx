import { useState } from "react";

function ProductCard({ product }) {
  const [clicked, SetClicked] = useState(false);
  return (
    <div>
      <div
        key={product.id}
        className="card group grid place-items-center cursor-pointer group w-full h-full rounded gap-2"
      >
        <div className="grid place-items-center w-full h-auto pb-5 bg-secondary-bg rounded pt-2">
          <div className="w-full flex px-1 justify-between">
            <span className="text-[12px] p-2 rounded font-bold text-tertiary-text font-syne">
              {product.tag}
            </span>
            <span className="text-[12px p-2 rounded-full flex items-center">
              <i
                onClick={() => SetClicked(!clicked)}
                className={`pi pi-heart-fill ${clicked ? "text-red-600 " : "text-primary-text"}`}
              ></i>
            </span>
          </div>
          <img
            className="w-[70%] aspect-3/4 object-cover h-[90%] rounded"
            src={product.img}
            alt=""
          />
          <div className="relative w-full h-8.75 flex justify-center items-center">
            <span className="group-hover:invisible font-syne text-primary-text ">
              {product.category}
            </span>
            <button className="font-syne absolute inset-0 mx-auto w-[90%] bg-btn py-2 rounded text-black cursor-pointer opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              Quick add
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-0.1 text-gray-200">
          <h1 className="text-[clamp(12px,1vw,2rem)] font-bold font-syne ">
            {product.title}
          </h1>
          <span className="text-[clamp(12px,1vw,2rem)] font-bold">
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
