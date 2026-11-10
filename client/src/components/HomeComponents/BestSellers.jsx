import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";
import { useProduct } from "../../context/useProduct";

function BestSellers() {
  const { products, loading, error } = useProduct();
  if (loading) {
    return <p>Best sellers products are loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

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
            <Link key={product._id} to={`/product/${product.slug}`}>
              <ProductCard product={product} />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default BestSellers;
