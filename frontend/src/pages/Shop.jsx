import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import { Link } from 'react-router-dom';

const categories = ['All', 'Block Printing', 'Blue Pottery', 'Brassware', 'Leathercraft', 'Lac & Jewelry', 'Miniature Art'];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`https://artisanlink-jvq9.onrender.com/api/products/${id}`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products from API:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Comprehensive Search, Filter & Sort Processing
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      // Extract details handling both populated objects and flat strings
      const artisanName = typeof product.artisan === 'object' ? product.artisan?.name : product.artisan;
      const artisanLocation = typeof product.artisan === 'object' ? product.artisan?.location : product.location;
      const term = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !term ||
        product.title?.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        (artisanName && artisanName.toLowerCase().includes(term)) ||
        (artisanLocation && artisanLocation.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'low-to-high') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'high-to-low') return (b.price || 0) - (a.price || 0);
      return 0;
    });

  if (loading) {
    return (
      <div style={{ ...styles.pageContainer, textAlign: 'center', paddingTop: '5rem' }}>
        <h2>Loading Jaipur Heritage Catalog...</h2>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <span style={styles.tag}>Authentic Catalog</span>
        <h1 style={styles.title}>Shop Jaipur Heritage ({filteredProducts.length} Items)</h1>
        <p style={styles.subtitle}>Directly connecting you with independent Jaipur workshops.</p>
      </div>

      <div style={styles.controlsRow}>
        <div style={styles.categoryFilters}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...styles.filterBtn,
                backgroundColor: selectedCategory === cat ? '#C85A32' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : '#4B5563',
                borderColor: selectedCategory === cat ? '#C85A32' : '#E5E0DA',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={styles.searchSortContainer}>
          <input
            type="text"
            placeholder="Search products, artisans, or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="default">Sort by: Featured</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>No matching products found</h3>
          <p>Try refining your search terms or selecting a different category filter.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map((product) => {
            const productId = product._id || product.id;
            const artisanName = typeof product.artisan === 'object' ? product.artisan?.name : product.artisan;
            const artisanLocation = typeof product.artisan === 'object' ? product.artisan?.location : product.location;

            const isWishlisted = wishlistItems.some((item) => (item._id || item.id) === productId);

            return (
              <div key={productId} style={styles.card}>
                <div style={styles.imageContainer}>
                  <Link to={`/product/${productId}`} style={{ display: 'block', height: '100%' }}>
                    <img src={product.image} alt={product.title} style={styles.image} />
                  </Link>
                  <span style={styles.badge}>{product.category}</span>
                  <button
                    onClick={() => dispatch(toggleWishlist(product))}
                    style={{
                      ...styles.wishlistIconBtn,
                      color: isWishlisted ? '#DC2626' : '#6B7280',
                    }}
                    aria-label="Toggle Wishlist"
                  >
                    {isWishlisted ? '♥' : '♡'}
                  </button>
                </div>

                <div style={styles.cardBody}>
                  <Link to={`/product/${productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={styles.productTitle}>{product.title}</h3>
                  </Link>
                  <p style={styles.artisanText}>
                    Crafted by <strong>{artisanName || 'Jaipur Artisan'}</strong> {artisanLocation ? `• ${artisanLocation}` : ''}
                  </p>

                  <div style={styles.cardFooter}>
                    <span style={styles.price}>₹{product.price?.toLocaleString('en-IN')}</span>
                    <button onClick={() => dispatch(addToCart(product))} style={styles.addBtn}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  pageContainer: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 5rem 2rem' },
  header: { textAlign: 'center', marginBottom: '3rem' },
  tag: { fontSize: '0.85rem', fontWeight: '700', color: '#C85A32', textTransform: 'uppercase', letterSpacing: '1.5px' },
  title: { fontSize: '2.5rem', fontWeight: '700', color: '#1A1A1A', marginTop: '0.25rem', marginBottom: '0.5rem' },
  subtitle: { color: '#6B7280', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' },
  controlsRow: { display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' },
  categoryFilters: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
  filterBtn: { border: '1px solid', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' },
  searchSortContainer: { display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%' },
  searchInput: { flex: 1, minWidth: '260px', padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid #E5E0DA', fontSize: '0.95rem', outline: 'none' },
  sortSelect: { padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E5E0DA', fontSize: '0.95rem', backgroundColor: '#FFFFFF', cursor: 'pointer', outline: 'none' },
  emptyState: { textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#FAF8F5', borderRadius: '12px', color: '#6B7280' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '2rem' },
  card: { backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E0DA', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  imageContainer: { position: 'relative', height: '220px', backgroundColor: '#FAF8F5' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  badge: { position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#C85A32', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' },
  wishlistIconBtn: { position: 'absolute', top: '10px', right: '10px', backgroundColor: '#FFFFFF', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  cardBody: { padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 },
  productTitle: { fontSize: '1.1rem', fontWeight: '600', color: '#1A1A1A', marginBottom: '0.4rem', lineHeight: '1.3' },
  artisanText: { fontSize: '0.85rem', color: '#6B7280', marginBottom: '1.25rem' },
  cardFooter: { marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: '1.2rem', fontWeight: '700', color: '#1A1A1A' },
  addBtn: { backgroundColor: '#C85A32', color: '#FFFFFF', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer' }
};

export default Shop;