import image from "../assets/Aboutimg.jpg";
import { useNavigate } from "react-router-dom";
function About() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-auto sm:px-5 lg:px-13 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 px-5 border-b border-primary-border pb-5">
        <div className="w-full pb-5 gap-1 max-[425px]:py-2 flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-8xl text-primary-text font-extrabold font-syne">
            Made for the city after dark.
          </h1>
          <span className="text-secondary-text text-[12px]">
            UrbanWear is a clothing label for people who live in the city at
            every hour. We design pieces that look sharp on the street, hold up
            on the commute, and still feel good at midnight.
          </span>
        </div>
        <div className="w-full flex items-center justify-center">
          <img className="w-full sm:w-[60%] rounded" src={image} alt="" />
        </div>
      </div>
      <div className="w-full px-5 py-5">
        <div className="w-full pb-5 gap-1 py-2">
          <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
            What we stand for
          </h1>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-center gap-2">
          <div className="w-full border border-primary-border rounded p-2">
            <h2 className="text-primary-text text-[20px]">Built to last</h2>
            <span className="text-secondary-text text-[12px]">
              Heavy fabrics, reinforced seams and details that survive daily
              wear and repeated washing.
            </span>
          </div>
          <div className="w-full border border-primary-border rounded p-2">
            <h2 className="text-primary-text text-[20px]">Easy to style</h2>
            <span className="text-secondary-text text-[12px]">
              A focused dark palette and clean silhouettes, so every piece mixes
              with the rest of your wardrobe.
            </span>
          </div>
          <div className="w-full border border-primary-border rounded p-2">
            <h2 className="text-primary-text text-[20px]">Fair and clear</h2>
            <span className="text-secondary-text text-[12px]">
              Honest pricing, accurate sizing and plain descriptions of what
              each piece is made from.
            </span>
          </div>
          <div className="w-full border border-primary-border rounded p-2">
            <h2 className="text-primary-text text-[20px]">Made with care</h2>
            <span className="text-secondary-text text-[12px]">
              We work with manufacturers who treat their people well and we cut
              waste wherever we can.
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-5 py-5">
        <div className="w-full pb-5  py-2">
          <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
            See what’s new
          </h1>
          <span className="text-[12px] text-secondary-text">
            Browse the latest drops, or get in touch if you have a question
            about sizing, orders or returns.
          </span>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex gap-2">
            <button
              onClick={() => navigate("/shop?category=All")}
              className="cursor-pointer text-dark bg-btn px-2 py-2 rounded"
            >
              Shop new arrivals
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="cursor-pointer text-primary-text border border-primary-border px-2 py-2 rounded"
            >
              Contact us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
