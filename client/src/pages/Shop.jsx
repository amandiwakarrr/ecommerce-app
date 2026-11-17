import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { useProduct } from "../context/useProduct";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [sortedOrder, setSortedOrder] = useState("newest");

  const {
    products,
    categories,
    brands,
    loading,
    error,
    categoriesLoading,
    brandsLoading,
    categoriesError,
    brandsError,
  } = useProduct();

  // Selected filters
  const selectedCategory = searchParams.get("category") || "All";
  const selectedBrand = searchParams.get("brand") || "All";

  // Search and filter products
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch = [
      product.name,
      product.title,
      product.category,
      product.brand,
      product.description,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesBrand =
      selectedBrand === "All" ||
      product.brand?.trim().toLowerCase() ===
        selectedBrand.trim().toLowerCase();

    return matchesSearch && matchesCategory && matchesBrand;
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

  // Update category filter
  const handleCategoryChange = (category) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (category === "All") {
        params.delete("category");
      } else {
        params.set("category", category);
      }

      return params;
    });
  };

  // Update brand filter
  const handleBrandChange = (brand) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (brand === "All") {
        params.delete("brand");
      } else {
        params.set("brand", brand);
      }

      return params;
    });
  };

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
        <div className="w-full px-5 grid grid-cols-1 md:grid-cols-5 items-start gap-5">
          {/* Filter and Sorting Section */}
          <div className="w-full col-span-1 overflow-y-auto sticky top-28 md:top-20 self-start z-20 bg-dark/95 backdrop-blur-xl">
            <div className="w-full flex flex-col gap-4 py-3 border-b border-primary-border">
              {/* Product Count and Sorting Filter */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <span className="text-tertiary-text font-syne font-bold text-sm">
                    {filteredProducts.length} Products
                  </span>
                  <h2 className="text-primary-text uppercase tracking-widest text-[10px] font-bold">
                    Sort By
                  </h2>
                </div>

                <div className="flex flex-row md:flex-col md:items-start items-center gap-2 overflow-x-auto md:overflow-visible whitespace-nowrap pb-1 md:pb-0 scrollbar-none [&::-webkit-scrollbar]:hidden">
                  {[
                    { label: "Newest", value: "newest" },
                    { label: "Price: Low to High", value: "low" },
                    { label: "Price: High to Low", value: "high" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortedOrder(option.value)}
                      className={`shrink-0 cursor-pointer md:w-fit rounded-md px-3 py-1.5 text-xs transition-colors ${
                        sortedOrder === option.value
                          ? "bg-btn text-dark font-semibold"
                          : "bg-secondary-bg text-secondary-text hover:text-primary-text"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-col gap-2">
                <h2 className="text-primary-text uppercase tracking-widest text-[10px] font-bold">
                  Categories
                </h2>

                {categoriesLoading && (
                  <span className="text-xs text-secondary-text">
                    Loading categories...
                  </span>
                )}

                {categoriesError && (
                  <span className="text-xs text-red-500">
                    {categoriesError}
                  </span>
                )}

                <div className="flex flex-row md:flex-col md:items-start md:gap-1 items-center gap-5 overflow-x-auto md:overflow-visible whitespace-nowrap pb-1 md:pb-0 scrollbar-none [&::-webkit-scrollbar]:hidden">
                  <button
                    onClick={() => handleCategoryChange("All")}
                    className={`relative cursor-pointer shrink-0 py-2 text-sm transition-colors ${
                      selectedCategory === "All"
                        ? "text-btn font-semibold"
                        : "text-secondary-text hover:text-primary-text"
                    }`}
                  >
                    All
                    {selectedCategory === "All" && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-btn rounded-full" />
                    )}
                  </button>

                  {!categoriesLoading &&
                    !categoriesError &&
                    categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => handleCategoryChange(cat.name)}
                        className={`relative cursor-pointer shrink-0 py-2 text-sm transition-colors ${
                          selectedCategory === cat.name
                            ? "text-btn font-semibold"
                            : "text-secondary-text hover:text-primary-text"
                        }`}
                      >
                        {cat.name}

                        {selectedCategory === cat.name && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-btn rounded-full" />
                        )}
                      </button>
                    ))}
                </div>
              </div>

              {/* Brands */}
              <div className="flex flex-col gap-2">
                <h2 className="text-primary-text uppercase tracking-widest text-[10px] font-bold">
                  Brands
                </h2>

                {brandsLoading && (
                  <span className="text-xs text-secondary-text">
                    Loading brands...
                  </span>
                )}

                {brandsError && (
                  <span className="text-xs text-red-500">{brandsError}</span>
                )}

                <div className="flex flex-row md:flex-col md:items-start md:gap-1 items-center gap-2 overflow-x-auto md:overflow-visible whitespace-nowrap pb-1 md:pb-0 scrollbar-none [&::-webkit-scrollbar]:hidden">
                  <button
                    onClick={() => handleBrandChange("All")}
                    className={`shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-xs transition-colors ${
                      selectedBrand === "All"
                        ? "bg-btn text-dark font-semibold"
                        : "bg-secondary-bg text-secondary-text hover:text-primary-text"
                    }`}
                  >
                    All
                  </button>

                  {!brandsLoading &&
                    !brandsError &&
                    brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => handleBrandChange(brand)}
                        className={`shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-xs transition-colors ${
                          selectedBrand === brand
                            ? "bg-btn text-dark font-semibold"
                            : "bg-secondary-bg text-secondary-text hover:text-primary-text"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="cards col-span-1 md:col-span-4 mt-5 w-full h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-start gap-3">
            {sortedProducts.length === 0 ? (
              <p className="col-span-full py-10 text-center text-secondary-text">
                No products found.
              </p>
            ) : (
              sortedProducts.map((product) => (
                <div key={product._id} className="w-full">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
