
import { useState, useEffect, useCallback } from "react";
import { OrdersContext } from "./OrdersContext";
import { getAllOrders } from "../services/orderService.js";

function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshOrders = useCallback(async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.orders || []);
    } catch (error) {
      console.error("Get orders error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getAllOrders()
      .then((response) => {
        if (isMounted) {
          setOrders(response.orders || []);
        }
      })
      .catch((error) => {
        console.error("Get orders error:", error);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <OrdersContext.Provider
      value={{ orders, loading, refreshOrders }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export default OrdersProvider;
