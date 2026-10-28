import Hero1 from "../assets/Hero1.png.jpg";
import Hero2 from "../assets/Hero2.png.jpg";
import Hero3 from "../assets/Hero3.png.jpg";
import BestSellers from "../components/HomeComponents/BestSellers";
import Category from "../components/HomeComponents/Category";
import NewReleases from "../components/HomeComponents/NewReleases";
import Offer from "../components/HomeComponents/Offer";
import TrustBar from "../components/HomeComponents/TrustBar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#0f1114]">
      {/* Hero section */}
      <div className="flex w-full min-h-150 flex-col gap-8 border border-gray-800 px-4 py-6 sm:px-6 sm:py-15 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-12 xl:px-20">
        {/* Hero Content */}
        <div className="flex w-full flex-col items-start gap-5 lg:max-w-[42%]">
          <h1 className="w-full text-5xl font-syne leading-[1.05] font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-7xl">
            Built for the night shift.
          </h1>
          <p className="w-full max-w-112.5 text-sm leading-6 text-[#909293] sm:text-base">
            Heavyweight hoodies, sharp outerwear and everyday pieces in a
            palette that goes with everything after dark.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
            onClick={() => navigate("/shop")}
              type="button"
              className="rounded cursor-pointer bg-btn px-3 py-2.5 text-xs font-medium text-black transition hover:bg-[#e79e29] sm:px-4 sm:text-sm"
            >
              Shop the collection
            </button>

            <button
            onClick={() => navigate("/shop?category=Jackets")}
              type="button"
              className="rounded border cursor-pointer border-gray-800 bg-[#0f1114] px-3 py-2.5 text-xs font-medium text-white transition hover:border-white sm:px-4 sm:text-sm"
            >
              See new jackets
            </button>
          </div>
        </div>

        {/* Hero Images */}
        <div className="grid w-full grid-cols-2 gap-3 lg:max-w-[58%]">
          {/* Large Image */}
          <div
            style={{ backgroundImage: `url(${Hero1})` }}
            className="h-240px rounded-[10px] bg-cover bg-center bg-no-repeat sm:h-130"
          />

          {/* Two Small Images */}
          <div className="flex min-w-0 flex-col gap-3">
            <div
              style={{ backgroundImage: `url(${Hero2})` }}
              className="min-h-28.5 flex-1 rounded-[10px] bg-cover bg-center bg-no-repeat sm:min-h-38.5"
            />

            <div
              style={{ backgroundImage: `url(${Hero3})` }}
              className="min-h-28.5 flex-1 rounded-[10px] bg-cover bg-center bg-no-repeat sm:min-h-38.5"
            />
          </div>
        </div>
      </div>
      <Category />
      <NewReleases />
      <Offer />
      <TrustBar />
      <BestSellers />
    </div>
  );
}

export default Home;
