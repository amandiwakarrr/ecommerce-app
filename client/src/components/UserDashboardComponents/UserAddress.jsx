import l from "../../assets/beige-chinos.webp";
import { useNavigate } from "react-router-dom";
import useAddress from "../../context/useAddress.js";
import toast from "react-hot-toast";
function UserAddress() {
  const navigate = useNavigate();
  const { address, removeAddress, setDefaultAddress } = useAddress();

  const handleRemove = async (addressId) => {
    try {
      await removeAddress(addressId);
      toast.success("Address removed successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to remove address.");
    }
  };

  // set default address
  const handleSetDefault = async (addressId) => {
    try {
      await setDefaultAddress(addressId);
      toast.success("Default Address Updated!");
    } catch (error) {
      toast.error(error.message || "Failed to set Default address.");
    }
  };

  // edit address
  const handleEdit = (addressId) => {
    navigate(`/account/edit-address/${addressId}`);
  };

  return (
    <div className="w-full h-auto px-5 mt-8">
      <div className="w-full flex items-center justify-between pb-5">
        <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] text-primary-text font-bold font-syne">
          Addresses
        </h1>
        <button
          onClick={() => navigate("/account/add-address")}
          className="py-2 px-4 bg-btn rounded cursor-pointer"
        >
          Add Address
        </button>
      </div>
      <div className="w-full flex items-center">
        <div>
          <img className="w-10 h-10 rounded hidden" src={l} alt="" />
        </div>
        <div className="w-full grid  gap-4 place-items-center">
          {/* Card */}
          <div className="w-full gap-4 grid grid-cols-1 lg:grid-cols-2">
            {address.length === 0 ? (
              <div className="w-full text-center py-10">
                <i className="pi pi-map-marker text-3xl text-secondary-text"></i>
                <p className="text-primary-text mt-3">
                  No addresses saved yet.
                </p>
                <p className="text-secondary-text text-sm mt-1">
                  Add an address to continue.
                </p>
              </div>
            ) : (
              address.map((address) => (
                <div
                  key={address._id}
                  className="w-full flex flex-col gap-3 border border-primary-border p-4 rounded-xl bg-secondary-bg"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-dark flex items-center justify-center">
                        <i className="pi pi-home text-tertiary-text"></i>
                      </div>

                      <span className="text-primary-text font-semibold">
                        {address.addressType}
                      </span>
                    </div>

                    {address.isDefault && (
                      <span className="text-[11px] px-2 py-1 rounded-full bg-btn/15 text-tertiary-text font-semibold">
                        Default
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-primary-text font-semibold">
                      {address.fullName}
                    </h3>

                    <p className="text-secondary-text text-sm leading-relaxed">
                      {address.addressLine1}, {address.addressLine2},{" "}
                      {address.city}, {address.state} - {address.postalCode},{" "}
                      {address.country}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2 text-sm">
                    <i className="pi pi-phone text-secondary-text"></i>
                    <span className="text-secondary-text">{address.phone}</span>
                  </div>

                  <div className="border-t border-primary-border pt-3 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(address._id)}
                        className="px-3 py-2 cursor-pointer rounded-lg border border-primary-border text-primary-text text-sm hover:bg-dark"
                      >
                        <i className="pi pi-pencil mr-1"></i>
                        Edit
                      </button>

                      <button
                        onClick={() => handleRemove(address._id)}
                        className="px-3 py-2 cursor-pointer rounded-lg border border-primary-border text-red-500 text-sm hover:bg-dark"
                      >
                        <i className="pi pi-trash mr-1"></i>
                        Remove
                      </button>
                    </div>

                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address._id)}
                        className="text-xs cursor-pointer text-tertiary-text hover:underline"
                      >
                        Set default
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAddress;
