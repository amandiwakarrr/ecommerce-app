
import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { updateProfile } from "../../services/authService";

function UserDetails() {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState(() => ({
    name: user?.name || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: user?.gender || "Prefer not to say",
  }));

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await updateProfile(formData);

      if (response.success) {
        setUser(response.user);
        setMessage(
          response.message || "Profile updated successfully."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full py-2 rounded focus:outline bg-dark outline-btn text-secondary-text px-2 border border-primary-border";

  return (
    <div className="w-full h-auto px-5 sm:mt-8">
      <div className="w-full flex flex-wrap items-center justify-between gap-2 py-3">
        <h1 className="text-[clamp(1.5rem,2vw,2.25rem)] text-primary-text font-extrabold font-syne">
          Personal information
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        {/* Left section */}
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-col gap-1">
            <label className="text-primary-text">
              Full name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
              required
              className={inputClass}
              placeholder="Enter your full name"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-primary-text">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className={`${inputClass} opacity-60 cursor-not-allowed`}
            />

            <p className="text-xs text-secondary-text">
              Email cannot be changed here.
            </p>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-primary-text">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-col gap-1">
            <label className="text-primary-text">
              Date of birth
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className={inputClass}
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-primary-text">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">
                Prefer not to say
              </option>
            </select>
          </div>
        </div>

        {/* Feedback messages */}
        {message && (
          <p className="sm:col-span-2 text-green-500 text-sm">
            {message}
          </p>
        )}

        {error && (
          <p className="sm:col-span-2 text-red-500 text-sm">
            {error}
          </p>
        )}

        {/* Submit button */}
        <div className="w-full sm:col-span-2 flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full text-dark cursor-pointer bg-btn py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserDetails;
