import useAddress from "../../context/useAddress.js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const initialFormData = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  addressType: "Home",
  isDefault: false,
};

function AddressForm() {
  const { addAddress, updateAddress, getAddressById } = useAddress();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchAddress = async () => {
      try {
        setLoading(true);

        const response = await getAddressById(id);

        if (!response.address) {
          throw new Error("Address not found");
        }

        const addressData = response.address;

        setFormData({
          fullName: addressData.fullName,
          phone: addressData.phone,
          addressLine1: addressData.addressLine1,
          addressLine2: addressData.addressLine2 || "",
          city: addressData.city,
          state: addressData.state,
          postalCode: addressData.postalCode,
          country: addressData.country || "India",
          addressType: addressData.addressType || "Home",
          isDefault: addressData.isDefault ?? false,
        });
      } catch {
        toast.error("Failed to load address.");
        navigate("/account/address");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [id, getAddressById, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEditMode) {
        await updateAddress(id, formData);
        toast.success("Address updated successfully!");
      } else {
        await addAddress(formData);
        toast.success("Address added successfully!");
      }

      navigate("/account/address");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto px-5">
      <h1 className="text-[clamp(1rem,3vw,2.25rem)] text-primary-text font-extrabold font-syne">
        {isEditMode ? "Edit Address" : "Address Details"}
      </h1>

      <form className="w-full flex" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-2">
          {/* Contact Info */}
          <h2 className="text-primary-text text-xl font-bold">Contact Info</h2>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="fullName" className="text-secondary-text">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Aman Diwakar"
                required
                className="w-full py-2 rounded focus:outline bg-dark outline-btn text-primary-text px-2 border border-primary-border"
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="phone" className="text-secondary-text">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit phone number"
                required
                className="w-full py-2 rounded focus:outline bg-dark outline-btn text-primary-text px-2 border border-primary-border"
              />
            </div>
          </div>

          {/* Delivery Address */}
          <h2 className="text-primary-text text-xl font-bold">
            Delivery address
          </h2>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="w-full flex flex-col">
              <label htmlFor="addressLine1" className="text-secondary-text">
                Address Line 1
              </label>
              <input
                id="addressLine1"
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
                placeholder="House no., building, street"
                className="w-full py-2 rounded focus:outline bg-dark outline-btn text-primary-text px-2 border border-primary-border"
              />
            </div>

            <div className="w-full flex flex-col">
              <label htmlFor="addressLine2" className="text-secondary-text">
                Address Line 2
              </label>
              <input
                id="addressLine2"
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Area, locality, landmark (optional)"
                className="w-full py-2 rounded focus:outline bg-dark outline-btn text-primary-text px-2 border border-primary-border"
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="w-full flex flex-col">
              <label htmlFor="postalCode" className="text-secondary-text">
                Postal code
              </label>
              <input
                id="postalCode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                placeholder="6-digit PIN code"
                className="w-full py-2 rounded focus:outline bg-dark outline-btn text-primary-text px-2 border border-primary-border"
              />
            </div>

            <div className="w-full flex flex-col">
              <label htmlFor="country" className="text-secondary-text">
                Country
              </label>
              <input
                id="country"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                placeholder="India"
                className="w-full py-2 rounded focus:outline bg-dark outline-btn text-primary-text px-2 border border-primary-border"
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="city" className="text-secondary-text">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
                className="w-full py-2 rounded focus:outline bg-dark outline-btn text-primary-text px-2 border border-primary-border"
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="state" className="text-secondary-text">
                State
              </label>
              <input
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="State"
                className="w-full py-2 rounded focus:outline bg-dark outline-btn text-primary-text px-2 border border-primary-border"
              />
            </div>
          </div>

          {/* Address Preferences */}
          <h2 className="text-primary-text text-xl font-bold">
            Address preferences
          </h2>

          <div className="w-full flex gap-2">
            {["Home", "Work", "Other"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    addressType: type,
                  }))
                }
                className={`cursor-pointer px-3 py-1 border rounded border-primary-border ${
                  formData.addressType === type
                    ? "bg-btn text-dark"
                    : "text-primary-text"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="w-full flex gap-2 items-center">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isDefault: e.target.checked,
                }))
              }
            />
            <label htmlFor="isDefault" className="text-secondary-text">
              Set as default address
            </label>
          </div>

          {/* Submit */}
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full text-dark cursor-pointer bg-btn py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please wait..."
                : isEditMode
                  ? "Update Address"
                  : "Save Address"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
