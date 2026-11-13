import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllProducts } from "../services/productService";
import useCart from "../context/useCart";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Failed to fetch search products:", error);
      }
    };
    fetchProducts();
  }, []);

  const searchResults = products
    .filter((product) => {
      const query = search.trim().toLowerCase();
      return (
        query &&
        [product.name, product.title, product.category]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query))
      );
    })
    .slice(0, 5);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setSearch("");
    setShowResults(false);
  };

  return (
    <div className="sticky font-syne top-0 z-40 w-full min-h-16 bg-dark/90 backdrop-blur-[2px] flex items-center justify-center border-b border-primary-border px-3 sm:px-5 md:px-10  xl:px-15">
      <div className="w-full flex flex-row items-center justify-between pl-2">
        <div
          className={`h-16 flex flex-row items-center justify-center max-[720px]:gap-4 gap-5 ${isMenuOpen}? flex-col`}
        >
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              aria-label="open menu"
              className="hidden max-[720px]:flex text-primary-text text-center items-center"
            >
              {/* Menu */}
              <i className="pi pi-bars" style={{ fontSize: "25px" }}></i>
            </button>
            <Link
              to={"/"}
              className="inline-block origin-center text-center text-[clamp(1rem,1.5vw,2rem)] font-extrabold  text-primary-text"
            >
              Urban<span className="text-tertiary-text">Wear</span>
            </Link>
          </div>
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            }  absolute top-full left-0 z-50 w-full flex-col items-start gap-5 bg-dark border border-border p-5
              min-[721px]:static min-[721px]:flex min-[721px]:w-auto min-[721px]:flex-row min-[721px]:items-center min-[721px]:gap-3 min-[721px]:border-0 min-[721px]:bg-transparent min-[721px]:p-0`}
          >
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `hover:text-primary-text transition-colors duration-300 ${
                  isActive ? "text-primary-text" : "text-secondary-text"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/shop"}
              className={({ isActive }) =>
                `hover:text-primary-text transition-colors duration-300 ${
                  isActive ? "text-primary-text" : "text-secondary-text"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `hover:text-primary-text transition-colors duration-300 ${
                  isActive ? "text-primary-text" : "text-secondary-text"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `hover:text-primary-text transition-colors duration-300 ${
                  isActive ? "text-primary-text" : "text-secondary-text"
                }`
              }
            >
              Contact us
            </NavLink>
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="px-5 max-[1080px]:hidden relative">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                className="border border-primary-border bg-secondary-bg px-5 py-2 rounded-4xl text-primary-text outline-none"
                type="search"
                value={search}
                onFocus={() => setShowResults(true)}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Products..."
              />
              <button type="submit" className="-ml-10">
                <i className="pi pi-search text-secondary-text"></i>
              </button>
            </form>

            {search.trim() && showResults && (
              <div className="absolute top-full mt-2 left-5 right-5 bg-dark border border-primary-border rounded-lg shadow-xl overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      onClick={() => {
                        setSearch("");
                        setShowResults(false);
                      }}
                      className="block px-4 py-3 text-primary-text hover:bg-secondary-bg"
                    >
                      <p>{product.name || product.title}</p>
                      <p className="text-xs text-secondary-text">
                        {product.category}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="p-4 text-secondary-text text-sm">
                    No products found.
                  </p>
                )}

                <button
                  onClick={handleSearch}
                  className="w-full border-t border-primary-border p-3 text-tertiary-text hover:bg-secondary-bg"
                >
                  View all results
                </button>
              </div>
            )}
          </div>
          <Link
            to={"/account/wishlist"}
            className=" flex items-center text-secondary-text hover:text-primary-text  hover:bg-secondary-bg active:text-primary-text px-2 py-2 rounded max-[510px]:hidden"
          >
            Wishlist
          </Link>
          <Link
            to={"/account"}
            className=" flex items-center text-secondary-text hover:text-primary-text  hover:bg-secondary-bg active:text-primary-text px-2 py-2 rounded "
          >
            Account
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 text-secondary-text hover:text-primary-text hover:bg-secondary-bg active:text-primary-text px-2 py-2 rounded max-[425px]:hidden"
          >
            Cart
            {cartCount > 0 && (
              <span className="bg-btn text-black text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
