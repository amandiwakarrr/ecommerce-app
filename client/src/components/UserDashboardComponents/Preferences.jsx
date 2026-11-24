
import { useState } from "react";

function Preferences() {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const sizesOfWaist = [28, 30, 32, 34, 36];

  const defaultNotifications = {
    orderUpdates: true,
    newArrivals: true,
    salesOffers: false,
    backInStock: true,
  };

  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedSizeOfWaist, setSelectedSizeOfWaist] = useState(28);
  const [notifications, setNotifications] = useState(defaultNotifications);

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetPreferences = () => {
    setSelectedSize("S");
    setSelectedSizeOfWaist(28);
    setNotifications(defaultNotifications);
  };

  const savePreferences = () => {
    const preferences = {
      topSize: selectedSize,
      waistSize: selectedSizeOfWaist,
      notifications,
    };

    console.log("Saved preferences:", preferences);
    alert("Preferences saved successfully!");
  };

  const notificationItems = [
    {
      key: "orderUpdates",
      title: "Order updates",
      description: "Confirmation, dispatch and delivery notifications.",
    },
    {
      key: "newArrivals",
      title: "New arrivals",
      description: "Get notified when a new collection goes live.",
    },
    {
      key: "salesOffers",
      title: "Sales and offers",
      description: "Discounts and exclusive member-only deals.",
    },
    {
      key: "backInStock",
      title: "Back in stock",
      description: "Know when your saved products return.",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-syne text-primary-text">
          Your Preferences
        </h1>
        <p className="text-sm text-secondary-text mt-2">
          Personalize your shopping experience with your preferred sizes
          and notifications.
        </p>
      </div>

      <div className="flex flex-col gap-6">

        {/* Sizes and Fit */}
        <section className="border border-primary-border rounded-xl p-5 sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-primary-text">
              Sizes & Fit
            </h2>
            <p className="text-sm text-secondary-text mt-1">
              Save your preferred sizes for a more personalized shopping
              experience.
            </p>
          </div>

          {/* Tops */}
          <div className="mb-7">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-primary-text">
                Tops and jackets
              </h3>
              <span className="text-xs text-secondary-text">
                Selected: {selectedSize}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                  className={`min-w-12 h-11 px-3 rounded-lg border text-sm font-medium transition
                    ${
                      selectedSize === size
                        ? "bg-btn text-white border-btn"
                        : "text-primary-text border-primary-border hover:border-primary-text"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Waist */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-primary-text">
                Trousers (waist in inches)
              </h3>
              <span className="text-xs text-secondary-text">
                Selected: {selectedSizeOfWaist}"
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {sizesOfWaist.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSizeOfWaist(size)}
                  aria-pressed={selectedSizeOfWaist === size}
                  className={`min-w-12 h-11 px-3 rounded-lg border text-sm font-medium transition
                    ${
                      selectedSizeOfWaist === size
                        ? "bg-btn text-white border-btn"
                        : "text-primary-text border-primary-border hover:border-primary-text"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="border border-primary-border rounded-xl p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-primary-text">
              Notifications
            </h2>
            <p className="text-sm text-secondary-text mt-1">
              Choose which updates you want to receive.
            </p>
          </div>

          <div className="divide-y divide-primary-border">
            {notificationItems.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div>
                  <h3 className="text-sm font-medium text-primary-text">
                    {item.title}
                  </h3>
                  <p className="text-xs text-secondary-text mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Toggle */}
                
<button
  type="button"
  role="switch"
  aria-checked={notifications[item.key]}
  aria-label={item.title}
  onClick={() => toggleNotification(item.key)}
  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full
    transition-colors duration-300 ease-in-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-btn focus-visible:ring-offset-2
    ${
      notifications[item.key]
        ? "bg-btn"
        : "bg-secondary-bg border border-primary-border"
    }`}
>
  <span
    className={`pointer-events-none inline-block h-5 w-5 rounded-full
      bg-white shadow-md transition-transform duration-300 ease-in-out
      ${
        notifications[item.key]
          ? "translate-x-5"
          : "translate-x-0.5"
      }`}
  />
</button>

              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center gap-3 mt-7">
        <button
          type="button"
          onClick={savePreferences}
          className="px-6 py-2.5 rounded-lg bg-btn text-white text-sm font-medium hover:opacity-90 transition"
        >
          Save Preferences
        </button>

        <button
          type="button"
          onClick={resetPreferences}
          className="px-6 py-2.5 rounded-lg border border-primary-border text-primary-text text-sm hover:bg-secondary-bg transition"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}

export default Preferences;
