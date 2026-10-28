import AshDenimJacket from "../../assets/BestSell1.png";
import CipherGraphicTee from "../../assets/BestSell2.png";
import ObsidianJoggers from "../../assets/BestSell3.png";
import EmberZipHoodie from "../../assets/BestSell4.png";
import ProductCard from "../ProductCard";
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

function BestSellers() {
  return (
    <div className="w-full h-auto grid py-5">
      <div className="w-full pb-5 px-5 sm:px-19 gap-1 text-[#8B9BFF] max-[425px]:py-2">
        <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-white font-extrabold font-sans">
          Best sellers
        </h1>
      </div>
      <div className="cards w-full h-auto px-5 sm:px-16 grid grid-cols-2 sm:grid-cols-4 place-items-center gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
