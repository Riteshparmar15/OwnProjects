import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartProvider } from "./cart";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { FloatButtons } from "./components/FloatButtons";
import { SearchModal } from "./components/SearchModal";
import { YarnLoader } from "./components/Yarn";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { CollectionPage } from "./pages/Collection";
import { ProductPage } from "./pages/Product";
import { About } from "./pages/About";
import { Custom } from "./pages/Custom";
import { CartPage } from "./pages/Cart";
import { Contact } from "./pages/Contact";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function Shell() {
  const [search, setSearch] = useState(false);
  const [boot, setBoot] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setBoot(false), 1200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {boot && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-cream">
          <YarnLoader />
        </div>
      )}
      <Navbar onSearch={() => setSearch(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections/:id" element={<CollectionPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <FloatButtons />
      <SearchModal open={search} onClose={() => setSearch(false)} />
      <ScrollTop />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </CartProvider>
  );
}
