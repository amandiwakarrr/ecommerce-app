import { useState } from "react";
import { submitContactMessage } from "../services/contactService";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const supportLinks = [
    {
      id: 1,
      title: "Return & exchanges",
      subtitle: "Questions about returning an item?",
      titleIcon: "pi pi-sync",
      arrowIcon: "pi pi-arrow-up-right",
      path: "#contact-form",
    },
    {
      id: 2,
      title: "Talk to our team",
      subtitle: "We're happy to help you out.",
      titleIcon: "pi pi-comments",
      arrowIcon: "pi pi-arrow-up-right",
      path: "#contact-form",
    },
    {
      id: 3,
      title: "support@urbanwear.com",
      subtitle: "For orders and general queries",
      titleIcon: "pi pi-envelope",
      arrowIcon: "pi pi-arrow-up-right",
      path: "mailto:support@urbanwear.com",
    },
    {
      id: 4,
      title: "+91 8630750297",
      subtitle: "Mon–Sat, 10 AM–6 PM",
      titleIcon: "pi pi-phone",
      arrowIcon: "pi pi-arrow-up-right",
      path: "tel:+918630750297",
    },
    {
      id: 5,
      title: "Monday to Sunday",
      subtitle: "24 / 7",
      titleIcon: "pi pi-clock",
      arrowIcon: "",
      path: null,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject ||
      !formData.message.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.message.trim().length < 10) {
      setError("Message must contain at least 10 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await submitContactMessage({
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
      });

      if (response.success) {
        setSuccess(response.message || "Your message has been sent successfully.");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto grid gap-5 px-5 py-2 sm:py-5 sm:px-8 md:px-13 lg:px-16">
      <span className="text-[12px] text-tertiary-text font-bold">
        WE'RE HERE TO HELP
      </span>

      <div className="w-full grid grid-cols-1 md:grid-cols-3">
        <div className="w-full sm:col-span-2">
          <div className="w-full flex flex-col gap-2 p-2 rounded">
            <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
              Send us a message
            </h1>

            <div className="w-full">
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
              >
                <div className="w-full flex flex-col gap-1">
                  <label className="text-primary-text text-[12px]">
                    Full name
                  </label>

                  <input
                    className="w-full border border-primary-border py-1 px-2 rounded focus:outline-tertiary-text text-primary-text"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    minLength={2}
                    maxLength={50}
                    required
                  />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <label className="text-primary-text text-[12px]">
                    Email address
                  </label>

                  <input
                    className="w-full border border-primary-border py-1 px-2 rounded focus:outline-tertiary-text text-primary-text"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
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
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-dark text-white border border-gray-700 rounded-lg px-3 py-3 outline-none focus:border-[#F2B24C] focus:ring-1 focus:ring-[#F2B24C] transition-colors cursor-pointer"
                    required
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    <option value="order">Order Issue</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="payment">Payment Issue</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div className="w-full flex flex-col">
                  <label className="text-primary-text text-[12px]">
                    Message
                  </label>

                  <textarea
                    className="border text-primary-text border-primary-border w-full min-h-30 p-2"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    minLength={10}
                    maxLength={2000}
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm" role="alert">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="text-green-500 text-sm" role="status">
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-dark bg-btn py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="w-full sm:col-span-1 flex flex-col gap-5 md:mt-20 md:pr-5 md:px-5">
          <div className="w-full flex flex-col gap-1">
            <span className="text-[12px] text-secondary-text">
              Have a question or need assistance? We'd love to hear from you.
            </span>
          </div>

          <div className="w-full mt-2 flex flex-col gap-3">
            <div className="w-full flex flex-col">
              <span className="text-[12px] text-tertiary-text font-bold">
                WE'RE HERE FOR YOU
              </span>

              <span className="text-[12px] text-secondary-text">
                Need help with your UrbanWear order?
              </span>
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
                      {lnk.path ? (
                        <a
                          href={lnk.path}
                          className="text-primary-text hover:text-tertiary-text"
                        >
                          {lnk.title}
                        </a>
                      ) : (
                        <h3 className="text-primary-text">{lnk.title}</h3>
                      )}

                      <p className="text-[12px] text-secondary-text">
                        {lnk.subtitle}
                      </p>
                    </div>
                  </div>

                  {lnk.arrowIcon && (
                    <i
                      className={`${lnk.arrowIcon} text-tertiary-text`}
                    ></i>
                  )}
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
