import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoreLayout from "./layout/StoreLayout";
import Wishlist from "./components/UserDashboardComponents/Wishlist";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import RecentOrders from "./components/UserDashboardComponents/RecentOrders";
import UserDetails from "./components/UserDashboardComponents/UserDetails";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import UserAddress from "./components/UserDashboardComponents/UserAddress";
import PaymentMethods from "./components/UserDashboardComponents/PaymentMethods";
import About from "./pages/About";
import Preferences from "./components/UserDashboardComponents/Preferences";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Product/>} />
          <Route path="/checkout" element={<Checkout/>} />
        
          <Route path="/account" element={<Account />}>
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="orders" element={<RecentOrders />} />
            <Route path="profile" element={<UserDetails />} />
            <Route path="address" element={<UserAddress />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="preferences" element={<Preferences />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
