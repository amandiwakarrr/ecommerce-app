function Contact() {
  const supportLinks = [
    {
      id: 1,
      title: "Return & exchanges",
      subtitle: "Questions about returning an item?",
      titleIcon: "pi pi-sync",
      arrowIcon: "pi pi-arrow-up-right",
      path: "/contact",
    },
    {
      id: 2,
      title: "Talk to our team",
      subtitle: "We're happy to help you out.",
      titleIcon: "pi pi-comments",
      arrowIcon: "pi pi-arrow-up-right",
      path: "/contact",
    },
    {
      id: 3,
      title: "support@urbanwear.com",
      subtitle: "For orders and general queries",
      titleIcon: "pi pi-envelope",
      arrowIcon: "pi pi-arrow-up-right",
      path: "/contact",
    },
    {
      id: 4,
      title: "+91 8630750297",
      subtitle: "Mon–Sat, 10 AM–6 PM",
      titleIcon: "pi pi-phone",
      arrowIcon: "pi pi-arrow-up-right",
      path: "/contact",
    },
    {
      id: 5,
      title: "Monday to Saturday",
      subtitle: "10:00 AM – 6:00 PM IST",
      titleIcon: "pi pi-comments",
      arrowIcon: "pi pi-arrow-up-right",
      path: "/contact",
    },
  ];
  return (
    <div className="w-full h-auto grid gap-5 px-5  py-2 sm:py-5 sm:px-8 md:px-13 lg:px-16">
      <span className="text-[12px] text-tertiary-text font-bold">
        WE'RE HERE TO HELP
      </span>
      <div className="w-full grid grid-cols-1 md:grid-cols-3">
        <div className="w-full sm:col-span-2">
          <div className="w-full flex flex-col gap-2 p-2 rounded ">
            <h2 className="text-[clamp(1.5rem,2vw,2rem)] text-primary-text">
              Send us a message
            </h2>
            <div className="w-full">
              <form className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col gap-1">
                  <label className="text-primary-text text-[12px]">
                    Full name
                  </label>
                  <input
                    className="w-full border border-primary-border py-1 px-2 rounded focus:outline-tertiary-text text-primary-text"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label className="text-primary-text text-[12px]">
                    Email address
                  </label>
                  <input
                    className="w-full border border-primary-border py-1 px-2 rounded focus:outline-tertiary-text text-primary-text"
                    type="text"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-primary-text text-xs"
                  >
                    Subject
                  </label>
                  <select
                    name="subject"
                    id="subject"
                    defaultValue=""
                    className="w-full bg-dark text-white border border-gray-700 rounded-lg px-3 py-3 outline-none focus:border-[#F2B24C] focus:ring-1 focus:ring-[#F2B24C] transition-colors cursor-pointer"
                  >
                    <option
                      value=""
                      disabled
                      className="bg-secondary-bg` text-gray-400"
                    >
                      Select a topic
                    </option>
                    <option
                      value="order"
                      className="bg-secondary-bg` text-white"
                    >
                      Order Issue
                    </option>
                    <option
                      value="shipping"
                      className="bg-secondary-bg` text-white"
                    >
                      Shipping & Delivery
                    </option>
                    <option
                      value="return"
                      className="bg-secondary-bg` text-white"
                    >
                      Returns & Refunds
                    </option>
                    <option
                      value="payment"
                      className="bg-secondary-bg` text-white"
                    >
                      Payment Issue
                    </option>
                    <option
                      value="other"
                      className="bg-secondary-bg` text-white"
                    >
                      Other Inquiry
                    </option>
                  </select>
                </div>
                <div className="w-full flex flex-col">
                  <label className="text-primary-text text-[12px]">
                    Message
                  </label>
                  <textarea
                    className=" border border-primary-border w-full h-30 p-1"
                    name=""
                    id=""
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button className="w-full text-dark bg-btn py-2 rounded">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full sm:col-span-1 flex flex-col gap-5 md:mt-20 md:pr-5 md:px-5">
          <div className="w-full  flex flex-col gap-1">
            {/* <h1 className="text-[clamp(1.5rem,2vw,2rem)] text-primary-text">
              Get in touch
            </h1> */}
            <span className="text-[12px] text-secondary-text">
              Have a question or need assistance? We'd love to hear from you.
            </span>
          </div>
          <div className="w-full mt-2 flex flex-col gap-3">
            <div>
              <i></i>
              <div className="w-full flex flex-col">
                <span className="text-[12px] text-tertiary-text font-bold">
                  WE'RE HERE FOR YOU
                </span>
                <span className="text-[12px] text-secondary-text ">
                  Need help with your UrbanWear order?
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              {supportLinks.map((lnk) => (
                <div
                  key={lnk.id}
                  className="w-full flex items-center justify-center"
                >
                  <div className="w-full flex gap-2 items-center">
                    <i className={`${lnk.titleIcon} text-tertiary-text`}></i>
                    <div className="w-full flex flex-col">
                      <h3 className="text-primary-text">{lnk.title}</h3>
                      <p className="text-[12px] text-secondary-text">
                        {lnk.subtitle}
                      </p>
                    </div>
                  </div>
                  <i
                    className={`${lnk.arrowIcon} text-tertiary-text cursor-pointer `}
                  ></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
