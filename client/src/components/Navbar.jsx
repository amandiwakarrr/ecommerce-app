import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getAllProducts } from "../services/productService";
import useCart from "../context/useCart";
import { useWishlist } from "../context/useWishlist";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact us" },
];

const navLinkClass = ({ isActive }) =>
  `transition-colors duration-300 hover:text-primary-text ${isActive ? "text-primary-text" : "text-secondary-text"
  }`;

const actionClass =
  "relative flex items-center gap-2 rounded px-2 py-2 text-secondary-text sm:px-2.5 transition-colors hover:bg-secondary-bg hover:text-primary-text";

const badgeClass =
  "absolute -top-0.5 left-[18px] flex h-4 min-w-4 items-center justify-center rounded-full bg-btn px-1 text-[10px] font-bold leading-none text-black xl:static xl:h-5 xl:min-w-5 xl:text-xs";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  const closeMenu = () => setIsMenuOpen(false);

  // Fetch products for search
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(
          Array.isArray(data)
            ? data
            : Array.isArray(data?.products)
              ? data.products
              : []
        );
      } catch (error) {
        console.error("Failed to fetch search products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Close suggestions on outside click / Escape
  useEffect(() => {
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowResults(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const getCategoryName = (category) => {
    if (typeof category === "string") return category;
    return category?.name || "";
  };

  const query = search.trim().toLowerCase();

  const searchResults = query
    ? products
      .filter((product) =>
        [product.name, product.title, getCategoryName(product.category)].some(
          (value) =>
            typeof value === "string" && value.toLowerCase().includes(query)
        )
      )
      .slice(0, 5)
    : [];

  const handleSearch = (e) => {
    e?.preventDefault();
    const q = search.trim();
    if (!q) return;
    navigate(`/shop?search=${encodeURIComponent(q)}`);
    setSearch("");
    setShowResults(false);
    closeMenu();
  };

  const handleProductClick = () => {
    setSearch("");
    setShowResults(false);
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary-border bg-dark/90 font-syne backdrop-blur-[2px]">
      <div className="mx-auto grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 px-3 py-3 sm:flex sm:px-5 md:px-10 lg:h-16 lg:gap-x-6 lg:py-0 xl:px-15">

        {/* Left: menu button, logo, desktop links */}
        <div className="order-1 flex min-w-0 items-center gap-2 sm:gap-4 lg:gap-8">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="navbar-navigation"
            className="flex h-9 w-9 items-center justify-center rounded text-primary-text hover:bg-secondary-bg lg:hidden"
          >
            <i
              className={`pi ${isMenuOpen ? "pi-times" : "pi-bars"}`}
              style={{ fontSize: "22px" }}
            ></i>
          </button>

          <Link
            to="/"
            onClick={closeMenu}
            className="whitespace-nowrap text-[clamp(1.1rem,1.5vw,1.75rem)] font-extrabold leading-none text-primary-text"
          >
            Urban<span className="text-tertiary-text">Wear</span>
          </Link>

          <nav
            id="navbar-navigation"
            aria-label="Main"
            className={`${isMenuOpen ? "flex" : "hidden"} absolute left-0 top-full z-50 w-full flex-col gap-1 border-b border-primary-border bg-dark p-3 sm:px-5 md:px-10 lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-6 lg:border-0 lg:bg-transparent lg:p-0`}
          >
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeMenu}
                className={(state) =>
                  `${navLinkClass(state)} rounded px-2 py-2.5 hover:bg-secondary-bg lg:p-0 lg:hover:bg-transparent`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Search: full width row on mobile, inline from sm up */}
        <div
          ref={searchRef}
          className="relative order-3 col-span-2 w-full sm:order-2 sm:ml-auto sm:w-auto sm:min-w-0 sm:flex-1 sm:max-w-sm lg:max-w-xs xl:max-w-sm"
        >
          <form onSubmit={handleSearch} className="relative">
            <input
              className="h-10 w-full rounded-full border border-primary-border bg-secondary-bg pl-5 pr-11 text-sm text-primary-text outline-none transition-colors placeholder:text-secondary-text focus:border-tertiary-text"
              type="search"
              value={search}
              aria-label="Search products"
              onFocus={() => setShowResults(true)}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowResults(true);
              }}
              placeholder="Search Products..."
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-0 top-0 flex h-10 w-11 items-center justify-center text-secondary-text hover:text-primary-text"
            >
              <i className="pi pi-search"></i>
            </button>
          </form>

          {search.trim() && showResults && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-primary-border bg-dark shadow-xl">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Link
                    key={product._id || product.id}
                    to={`/product/${product._id || product.id}`}
                    onClick={handleProductClick}
                    className="block px-4 py-3 text-primary-text hover:bg-secondary-bg"
                  >
                    <p className="truncate">{product.name || product.title}</p>
                    <p className="text-xs text-secondary-text">
                      {getCategoryName(product.category)}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="p-4 text-sm text-secondary-text">
                  No products found.
                </p>
              )}

              <button
                type="button"
                onClick={handleSearch}
                className="w-full border-t border-primary-border p-3 text-tertiary-text hover:bg-secondary-bg"
              >
                View all results
              </button>
            </div>
          )}
        </div>

        {/* Right: wishlist, account, cart */}
        <div className="order-2 flex items-center justify-self-end sm:order-3 sm:justify-self-auto">
          <Link
            to="/account/wishlist"
            onClick={closeMenu}
            aria-label="Wishlist"
            className={actionClass}
          >
            <i className="pi pi-heart text-lg xl:hidden"></i>
            <span className="hidden xl:inline">Wishlist</span>
            {wishlist.length > 0 && (
              <span className={badgeClass}>{wishlist.length}</span>
            )}
          </Link>

          <Link
            to="/account"
            onClick={closeMenu}
            aria-label="Account"
            className={actionClass}
          >
            <i className="pi pi-user text-lg xl:hidden"></i>
            <span className="hidden xl:inline">Account</span>
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
            aria-label="Cart"
            className={actionClass}
          >
            <i className="pi pi-shopping-cart text-lg xl:hidden"></i>
            <span className="hidden xl:inline">Cart</span>
            {cartCount > 0 && (
              <span className={badgeClass}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
