import product from "../assets/BestSell2.jpg";
import AshDenimJacket from "../assets/BestSell1.jpg";
import CipherGraphicTee from "../assets/BestSell2.jpg";
import ObsidianJoggers from "../assets/BestSell3.jpg";
import EmberZipHoodie from "../assets/BestSell4.jpg";
import ProductCard from "../components/ProductCard";
import QuantityButton from "../components/QuantityButton";
import { useState } from "react";
const products = [
  {
    id: 1,
    img: AshDenimJacket,
    title: "Ash Denim Jacket",
    price: "$129.00",
    category: "Hoodies",
    tag: "New",
  },
  {
    id: 2,
    img: CipherGraphicTee,
    title: "Cipher Graphic Tee",
    price: "$45.00",
    category: "Jackets",
    tag: "Trend",
  },
  {
    id: 3,
    img: ObsidianJoggers,
    title: "Obsidian Joggers",
    price: "$89.00",
    category: "Pants",
    tag: "",
  },
  {
    id: 4,
    img: EmberZipHoodie,
    title: "Ember Zip Hoodie",
    price: "$99.00",
    category: "Tshirts",
    tag: "Best Sell",
  },
];
function Product() {
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [selectedSize, setSelectedSize] = useState("S");
  const colors = [
    { name: "Cream", hex: "#FEF3C7" },
    { name: "Blue", hex: "#60A5FA" },
    { name: "Green", hex: "#065F46" },
    { name: "Mauve", hex: "#C084FC" },
  ];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  return (
    <div className="w-full h-auto py-2 grid place-items-center px-5 sm:px-8 md:px-15 lg:px-18">
      <div className="w-full grid ">
        <div className="w-full py-5 text-[14px] truncate font-syne text-secondary-text flex gap-1">
          <span className="text-tertiary-text">Home</span> {"/"}
          <span className="text-tertiary-text">Hoodies</span> {"/"}
          <span>Void Oversized Hoodie</span>
        </div>
        <div className="w-full grid sm:grid-cols-2 gap-5">
          {/* left */}
          <div className="w-full flex flex-col gap-3">
            <div className="w-full bg-white rounded place-items-center">
              <img
                className="w-[60%] sm:w-[70%] rounded"
                src={product}
                alt=""
              />
            </div>
            <div className="w-full grid grid-cols-4 gap-2">
              <div>
                <img className="rounded" src={product} alt="" />
              </div>
              <div>
                <img className="rounded" src={product} alt="" />
              </div>
              <div>
                <img className="rounded" src={product} alt="" />
              </div>
              <div>
                <img className="rounded" src={product} alt="" />
              </div>
            </div>
          </div>
          {/*right  */}
          <div className="w-full flex flex-col gap-2">
            <h1 className="font-extrabold font-syne text-[clamp(2rem,3vw,4rem)] text-primary-text">
              Void Oversized Hoodie
            </h1>
            <div className="w-full flex items-start gap-2">
              <span className="text-primary-text">₹2,499</span>
              <span className="line-through text-secondary-text">₹3,499</span>
            </div>
            <p className="text-secondary-text">
              Heavyweight 400gsm cotton blend with a relaxed fit, reinforced
              seams and a soft garment-washed finish. Cut for layering and built
              to last.
            </p>

            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex gap-2">
                <span className="text-primary-text">Color :</span>
                <span className="text-tertiary-text">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                    aria-pressed={selectedColor === color.name}
                    onClick={() => setSelectedColor(color.name)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-8 h-8 rounded-full cursor-pointer
              border-2 ${
                selectedColor === color.name
                  ? "border-white outline  outline-gray-400"
                  : "border-transparent"
              }`}
                  />
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex gap-2">
                <span className="text-primary-text">Size :</span>
                <span className="text-tertiary-text">{selectedSize}</span>
              </div>
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
            </div>
            <div className="w-full order grid grid-col-2 md:grid-cols-5 gap-3">
              <div className="col-span-1 order-1 bg-dark text-primary-text py-2 rounded border border-primary-border">
                <QuantityButton />
              </div>
              <button className="col-span-3 cursor-pointer order-3 sm:order-2 bg-btn text-black py-2 rounded border border-primary-border">
                Add to cart
              </button>
              <button className="col-span-1 cursor-pointer order-2 sm:order-3 flex items-center justify-center gap-1 bg-dark text-primary-text py-2 rounded border border-primary-border">
                <i className="pi pi-heart-fill"></i> Wishlist
              </button>
            </div>
            <div className="w-full flex flex-col items-center justify-around p-2 gap-2 bg-secondary-bg border border-primary-border rounded text-secondary-text">
              <div className="w-full flex items-center justify-between">
                <span>Delivery</span>
                <span>3–5 business days</span>
              </div>
              <div className="w-full flex items-center justify-between">
                <span>Returns</span>
                <span>Free within 30 days</span>
              </div>
              <div className="w-full flex items-center justify-between">
                <span>Febric</span>
                <span>80% cotton, 20% polyester</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-10">
        <div className="w-full grid gap-5 max-[425px]:py-2 ">
          <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
            You may also like
          </h1>
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 place-items-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
