import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full px-5 sm:px-15 grid grid-cols-1 md:grid-cols-2 gap-4 py-10 border border-primary-border">
      <div className="grid gap-3">
        <div className="grid gap-5 sm:gap-20 grid-cols-1 sm:grid-cols-2 justify-around">
          <div>
            <Link
              to={"/"}
              className="inline-block origin-center text-center font-sans text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-tight text-primary-text"
            >
              Urban<span className="text-tertiary-text">Wear</span>
            </Link>
            <p className="text-secondary-text">
              Dark, durable streetwear designed in small runs and made to be
              worn hard.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-primary-text">Shop</span>
            <Link
              to={"/shop?category=Hoodies"}
              className="text-secondary-text hover:text-primary-text"
            >
              Hoodies
            </Link>
            <Link
              to={"/shop?category=Jackets"}
              className="text-secondary-text hover:text-primary-text"
            >
              Jackets
            </Link>
            <Link
              to={"/shop?category=Pants"}
              className="text-secondary-text hover:text-primary-text"
            >
              Pants
            </Link>
            <Link
              to={"/shop?category=Accessories"}
              className="text-secondary-text hover:text-primary-text"
            >
              Accessories
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-primary-text">Help</span>
          <Link className="text-secondary-text hover:text-primary-text">Shipping</Link>
          <Link className="text-secondary-text hover:text-primary-text">Returns</Link>
          <Link className="text-secondary-text hover:text-primary-text">Size guide</Link>
          <Link to={"/contact"} className="text-secondary-text hover:text-primary-text">Contact us</Link>
        </div>
        <div className="flex  flex-col gap-3">
          <h5 className="font-bold text-primary-text">Get 10% off your first order</h5>
          <div className="flex gap-1">
            <input
              className="w-[70%] border border-primary-border bg-secondary-bg px-5 py-2 rounded text-primary-text"
              type="search"
              placeholder="Email address"
            />
            <button className="bg-btn px-4 py-3 rounded text-black">
              Join
            </button>
          </div>
        </div>
      </div>
      <div>
        <span className="text-secondary-text">
          © 2026 UrbanWear. All rights reserved.
        </span>
      </div>
    </div>
  );
}

export default Footer;
