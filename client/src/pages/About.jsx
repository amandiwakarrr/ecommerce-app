import image from "../assets/Aboutimg.jpg";
import { useNavigate } from "react-router-dom";
function About() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-auto sm:px-5 lg:px-13 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 px-5 border-b border-primary-border pb-5">
        <div className="w-full pb-5 gap-1 max-[425px]:py-2 flex flex-col items-center justify-center">
          <h1 className="text-[clamp(2rem,6vw,7rem)] leading-none text-primary-text font-extrabold font-syne">
            Made for the city after dark.
          </h1>
          <span className="text-secondary-text text-[12px]">
            UrbanWear is a clothing label for people who live in the city at
            every hour. We design pieces that look sharp on the street, hold up
            on the commute, and still feel good at midnight.
          </span>
        </div>
        <div className="w-full flex items-center justify-center">
          <img
            className="w-full sm:w-[60%] rounded"
            src={image}
            alt=""
          />
        </div>
      </div>

      <div className="w-full px-5 py-5">
        <div className="w-full pb-5 gap-1 py-2">
          <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
            What we stand for
          </h1>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-center gap-3">
          <div className="w-full h-full border border-primary-border rounded p-4 bg-secondary-bg">
            <h2 className="text-primary-text mb-2 text-[clamp(1rem,2vw,2rem)]">
              Built to last
            </h2>
            <span className="text-secondary-text text-[12px] leading-relaxed">
              We believe great clothing should stand the test of time. From
              carefully selected fabrics to reinforced stitching and thoughtful
              construction, every detail is designed for everyday comfort,
              durability and long-lasting quality.
            </span>
          </div>

          <div className="w-full h-full border border-primary-border rounded p-4 bg-secondary-bg">
            <h2 className="text-primary-text mb-2 text-[clamp(1rem,2vw,2rem)]">
              Easy to style
            </h2>
            <span className="text-secondary-text text-[12px] leading-relaxed">
              Fashion should feel effortless. Our collections focus on clean
              silhouettes, versatile colors and modern designs that work
              together naturally. Create multiple looks with fewer pieces and
              make your everyday style uniquely yours.
            </span>
          </div>

          <div className="w-full h-full border border-primary-border rounded p-4 bg-secondary-bg">
            <h2 className="text-primary-text mb-2 text-[clamp(1rem,2vw,2rem)]">
              Fair and clear
            </h2>
            <span className="text-secondary-text text-[12px] leading-relaxed">
              Quality fashion shouldn't come with unnecessary complications. We
              believe in transparent pricing, detailed product descriptions,
              accurate sizing information and an honest shopping experience that
              helps you make confident choices.
            </span>
          </div>

          <div className="w-full h-full border border-primary-border rounded p-4 bg-secondary-bg">
            <h2 className="text-primary-text mb-2 text-[clamp(1rem,2vw,2rem)]">
              Made with care
            </h2>
            <span className="text-secondary-text text-[12px] leading-relaxed">
              Every piece deserves attention to detail. We value responsible
              production, thoughtful material selection and better manufacturing
              practices. Our goal is to create fashion that looks good, feels
              good and makes a positive difference.
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-5 py-5">
        <div className="w-full pb-5  py-2">
          <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
            See what's new
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
