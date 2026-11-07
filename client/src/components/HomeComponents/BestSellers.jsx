import ProductCard from "../ProductCard";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../services/productService";
import { Link } from "react-router-dom";

function BestSellers() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        const productList = Array.isArray(data)
          ? data
          : data.products || data.data?.products || [];
        setProducts(productList);
      } catch (error) {
        console.error("Failed to load recommended products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="w-full h-auto grid py-5">
      <div className="w-full pb-5 px-5 sm:px-19 gap-1 text-[#8B9BFF] max-[425px]:py-2">
        <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
          Best sellers
        </h1>
      </div>
      <div className="cards w-full h-auto px-5 sm:px-16 grid grid-cols-2 sm:grid-cols-4 place-items-center gap-5">
        {products
          .filter((product) => product.badge?.toLowerCase() === "best seller")
          .slice(0, 4)
          .map((product) => (
            <Link key={product.id} to={`/product/${product._id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default BestSellers;
