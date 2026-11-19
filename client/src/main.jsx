import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

import "./index.css";
import "primeicons/primeicons.css";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { AddressProvider } from "./context/AddressContext.jsx";
import OrdersProvider from "./context/OrdersProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 300,
            style: {
              background: "#0f1114",
              color: "#ffffff",
              border: "1px solid #333333",
            },
          }}
        />
        <CartProvider>
          <WishlistProvider>
            <ProductProvider>
              <AddressProvider>
                <OrdersProvider>
                  <App />
                </OrdersProvider>
              </AddressProvider>
            </ProductProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
