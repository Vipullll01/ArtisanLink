import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Shop from './pages/Shop';
import Artisans from './pages/Artisans';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import ArtisanDashboard from './pages/ArtisanDashboard';
import OrderHistory from './pages/OrderHistory'; // Adjust the relative path if your file is in a different directory

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Navbar />
      <main style={{ flex: 1, width: '100%' }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <div style={{ textAlign: 'center', padding: '6rem 2rem', backgroundColor: '#FAF8F5', width: '100%' }}>
                <h1 style={{ fontSize: '3rem', color: '#1A1A1A', marginBottom: '1rem', fontWeight: 700 }}>
                  Handmade. Authentic. Connected.
                </h1>
                <p style={{ color: '#6B7280', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto 2rem auto' }}>
                  Discover thoughtfully crafted products and the independent artisans behind them.
                </p>
              </div>
            } 
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/artisans" element={<Artisans />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/artisan-dashboard" element={<ArtisanDashboard />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route 
            path="*" 
            element={
              <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <h2>404 - Page Not Found</h2>
              </div>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;