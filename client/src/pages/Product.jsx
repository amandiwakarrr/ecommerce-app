import product from "../assets/BestSell2.jpg";
import AshDenimJacket from "../assets/BestSell1.jpg";
import CipherGraphicTee from "../assets/BestSell2.jpg";
import ObsidianJoggers from "../assets/BestSell3.jpg";
import EmberZipHoodie from "../assets/BestSell4.jpg";
import ProductCard from "../components/ProductCard";
import QuantityButton from "../components/QuantityButton";
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
  return (
    <div className="w-full h-auto py-2 grid place-items-center px-5 sm:px-8 md:px-15 lg:px-18">
      <div className="w-full grid ">
        <div className="w-full py-5 text-[14px] truncate font-syne text-gray-400">
          Home / Hoodies / Void Oversized Hoodie
        </div>
        <div className="w-full grid sm:grid-cols-2 gap-5">
          {/* left */}
          <div className="w-full flex flex-col gap-3">
            <div className="w-full bg-white rounded">
              <img className="rounded" src={product} alt="" />
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
            <h1 className="font-extrabold font-syne text-[clamp(2rem,3vw,4rem)]">
              Void Oversized Hoodie
            </h1>
            <div className="w-full flex items-start gap-2">
              <span>₹2,499</span>
              <span className="line-through text-gray-400">₹3,499</span>
            </div>
            <p className="text-gray-400">
              Heavyweight 400gsm cotton blend with a relaxed fit, reinforced
              seams and a soft garment-washed finish. Cut for layering and built
              to last.
            </p>

            <div className="w-full flex flex-col gap-2">
              <span>Color</span>
              <div className="w-full flex items-start justify-start gap-2 ">
                <span className="w-7.5 h-7.5 rounded-full outline-2 outline-gray-700 bg-amber-100 cursor-pointer"></span>
                <span className="w-7.5 h-7.5 rounded-full outline-2 outline-gray-700 bg-blue-400 cursor-pointer"></span>
                <span className="w-7.5 h-7.5 rounded-full outline-2 outline-gray-700 bg-emerald-800 cursor-pointer"></span>
                <span className="w-7.5 h-7.5 rounded-full outline-2 outline-gray-700 bg-mauve-400 cursor-pointer"></span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span>Size</span>
              <div className="w-50 grid grid-cols-4 gap-2 ">
                <div className=" py-1 rounded cursor-pointer border-gray-800 border flex items-center justify-center">
                  {" "}
                  <span>S</span>
                </div>
                <div className=" py-1 rounded cursor-pointer border-gray-800 border flex items-center justify-center">
                  {" "}
                  <span>M</span>
                </div>
                <div className=" py-1 rounded cursor-pointer border-gray-800 border flex items-center justify-center">
                  {" "}
                  <span>L</span>
                </div>
                <div className=" py-1 rounded cursor-pointer border-gray-800 border flex items-center justify-center">
                  <span>XL</span>
                </div>
              </div>
            </div>
            <div className="w-full order grid grid-col-2 md:grid-cols-5 gap-3">
              <div className="col-span-1 order-1 bg-dark text-white py-2 rounded border border-gray-800">
                <QuantityButton />
              </div>
              <button className="col-span-3 order-3 sm:order-2 bg-btn text-black py-2 rounded border border-gray-800">
                Add to cart
              </button>
              <button className="col-span-1 cursor-pointer order-2 sm:order-3 flex items-center justify-center gap-1 bg-dark text-white py-2 rounded border border-gray-800">
                <i className="pi pi-heart-fill"></i> Wishlist
              </button>
            </div>
            <div className="w-full flex flex-col items-center justify-around p-2 gap-2 bg-[#1b1b1b] border border-gray-800 rounded text-gray-400">
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
        <div className="w-full grid gap-5 text-[#8B9BFF] max-[425px]:py-2 ">
          <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-white font-extrabold font-syne">
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
