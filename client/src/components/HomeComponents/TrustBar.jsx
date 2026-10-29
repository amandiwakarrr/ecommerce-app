
function TrustBar() {
  return (
    <div>
      <section className="w-full h-auto py-8 px-5 sm:px-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        <div className="flex flex-col ">
          <h3 className="text-primary-text">Free Shipping</h3>
          <span className="text-secondary-text text-[14px] max-[425px]:text-[12px]">
            On orders over $100
          </span>
        </div>

        <div className="flex flex-col ">
          <h3 className="text-primary-text">Easy Returns</h3>
          <span className="text-secondary-text text-[14px] max-[425px]:text-[12px]">
            30 days, no questions
          </span>
        </div>

        <div className="flex flex-col ">
          <h3 className="text-primary-text">Secure Checkout</h3>
          <span className="text-secondary-text text-[14px] max-[425px]:text-[12px]">
            Cards, UPI and wallets
          </span>
        </div>

        <div className="flex flex-col ">
          <h3 className="text-primary-text">Made to Last</h3>
          <span className="text-secondary-text text-[14px] max-[425px]:text-[12px]">
            Heavyweight fabrics
          </span>
        </div>
      </section>
    </div>
  );
}

export default TrustBar;
