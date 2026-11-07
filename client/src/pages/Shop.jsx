import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../services/productService";

const categories = [
  "All",
  "Hoodies",
  "Jackets",
  "Pants",
  "Shirts",
  "Accessories",
];

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [sortedOrder, setSortedOrder] = useState("newest");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Category filter
  const selectedCategory = searchParams.get("category") || "All";

  // Search and category filtering
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch = [
      product.name,
      product.title,
      product.category,
      product.description,
    ]

      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Products sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortedOrder === "low") {
      return (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price);
    }

    if (sortedOrder === "high") {
      return (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price);
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (loading) {
    return (
      <div className="py-20 text-center text-primary-text">
        Loading products...
      </div>
    );
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

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
          {/* Filter and Sorting Section */}
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
            {/* Category Filter */}
            <div className="w-full flex overflow-x-auto sm:overflow-x-hidden sm:w-150 gap-1 items-center text-secondary-text pb-3">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchParams((prev) => {
                      const params = new URLSearchParams(prev);

                      if (cat === "All") {
                        params.delete("category");
                      } else {
                        params.set("category", cat);
                      }

                      return params;
                    });
                  }}
                  className={`w-full justify-center items-center font-sans cursor-pointer px-2 py-1 sm:py-2 rounded flex ${selectedCategory === cat ? "bg-btn text-dark hover:bg-[#d69329]" : " hover:bg-secondary-bg"}`}
                >
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Products Grid */}
          <div className="cards mt-5 w-full h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  place-items-center gap-3">
            {sortedProducts.length === 0 ? (
              <p className="col-span-full py-10 text-center text-secondary-text">
                No products found.
              </p>
            ) : (
              sortedProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="w-full"
                >
                  <ProductCard product={product} />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
