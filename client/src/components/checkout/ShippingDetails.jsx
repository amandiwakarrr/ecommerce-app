import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAddress from "../../context/useAddress";
import PaymentMethods from "./PaymentMethods";

function ShippingDetails({ selectedAddressId,
  onAddressChange,
  selectedPaymentMethod,
  onPaymentMethodChange, }) {
  const { address } = useAddress();
  const navigate = useNavigate();

  // Automatically select the default address,
  // or the first available address.
  useEffect(() => {
    if (address.length === 0) return;

    const selectedExists = address.some(
      (item) => item._id === selectedAddressId
    );

    if (selectedExists) return;

    const defaultAddress = address.find((item) => item.isDefault);

    onAddressChange(defaultAddress?._id || address[0]._id);
  }, [address, selectedAddressId, onAddressChange]);

  return (
    <div className="w-full">
      <div className="w-full border rounded border-primary-border p-3 flex flex-col gap-4 bg-secondary-bg">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-[clamp(1.2rem,2vw,2rem)] text-primary-text font-bold font-syne">
            Shipping details
          </h2>

          <button
            type="button"
            onClick={() => navigate("/account/add-address")}
            className="text-btn text-sm font-semibold"
          >
            + Add Address
          </button>
        </div>

        {address.length === 0 ? (
          <div className="w-full text-center py-6">
            <p className="text-secondary-text mb-3">
              You haven't added any delivery addresses yet.
            </p>

            <button
              type="button"
              onClick={() => navigate("/account/add-address")}
              className="bg-btn text-black px-5 py-2 rounded font-semibold"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            {address.map((item) => (
              <label
                key={item._id}
                className={`w-full border rounded p-3 cursor-pointer transition-colors ${selectedAddressId === item._id
                  ? "border-btn bg-primary-bg"
                  : "border-primary-border"
                  }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shippingAddress"
                    checked={selectedAddressId === item._id}
                    onChange={() => onAddressChange(item._id)}
                    className="mt-1 accent-btn"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-primary-text font-semibold">
                        {item.fullName}
                      </span>

                      <span className="text-xs text-secondary-text border border-primary-border rounded px-2 py-1">
                        {item.addressType}
                      </span>

                      {item.isDefault && (
                        <span className="text-xs text-btn">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="text-secondary-text text-sm mt-2">
                      {item.addressLine1}
                      {item.addressLine2 && `, ${item.addressLine2}`}
                    </p>

                    <p className="text-secondary-text text-sm">
                      {item.city}, {item.state} - {item.postalCode}
                    </p>

                    <p className="text-secondary-text text-sm mt-1">
                      {item.country} · {item.phone}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}

        <PaymentMethods
          selectedPaymentMethod={selectedPaymentMethod}
          onPaymentMethodChange={onPaymentMethodChange}
        />
      </div>
    </div>
  );
}

export default ShippingDetails;
