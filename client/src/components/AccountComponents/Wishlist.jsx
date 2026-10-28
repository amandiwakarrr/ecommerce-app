import VoidOversizedHoodie from "../../assets/NewArriable1.png";
import NightfallBomberacket from "../../assets/NewArriable2.png";
import SlateCargoPants from "../../assets/NewArriable3.png";
import MonoBoxyTee from "../../assets/NewArriable4.jpg";

import { Link } from "react-router-dom";
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

function Wishlist() {
  return (
    <div className="px-5">
      <div className="w-full flex flex-wrap items-center justify-between gap-2 py-3">
        <span className="text-[clamp(1.1rem,3vw,2rem)]">Wishlist</span>
        <Link className="text-sm sm:text-[16px] text-btn">View all</Link>
      </div>
      <div className="cards w-full h-auto grid grid-cols-2 md:grid-cols-4 place-items-center gap-5">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
