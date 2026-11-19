
import { useContext } from "react";
import { OrdersContext } from "./OrdersContext";

const useOrders = () => {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders must be used within OrdersProvider");
  }

  return context;
};

export default useOrders;
