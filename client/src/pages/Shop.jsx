import WhiteLinenShirt from "../assets/white-linen-shirt.jpg";
import ClassicBlackPolo from "../assets/black-polo-shirt.jpg";
import SlimfitChinos from "../assets/beige-chinos.jpg";
import OliveUtilityOvershirt from "../assets/olive-overshirt.jpg";
import CreamKnitSweater from "../assets/cream-sweater.jpg";
import BlackFormalTrousers from "../assets/black-formal-trousers.jpg";
import BlueOxfordShirt from "../assets/blue-oxford-shirt.jpg";
import MinimalWhiteSneakers from "../assets/white-sneakers.jpg";
import BrownLeatherBelt from "../assets/brown-leather-belt.jpg";
import CharcoalCasualBlazer from "../assets/charcoal-blazer.jpg";
import KhakiCasualShorts from "../assets/khaki-shorts.jpg";
import NavyBlueCardigan from "../assets/navy-cardigan.jpg";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const products = [
  {
    id: 1,
    img: WhiteLinenShirt,
    title: "White Linen Shirt",
    price: "₹2,499",
    category: "Shirts",
    tag: "New",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageName: "White Linen Shirt Men Fashion Product Photography",
  },
  {
    id: 2,
    img: ClassicBlackPolo,
    title: "Classic Black Polo",
    price: "₹1,799",
    category: "Tshirts",
    tag: "Popular",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageName: "Black Polo Shirt Men Studio Product Photography",
  },
  {
    id: 3,
    img: SlimfitChinos,
    title: "Beige Slim Fit Chinos",
    price: "₹2,299",
    category: "Pants",
    tag: "",
    sizes: ["28", "30", "32", "34", "36"],
    imageName: "Beige Slim Fit Chino Trousers Men Product Photo",
  },
  {
    id: 4,
    img: OliveUtilityOvershirt,
    title: "Olive Utility Overshirt",
    price: "₹3,299",
    category: "Shirts",
    tag: "Trend",
    sizes: ["S", "M", "L", "XL"],
    imageName: "Olive Green Utility Overshirt Men Fashion",
  },
  {
    id: 5,
    img: CreamKnitSweater,
    title: "Cream Knit Sweater",
    price: "₹3,499",
    category: "Sweaters",
    tag: "New",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageName: "Cream Beige Knit Sweater Men Minimalist Fashion",
  },
  {
    id: 6,
    img: BlackFormalTrousers,
    title: "Black Formal Trousers",
    price: "₹2,799",
    category: "Pants",
    tag: "",
    sizes: ["28", "30", "32", "34", "36"],
    imageName: "Black Tailored Formal Trousers Men Product Photography",
  },
  {
    id: 7,
    img: BlueOxfordShirt,
    title: "Blue Oxford Shirt",
    price: "₹2,199",
    category: "Shirts",
    tag: "Best Seller",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageName: "Light Blue Oxford Button Down Shirt Men",
  },
  {
    id: 8,
    img: MinimalWhiteSneakers,
    title: "Minimal White Sneakers",
    price: "₹3,999",
    category: "Accessories",
    tag: "Popular",
    sizes: ["7", "8", "9", "10", "11"],
    imageName: "Minimal White Low Top Sneakers Isolated White Background",
  },
  {
    id: 9,
    img: BrownLeatherBelt,
    title: "Brown Leather Belt",
    price: "₹1,299",
    category: "Accessories",
    tag: "",
    sizes: ["S", "M", "L", "XL"],
    imageName: "Brown Leather Belt Silver Buckle Product Photography",
  },
  {
    id: 10,
    img: CharcoalCasualBlazer,
    title: "Charcoal Casual Blazer",
    price: "₹5,999",
    category: "Blazers",
    tag: "Premium",
    sizes: ["S", "M", "L", "XL"],
    imageName: "Charcoal Grey Casual Blazer Men Studio Photography",
  },
  {
    id: 11,
    img: KhakiCasualShorts,
    title: "Khaki Casual Shorts",
    price: "₹1,699",
    category: "Shorts",
    tag: "Sale",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageName: "Khaki Beige Casual Shorts Men Fashion Product Photo",
  },
  {
    id: 12,
    img: NavyBlueCardigan,
    title: "Navy Blue Cardigan",
    price: "₹3,799",
    category: "Sweaters",
    tag: "New",
    sizes: ["S", "M", "L", "XL"],
    imageName: "Navy Blue Button Up Knit Cardigan Men Minimalist Fashion",
  },
];

const categories = [
  "All",
  "Hoodies",
  "Jackets",
  "Pants",
  "Shirts",
  "Accessories",
];
function Shop() {
  // const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedOrder, setSortedOrder] = useState("newest");

  const selectedCategory = searchParams.get("category") || "All";
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = Number(a.price.replace(/[₹,]/g, ""));
    const priceB = Number(b.price.replace(/[₹,]/g, ""));

    if (sortedOrder === "low") return priceA - priceB;
    if (sortedOrder === "high") return priceB - priceA;
    return b.id - a.id;
  });

  return (
    <div>
      <div className="w-full h-auto grid sm:grid-cols-5 sm:px-5 lg:px-13 py-5">
        <div className="w-full col-span-4 sm:col-span-1 px-5 gap-1 text-[#8B9BFF]">
          <div className="w-full grid grid-cols-1 pb-5 gap-2">
            <h2 className="text-[clamp(1.8rem,3vw,2rem)] text-primary-text">
              Category
            </h2>
            <div className="w-full  md:w-[80%] flex overflow-x-auto sm:overflow-x-hidden sm:flex-col gap-1 items-center sm:items-start text-secondary-text py-2">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (cat === "All") {
                      setSearchParams({});
                    } else {
                      setSearchParams({ category: cat });
                    }
                  }}
                  className={`w-full font-sans px-2 py-1 sm:py-2 rounded flex ${selectedCategory === cat ? "bg-btn text-dark hover:bg-[#d69329]" : "bg-dark hover:bg-secondary-bg"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4 grid">
          <div className="w-full flex items-center justify-between px-5 pb-5">
            <span className="text-tertiary-text font-syne font-bold ">{filteredProducts.length} products</span>
            <select
              value={sortedOrder}
              onChange={(e) => setSortedOrder(e.target.value)}
              className="border border-primary-border rounded bg-[#0f1114] text-primary-text px-2 py-2 outline-none focus:border-btn"
            >
              <option value="newest">Newest</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>

          <div className=" cards px-5  w-full h-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  place-items-center gap-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
