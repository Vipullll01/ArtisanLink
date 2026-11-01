import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, Heart, ShoppingBag, User, X } from 'lucide-react';



const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const wishlistCount = wishlistItems.length;
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Brand Logo */}
        <Link to="/" style={styles.logoGroup}>
          <span style={styles.logoText}>ArtisanLink</span>
          <span style={styles.tagline}>HANDMADE. AUTHENTIC. CONNECTED.</span>
        </Link>

        {/* Middle Navigation Links */}
        <nav style={styles.navLinks}>
          <Link to="/shop" style={styles.link}>Shop</Link>
          <Link to="/artisans" style={styles.link}>Artisans</Link>
          <Link to="/about" style={styles.link}>Our Story</Link>
        </nav>

        {/* Right Action Icons */}
        <div style={styles.iconGroup}>
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)} 
            style={styles.iconBtn} 
            aria-label="Toggle Search Bar"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          <Link to="/orders" style={styles.navLink}>
             My Orders
          </Link> 

          <Link to="/wishlist" style={styles.iconLink} aria-label="Wishlist">
            <Heart size={20} />
            {wishlistCount > 0 && <span style={styles.badge}>{wishlistCount}</span>}
          </Link>

          <Link to="/cart" style={styles.iconLink} aria-label="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>

          <Link to="/login" style={styles.iconLink} aria-label="User Account">
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* Expandable Search Input Container */}
      {isSearchOpen && (
        <div style={styles.searchDropdown}>
          <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search Jaipur crafts, artisans, products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
              autoFocus
            />
            <button type="submit" style={styles.searchSubmitBtn}>
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#FAF8F5',
    borderBottom: '1px solid #E5E0DA',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1.25rem 2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  logoGroup: {
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
  },
  logoText: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#C85A32',
    lineHeight: '1',
    letterSpacing: '-0.5px',
  },
  tagline: {
    fontSize: '0.6rem',
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: '1.2px',
    marginTop: '4px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
  },
  link: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#1A1A1A',
    textDecoration: 'none',
  },
  iconGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: '#1A1A1A',
    display: 'flex',
    alignItems: 'center',
  },
  iconLink: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    color: '#1A1A1A',
    textDecoration: 'none',
  },
  badge: {
    position: 'absolute',
    top: '-6px',
    right: '-8px',
    backgroundColor: '#C85A32',
    color: '#FFFFFF',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.65rem',
    fontWeight: '700',
  },
  searchDropdown: {
    padding: '0.75rem 2.5rem 1.25rem',
    backgroundColor: '#FAF8F5',
    borderTop: '1px solid #E5E0DA',
  },
  searchForm: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    gap: '0.5rem',
  },
  searchInput: {
    flex: 1,
    padding: '0.65rem 1rem',
    borderRadius: '6px',
    border: '1px solid #E5E0DA',
    fontSize: '0.95rem',
    outline: 'none',
  },
  searchSubmitBtn: {
    backgroundColor: '#C85A32',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.65rem 1.25rem',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Navbar;