import { useNavigate } from "react-router-dom";
const categories = [
  {
    id: 1,
    title: "Hoodies",
    styles: "5 Styles",
  },
  {
    id: 2,
    title: "Jackets",
    styles: "6 Styles",
  },
  {
    id: 3,
    title: "Pants",
    styles: "4 Styles",
  },
  {
    id: 4,
    title: "Shirts",
    styles: "8 Styles",
  },
];
function Category() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Category */}
      <section className="w-full gap-3 h-auto py-8 pb-0 px-5 sm:px-18 flex flex-col">
        <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
          Shop by category
        </h3>
        <div className="w-full h-auto py-8 grid grid-cols-2 md:grid-cols-4 md:gap-5 gap-3 place-items-center ">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/shop?category=${encodeURIComponent(cat.title)}`)
              }
              className="grid cursor-pointer grid-cols-2 w-full place-items-center py-3.75 rounded-2xl border border-primary-border hover:border-h-border"
            >
              <h3 className="text-primary-text text-[clamp(0.8rem,2vw,1rem)] font-bold">
                {cat.title}
              </h3>
              <span className="text-secondary-text text-[14px] max-[425px]:text-[12px]">
                {cat.styles}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Category;
