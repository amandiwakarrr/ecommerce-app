
import { Link } from "react-router-dom";
import VoidOversizedHoodie from "../../assets/NewArriable1.png";
import NightfallBomberacket from "../../assets/NewArriable2.png";
import SlateCargoPants from "../../assets/NewArriable3.png";
import MonoBoxyTee from "../../assets/NewArriable4.jpg";
import ProductCard from "../ProductCard";
const products = [
  {
    id: 1,
    img: VoidOversizedHoodie,
    title: "Void Oversized Hoodie",
    price: "$79.00",
    category: "Hoodies",
    tag: "New",
  },
  {
    id: 2,
    img: NightfallBomberacket,
    title: "Nightfall Bomber Jacket",
    price: "$149.00",
    category: "Jackets",
    tag: "",
  },
  {
    id: 3,
    img: SlateCargoPants,
    title: "Slate Cargo Pants",
    price: "$89.00",
    category: "Pants",
    tag: "",
  },
  {
    id: 4,
    img: MonoBoxyTee,
    title: "Mono Boxy Tee",
    price: "$39.00",
    category: "Tshirts",
    tag: "Best Sell",
  },
];

function NewArrivals() {
  return (
    <div className="w-full h-auto grid py-5">
      <div className="w-full pb-5 flex justify-between items-center px-5 sm:px-19 gap-1 max-[425px]:py-2">
        <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-white font-extrabold font-syne">
          New arrivals
        </h1>
        <Link to={"/shop"} className="cursor-pointer hover:underline text-btn">
          Shop All
        </Link>
      </div>
      <div className="cards w-full h-auto px-5 sm:px-16 grid grid-cols-2 sm:grid-cols-4 place-items-center gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
