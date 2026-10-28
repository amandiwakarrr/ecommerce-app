import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoreLayout from "./layout/StoreLayout";
import Wishlist from "./components/AccountComponents/Wishlist";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import AccountOverview from "./components/AccountComponents/AccountOverview";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import RecentOrders from "./components/AccountComponents/RecentOrders";
import UserDetails from "./components/AccountComponents/UserDetails";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Product/>} />

          <Route path="/account" element={<Account />}>
            <Route index element={<AccountOverview />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="orders" element={<RecentOrders />} />
            <Route path="profile" element={<UserDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
