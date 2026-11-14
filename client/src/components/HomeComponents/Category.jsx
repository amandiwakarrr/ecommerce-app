import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/useProduct";

function Category() {
  const { categories, categoriesLoading, categoriesError } = useProduct();
  const navigate = useNavigate();
  if (categoriesLoading) {
    return <p className="px-5">Loading categories...</p>;
  }
  if (categoriesError) {
    return <p className="px-5">{categoriesError}</p>;
  }

  if (categories.length === 0) {
    return <p className="px-5">No categories available.</p>;
  }
  return (
    <div>
      {/* Category */}
      <section className="w-full gap-3 h-auto py-8 pb-0 px-5 sm:px-18 flex flex-col">
        <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
          Shop by category
        </h1>
        <div className="w-full h-auto py-8 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 md:gap-5 gap-3 place-items-center ">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() =>
                navigate(`/shop?category=${encodeURIComponent(cat.name)}`)
              }
              className="grid cursor-pointer grid-cols-2 w-full place-items-center py-3.75 rounded-2xl border border-primary-border hover:border-h-border"
            >
              <h3 className="text-primary-text text-[clamp(0.8rem,2vw,1rem)] font-bold">
                {cat.name}
              </h3>
              <span className="text-secondary-text text-[14px] max-[425px]:text-[12px]">
                {cat.count} Styles
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Category;
