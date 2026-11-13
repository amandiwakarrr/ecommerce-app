import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { useWishlist } from "../../context/useWishlist";

function Wishlist() {
  const { wishlist } = useWishlist();
  return (
    <div className="px-5 mt-2">
      <div className="w-full flex flex-wrap items-center justify-between gap-2 py-3">
        <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
          Wishlist
        </h1>

        <span className="text-sm sm:text-[16px] text-tertiary-text">
          {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <i className="pi pi-heart text-4xl text-tertiary-text mb-4" />

          <h2 className="text-xl font-bold text-primary-text">
            Your wishlist is empty
          </h2>

          <p className="text-sm text-tertiary-text mt-2">
            Save your favourite products here.
          </p>

          <Link
            to="/shop"
            className="mt-5 px-6 py-2 bg-dark text-primary-text border border-primary-border rounded"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="cards w-full h-auto grid grid-cols-2 md:grid-cols-4 place-items-center gap-5">
          {wishlist.map((item) => {
            const product = {
              ...item.toObject?.(),
              ...item,
              _id: item.productId,
            };

            return (
              <ProductCard
                key={item._id}
                product={product}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
