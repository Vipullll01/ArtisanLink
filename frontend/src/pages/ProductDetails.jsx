import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`https://artisanlink-jvq9.onrender.com/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ ...styles.pageContainer, textAlign: 'center', paddingTop: '5rem' }}>
        <h2>Loading Item Details...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ ...styles.pageContainer, textAlign: 'center', paddingTop: '5rem' }}>
        <h2 style={{ color: '#DC2626' }}>{error || 'Product Not Found'}</h2>
        <button onClick={() => navigate('/shop')} style={styles.backBtn}>
          ← Back to Shop
        </button>
      </div>
    );
  }

  const productId = product._id || product.id;
  const artisanName = typeof product.artisan === 'object' ? product.artisan?.name : product.artisan;
  const artisanLocation = typeof product.artisan === 'object' ? product.artisan?.location : product.location;
  const artisanBio = typeof product.artisan === 'object' ? product.artisan?.bio : null;

  const isWishlisted = wishlistItems.some((item) => (item._id || item.id) === productId);

  const handleAddToCart = () => {
  dispatch(addToCart({ ...product, quantity }));
  alert(`Added ${quantity} item(s) to your cart!`);
};

  return (
    <div style={styles.pageContainer}>
      {/* Navigation Breadcrumb */}
      <div style={styles.breadcrumb}>
        <Link to="/shop" style={styles.breadcrumbLink}>Shop</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span style={styles.breadcrumbActive}>{product.title}</span>
      </div>

      <div style={styles.contentGrid}>
        {/* Left Column: Image Gallery */}
        <div style={styles.imageColumn}>
          <div style={styles.imageWrapper}>
            <img src={product.image} alt={product.title} style={styles.mainImage} />
            <span style={styles.badge}>{product.category}</span>
          </div>
        </div>

        {/* Right Column: Product Details & Actions */}
        <div style={styles.detailsColumn}>
          <span style={styles.tag}>Authentic Handcraft</span>
          <h1 style={styles.title}>{product.title}</h1>

          <div style={styles.artisanMeta}>
            <span>Crafted by <strong>{artisanName || 'Master Artisan'}</strong></span>
            {artisanLocation && <span> • {artisanLocation}</span>}
          </div>

          <div style={styles.priceRow}>
            <span style={styles.price}>₹{product.price?.toLocaleString('en-IN')}</span>
            <span style={styles.taxInfo}>Inclusive of all taxes</span>
          </div>

          <p style={styles.description}>
            {product.description || 'Handcrafted using traditional methods passed down through generations in Jaipur.'}
          </p>

          {/* Action Row */}
          <div style={styles.actionRow}>
            <div style={styles.quantitySelector}>
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                style={styles.qtyBtn}
              >
                -
              </button>
              <span style={styles.qtyText}>{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                style={styles.qtyBtn}
              >
                +
              </button>
            </div>

            <button onClick={handleAddToCart} style={styles.addCartBtn}>
              Add {quantity} to Cart
            </button>

            <button
              onClick={() => dispatch(toggleWishlist(product))}
              style={{
                ...styles.wishlistBtn,
                borderColor: isWishlisted ? '#DC2626' : '#E5E0DA',
                color: isWishlisted ? '#DC2626' : '#1A1A1A',
              }}
              aria-label="Wishlist"
            >
              {isWishlisted ? '♥ Saved' : '♡ Wishlist'}
            </button>
          </div>

          {/* Artisan Profile Snapshot */}
          <div style={styles.artisanCard}>
            <h3 style={styles.artisanCardTitle}>About the Craft Workshop</h3>
            <p style={styles.artisanCardText}>
              {artisanBio || `${artisanName || 'The artisan'} utilizes centuries-old techniques native to Jaipur to craft this piece.`}
            </p>
            <Link to="/artisans" style={styles.artisanLink}>
              View All Workshops & Artisans →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem 2rem 5rem 2rem' },
  breadcrumb: { display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#6B7280', marginBottom: '2rem' },
  breadcrumbLink: { color: '#6B7280', textDecoration: 'none' },
  breadcrumbActive: { color: '#1A1A1A', fontWeight: '600' },
  contentGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'start' },
  imageColumn: { width: '100%' },
  imageWrapper: { position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#FAF8F5', border: '1px solid #E5E0DA' },
  mainImage: { width: '100%', maxHeight: '500px', objectFit: 'cover', display: 'block' },
  badge: { position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#C85A32', padding: '0.3rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' },
  detailsColumn: { display: 'flex', flexDirection: 'column' },
  tag: { fontSize: '0.85rem', fontWeight: '700', color: '#C85A32', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.25rem' },
  title: { fontSize: '2.2rem', fontWeight: '700', color: '#1A1A1A', marginBottom: '0.5rem', lineHeight: '1.2' },
  artisanMeta: { fontSize: '0.95rem', color: '#4B5563', marginBottom: '1.5rem' },
  priceRow: { display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' },
  price: { fontSize: '2rem', fontWeight: '700', color: '#1A1A1A' },
  taxInfo: { fontSize: '0.85rem', color: '#6B7280' },
  description: { fontSize: '1rem', color: '#4B5563', lineHeight: '1.6', marginBottom: '2rem' },
  actionRow: { display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem', alignItems: 'center' },
  quantitySelector: { display: 'flex', alignItems: 'center', border: '1px solid #E5E0DA', borderRadius: '6px', overflow: 'hidden' },
  qtyBtn: { width: '38px', height: '42px', border: 'none', backgroundColor: '#FFFFFF', cursor: 'pointer', fontSize: '1.1rem', fontWeight: '600' },
  qtyText: { width: '40px', textAlign: 'center', fontSize: '1rem', fontWeight: '600' },
  addCartBtn: { flex: 1, minWidth: '160px', height: '44px', backgroundColor: '#C85A32', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer' },
  wishlistBtn: { height: '44px', padding: '0 1.25rem', backgroundColor: '#FFFFFF', border: '1px solid #E5E0DA', borderRadius: '6px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' },
  artisanCard: { backgroundColor: '#FAF8F5', borderRadius: '8px', padding: '1.5rem', border: '1px solid #E5E0DA' },
  artisanCardTitle: { fontSize: '1.1rem', fontWeight: '600', color: '#1A1A1A', marginBottom: '0.5rem' },
  artisanCardText: { fontSize: '0.9rem', color: '#4B5563', lineHeight: '1.5', marginBottom: '1rem' },
  artisanLink: { color: '#C85A32', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' },
  backBtn: { marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: '#1A1A1A', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer' }
};

export default ProductDetails;