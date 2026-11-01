import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart?.items || []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 250;
  const total = subtotal + shipping;
  const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <span style={styles.tag}>Shopping Bag</span>
        <h1 style={styles.title}>Your Cart ({itemCount})</h1>
      </div>

      {cartItems.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🛍️</div>
          <h2 style={styles.emptyTitle}>Your Shopping Bag is Empty</h2>
          <p style={styles.emptySubtitle}>
            Support local Jaipur artisans by adding handcrafted goods to your cart.
          </p>
          <Link to="/shop" style={styles.shopBtn}>
            Discover Artisan Collections
          </Link>
        </div>
      ) : (
        <div style={styles.cartLayout}>
          <div style={styles.itemsList}>
            {cartItems.map((item) => {
              const itemId = item._id || item.id;
              const artisanName =
                typeof item.artisan === 'object'
                  ? item.artisan?.name
                  : item.artisanName || item.artisan;

              return (
                <div key={itemId} style={styles.itemCard}>
                  <img
                    src={item.image || 'https://via.placeholder.com/80'}
                    alt={item.title}
                    style={styles.itemThumb}
                  />
                  <div style={styles.itemDetails}>
                    <span style={styles.category}>{item.category || 'Handcraft'}</span>
                    <h3 style={styles.itemTitle}>{item.title}</h3>
                    <p style={styles.artisan}>
                      Crafted by <strong>{artisanName || 'Jaipur Artisan'}</strong>
                    </p>
                    <p style={styles.price}>
                      ₹{(item.price || 0).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div style={styles.actionColumn}>
                    <div style={styles.qtyControl}>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ id: itemId, delta: -1 }))
                        }
                        style={styles.qtyBtn}
                      >
                        -
                      </button>
                      <span style={styles.qtyCount}>{item.quantity || 1}</span>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ id: itemId, delta: 1 }))
                        }
                        style={styles.qtyBtn}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(itemId))}
                      style={styles.removeBtn}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.summaryCard}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping (Domestic)</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p style={styles.freeShippingNote}>
                Add ₹{(3000 - subtotal).toLocaleString('en-IN')} more for free shipping!
              </p>
            )}
            <div style={styles.totalRow}>
              <span>Total Amount</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              style={styles.checkoutBtn}
            >
              Proceed to Checkout
            </button>
          </div>
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
  cartLayout: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  itemCard: { backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E0DA', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.25rem' },
  itemThumb: { width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E5E0DA' },
  itemDetails: { display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 },
  category: { fontSize: '0.75rem', fontWeight: '700', color: '#C85A32', textTransform: 'uppercase' },
  itemTitle: { fontSize: '1.05rem', fontWeight: '600', color: '#1A1A1A', margin: 0 },
  artisan: { fontSize: '0.85rem', color: '#6B7280', margin: 0 },
  price: { fontSize: '1.05rem', fontWeight: '700', color: '#1A1A1A', marginTop: '0.25rem', margin: 0 },
  actionColumn: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' },
  qtyControl: { display: 'flex', alignItems: 'center', border: '1px solid #E5E0DA', borderRadius: '6px', overflow: 'hidden' },
  qtyBtn: { border: 'none', backgroundColor: '#FAF8F5', padding: '0.3rem 0.7rem', cursor: 'pointer', fontWeight: '600' },
  qtyCount: { padding: '0 0.7rem', fontWeight: '600', fontSize: '0.9rem' },
  removeBtn: { background: 'none', border: 'none', color: '#DC2626', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' },
  summaryCard: { backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E0DA', padding: '2rem' },
  summaryTitle: { fontSize: '1.35rem', fontWeight: '700', color: '#1A1A1A', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E5E0DA' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#4B5563', marginBottom: '1rem' },
  freeShippingNote: { fontSize: '0.8rem', color: '#C85A32', fontWeight: '600', marginTop: '-0.5rem', marginBottom: '1rem' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '700', color: '#1A1A1A', paddingTop: '1rem', borderTop: '1px solid #E5E0DA', marginBottom: '1.5rem' },
  checkoutBtn: { width: '100%', backgroundColor: '#C85A32', color: '#FFFFFF', border: 'none', padding: '0.9rem', borderRadius: '6px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '5rem 2rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E0DA' },
  emptyIcon: { fontSize: '3rem', marginBottom: '1rem' },
  emptyTitle: { fontSize: '1.75rem', fontWeight: '700', color: '#1A1A1A', marginBottom: '0.5rem' },
  emptySubtitle: { fontSize: '1rem', color: '#6B7280', maxWidth: '450px', margin: '0 auto 2rem auto' },
  shopBtn: { display: 'inline-block', backgroundColor: '#C85A32', color: '#FFFFFF', padding: '0.85rem 2rem', borderRadius: '6px', fontWeight: '600', textDecoration: 'none' },
};

export default Cart;