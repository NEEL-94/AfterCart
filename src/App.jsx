import { Route, Routes } from "react-router-dom";
import { Footer, Nav } from "./components/Chrome";
import { ShopProvider } from "./shop";
import Home from "./pages/Home";
import { BrandPage, BrandsPage, CategoriesPage, CategoryPage, SearchPage } from "./pages/Browse";
import ProductPage from "./pages/Product";
import AskPage from "./pages/Ask";
import { OrderPage, OrdersPage } from "./pages/Orders";
import { AboutPage, AccountPage } from "./pages/Account";

export default function App() {
  return (
    <ShopProvider>
      <div className="flex min-h-screen flex-col bg-white font-sans text-ink">
        <Nav />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/brands/:name" element={<BrandPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/ask" element={<AskPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </ShopProvider>
  );
}
