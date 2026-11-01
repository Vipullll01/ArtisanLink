import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <span style={styles.tag}>Saved Items</span>
        <h1 style={styles.title}>Your Wishlist ({wishlistItems.length})</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>♡</div>
          <h2>Your wishlist is empty</h2>
          <p style={{ color: '#6B7280', margin: '0.5rem 0 1.5rem' }}>
            Explore our collection and click the heart icon on items you love.
          </p>
          <Link to="/shop" style={styles.shopBtn}>
            Browse Shop Catalog
          </Link>
        </div>
      ) : (
        <div style={styles.grid}>
          {wishlistItems.map((product) => {
            const itemId = product._id || product.id;
            const artisanName =
              typeof product.artisan === 'object'
                ? product.artisan?.name
                : product.artisan;

            return (
              <div key={itemId} style={styles.card}>
                <div style={styles.imageContainer}>
                  <img src={product.image} alt={product.title} style={styles.image} />
                  <button
                    onClick={() => dispatch(toggleWishlist(product))}
                    style={styles.removeWishlistBtn}
                    title="Remove from Wishlist"
                  >
                    ✕
                  </button>
                </div>

                <div style={styles.cardBody}>
                  <h3 style={styles.productTitle}>{product.title}</h3>
                  <p style={styles.artisanText}>
                    Crafted by <strong>{artisanName || 'Jaipur Artisan'}</strong>
                  </p>
                  <div style={styles.cardFooter}>
                    <span style={styles.price}>
                      ₹{(product.price || 0).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      style={styles.addBtn}
                    >
                      Move to Cart
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
  pageContainer: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', minHeight: '80vh' },
  header: { marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '1px solid #E5E0DA' },
  tag: { fontSize: '0.85rem', fontWeight: '700', color: '#C85A32', textTransform: 'uppercase', letterSpacing: '1.5px' },
  title: { fontSize: '2.25rem', fontWeight: '700', color: '#1A1A1A', marginTop: '0.25rem' },
  emptyState: { textAlign: 'center', padding: '5rem 2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E0DA' },
  emptyIcon: { fontSize: '3rem', marginBottom: '1rem', color: '#C85A32' },
  shopBtn: { display: 'inline-block', backgroundColor: '#C85A32', color: '#FFFFFF', padding: '0.85rem 2rem', borderRadius: '6px', fontWeight: '600', textDecoration: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '2rem' },
  card: { backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E0DA', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  imageContainer: { position: 'relative', height: '200px', backgroundColor: '#FAF8F5' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  removeWishlistBtn: { position: 'absolute', top: '10px', right: '10px', backgroundColor: '#FFFFFF', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 'bold' },
  cardBody: { padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 },
  productTitle: { fontSize: '1.05rem', fontWeight: '600', color: '#1A1A1A', marginBottom: '0.4rem' },
  artisanText: { fontSize: '0.85rem', color: '#6B7280', marginBottom: '1.25rem' },
  cardFooter: { marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: '1.15rem', fontWeight: '700', color: '#1A1A1A' },
  addBtn: { backgroundColor: '#C85A32', color: '#FFFFFF', border: 'none', padding: '0.55rem 1rem', borderRadius: '6px', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
};

export default Wishlist;