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
      <div className="w-full min-w-0 h-auto py-5 px-0 sm:px-5 lg:px-13">
        {/* <div className="w-full col-span-4 sm:col-span-1 px-5 gap-1 text-[#8B9BFF]">
          <div className="w-full grid grid-cols-1 pb-5 gap-2">
            <h2 className="text-[clamp(1.8rem,3vw,2rem)] text-primary-text font-syne font-bold">
              Category
            </h2>
           
          </div>
        </div> */}

        <div className="w-full px-5 flex flex-col ">
          <div className="w-full flex flex-col bg-dark/90 backdrop-blur-[2px] sticky top-16 pt-2 z-10">
            <div className="w-full flex flex-wrap items-center justify-between pb-2 gap-3">
              <span className="text-tertiary-text font-syne font-bold text-sm">
                {filteredProducts.length} products
              </span>

              <select
                value={sortedOrder}
                onChange={(e) => setSortedOrder(e.target.value)}
                className="border h-10 max-w-full border-primary-border rounded bg-dark text-primary-text px-2 text-sm outline-none focus:border-btn"
              >
                <option value="newest">Newest</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </div>
            <div className="w-full flex overflow-x-auto sm:overflow-x-hidden sm:w-150 gap-1 items-center text-secondary-text pb-3">
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
                  className={`w-full justify-center items-center font-sans cursor-pointer px-2 py-1 sm:py-2 rounded flex ${selectedCategory === cat ? "bg-btn text-dark hover:bg-[#d69329]" : " hover:bg-secondary-bg"}`}
                >
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="cards mt-5 w-full h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  place-items-center gap-3">
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
