import { AddressContext } from "./AddressContext.js";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

import {
  addAddress as addAddressService,
  removeAddress as removeAddressService,
  updateAddress as updateAddressService,
  getAddressById,
  getAddresses,
  setDefaultAddress as setDefaultAddressService,
} from "../services/addressService";

export const AddressProvider = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [address, setAddress] = useState([]);

  // Load addresses
  useEffect(() => {
    if (authLoading) return;

    let isMounted = true;

    const initializeAddress = async () => {
      if (!isAuthenticated) {
        setAddress([]);
        return;
      }

      try {
        const data = await getAddresses();

        if (!isMounted) return;

        setAddress(data.addresses);
      } catch (error) {
        if (isMounted) {
          console.error("Error loading addresses:", error);
          setAddress([]);
        }
      }
    };

    initializeAddress();

    return () => {
      isMounted = false;
    };
  }, [authLoading, isAuthenticated]);

  // Check authentication
  const checkAuth = () => {
    if (!isAuthenticated) {
      throw new Error("Please login first.");
    }
  };

  // Add address
  const handleAddAddress = async (addressData) => {
    checkAuth();

    try {
      await addAddressService(addressData);

      const response = await getAddresses();
      setAddress(response.addresses);
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  };

  // Remove address
  const handleRemoveAddress = async (addressId) => {
    checkAuth();

    try {
      await removeAddressService(addressId);

      const response = await getAddresses();
      setAddress(response.addresses);
    } catch (error) {
      console.error("Error removing address:", error);
      throw error;
    }
  };

  // Update address
  const handleUpdateAddress = async (addressId, addressData) => {
    checkAuth();

    try {
      await updateAddressService(addressId, addressData);

      const response = await getAddresses();
      setAddress(response.addresses);
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  };

  // Set default address
  const handleSetDefaultAddress = async (addressId) => {
    checkAuth();

    try {
      await setDefaultAddressService(addressId);

      const response = await getAddresses();
      setAddress(response.addresses);
    } catch (error) {
      console.error("Error setting default address:", error);
      throw error;
    }
  };

  return (
    <AddressContext.Provider
      value={{
        address,
        getAddressById,
        addAddress: handleAddAddress,
        removeAddress: handleRemoveAddress,
        updateAddress: handleUpdateAddress,
        setDefaultAddress: handleSetDefaultAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
