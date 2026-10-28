import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoreLayout from "./layout/StoreLayout";
import Wishlist from "./components/AccountComponents/Wishlist";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import AccountOverview from "./components/AccountComponents/AccountOverview";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/account" element={<Account />}>
            <Route index element={<AccountOverview />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
