import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { useProduct } from "../context/useProduct";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [sortedOrder, setSortedOrder] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");

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
        <div className="w-full px-5 grid grid-cols-1 lg:grid-cols-5 items-start gap-5">
          {/* Filter and Sorting Section */}
          <div className="w-full col-span-1 sticky top-30 min-[540px]:top-10 md:top-20 self-start z-20">
            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              aria-expanded={isFilterOpen}
              className="lg:hidden w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-primary-border bg-secondary-bg text-primary-text hover:border-btn transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-btn/10">
                  <i className="pi pi-sliders-h text-btn"></i>
                </span>
                <span className="font-semibold text-sm">Filters & Sort</span>
              </span>

              <span className="flex items-center gap-3">
                <span className="text-xs text-secondary-text">
                  {filteredProducts.length} Products
                </span>
                <i
                  className={`pi ${isFilterOpen ? "pi-chevron-up" : "pi-chevron-down"} text-xs text-secondary-text`}
                ></i>
              </span>
            </button>

            {/* Filter Content */}
            <div
              className={`${
                isFilterOpen ? "flex" : "hidden"
              } lg:flex flex-col gap-2 p-4 mt-2 md:mt-0 rounded-xl border border-primary-border bg-[#141619] shadow-lg`}
            >
              {/* Filter Header */}
              <div className="hidden md:flex items-center justify-between ">
                <div>
                  <h2 className="font-syne font-bold text-sm tracking-wider sm:hidden flex text-primary-text">
                    FILTER PRODUCTS
                  </h2>
                  <p className="text-[11px] text-secondary-text sm:hidden flex mt-1">
                    Refine your collection
                  </p>
                </div>
                <span className="sm:hidden flex">
                  <i className="pi pi-sliders-h text-btn  text-lg"></i>
                </span>
              </div>

              {/* Product Count */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary-text">
                  Products
                </span>
                <span className="text-xs font-semibold text-btn bg-btn/10 border border-btn/20 rounded-full px-3 py-1">
                  {filteredProducts.length}
                </span>
              </div>

              <div className="border-t border-primary-border"></div>

              {/* Sorting */}
              <div className="flex flex-col gap-3">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-text">
                  Sort By
                </h2>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Newest", value: "newest" },
                    { label: "Price: Low to High", value: "low" },
                    { label: "Price: High to Low", value: "high" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortedOrder(option.value)}
                      className={`cursor-pointer rounded-lg px-2 py-1 text-[11px] font-medium text-left transition-all ${
                        sortedOrder === option.value
                          ? "bg-btn text-dark shadow-sm font-bold"
                          : "bg-secondary-bg border border-primary-border text-secondary-text hover:border-btn hover:text-primary-text"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-primary-border"></div>

              {/* Categories */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-text">
                    Categories
                  </h2>
                  <i className="pi pi-th-large text-xs text-secondary-text"></i>
                </div>

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

                <div className="flex flex-row lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-y-auto lg:max-h-64 lg:overflow-x-hidden whitespace-nowrap scrollbar-none [&::-webkit-scrollbar]:hidden">
                  <button
                    onClick={() => handleCategoryChange("All")}
                    className={`shrink-0 md:w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-xs text-left transition-all ${
                      selectedCategory === "All"
                        ? "bg-btn/10 text-btn font-bold border border-btn/20"
                        : "text-secondary-text border border-transparent hover:bg-secondary-bg hover:text-primary-text"
                    }`}
                  >
                    All Categories
                    {selectedCategory === "All" && (
                      <i className="pi pi-check text-btn text-xs"></i>
                    )}
                  </button>

                  {!categoriesLoading &&
                    !categoriesError &&
                    categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => handleCategoryChange(cat.name)}
                        className={`shrink-0 md:w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs text-left transition-all ${
                          selectedCategory === cat.name
                            ? "bg-btn/10 text-btn font-bold border border-btn/20"
                            : "text-secondary-text border border-transparent hover:bg-secondary-bg hover:text-primary-text"
                        }`}
                      >
                        {cat.name}

                        {selectedCategory === cat.name && (
                          <i className="pi pi-check text-btn text-xs"></i>
                        )}
                      </button>
                    ))}
                </div>
              </div>

              <div className="border-t border-primary-border"></div>

              {/* Brands */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary-text">
                    Brands
                  </h2>

                  <span className="text-[10px] text-secondary-text">
                    {brands.length} available
                  </span>
                </div>

                {brandsLoading && (
                  <span className="text-xs text-secondary-text">
                    Loading brands...
                  </span>
                )}

                {brandsError && (
                  <span className="text-xs text-red-500">{brandsError}</span>
                )}

                {!brandsLoading && !brandsError && (
                  <>
                    {/* Brand Search */}
                    {brands.length > 5 && (
                      <div className="relative">
                        <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text text-xs"></i>

                        <input
                          type="text"
                          value={brandSearch}
                          onChange={(e) => setBrandSearch(e.target.value)}
                          placeholder="Search brands..."
                          className="w-full h-10 pl-9 pr-9 rounded-lg bg-secondary-bg border border-primary-border text-primary-text text-xs placeholder:text-secondary-text outline-none focus:border-btn transition-colors"
                        />

                        {brandSearch && (
                          <button
                            type="button"
                            onClick={() => setBrandSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text hover:text-primary-text"
                          >
                            <i className="pi pi-times text-xs"></i>
                          </button>
                        )}
                      </div>
                    )}

                    {/* All Brands */}
                    <button
                      onClick={() => handleBrandChange("All")}
                      className={`w-full flex items-center justify-between rounded-lg px-3 py-1 text-xs transition-all ${
                        selectedBrand === "All"
                          ? "bg-btn/10 text-btn font-bold border border-btn/20"
                          : "text-secondary-text border border-transparent hover:bg-secondary-bg hover:text-primary-text"
                      }`}
                    >
                      All Brands
                      {selectedBrand === "All" && (
                        <i className="pi pi-check text-btn text-xs"></i>
                      )}
                    </button>

                    {/* Scrollable Brand List */}
                    <div className="flex flex-col gap-1 max-h-48 overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin">
                      {brands
                        .filter((brand) =>
                          brand
                            .toLowerCase()
                            .includes(brandSearch.trim().toLowerCase()),
                        )
                        .map((brand) => (
                          <button
                            key={brand}
                            onClick={() => handleBrandChange(brand)}
                            className={`w-full flex items-center justify-between rounded-lg px-3 py-1 text-xs text-left transition-all ${
                              selectedBrand === brand
                                ? "bg-btn/10 text-btn font-bold border border-btn/20"
                                : "text-secondary-text border border-transparent hover:bg-secondary-bg hover:text-primary-text"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  selectedBrand === brand
                                    ? "bg-btn"
                                    : "bg-secondary-text/40"
                                }`}
                              ></span>
                              {brand}
                            </span>

                            {selectedBrand === brand && (
                              <i className="pi pi-check text-btn text-xs"></i>
                            )}
                          </button>
                        ))}

                      {brands.filter((brand) =>
                        brand
                          .toLowerCase()
                          .includes(brandSearch.trim().toLowerCase()),
                      ).length === 0 && (
                        <p className="text-xs text-secondary-text py-3 text-center">
                          No brands found.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Apply Button */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="lg:hidden w-full rounded-lg bg-btn text-dark font-bold text-sm py-3 hover:bg-[#d69329] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="cards col-span-1 lg:col-span-4 w-full h-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 items-start gap-3">
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
