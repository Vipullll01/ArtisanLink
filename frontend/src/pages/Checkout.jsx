import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selectors
  const items = useSelector((state) => state.cart?.items || []);
  const userInfo = useSelector((state) => state.auth?.userInfo);

  // Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: userInfo?.name || '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync fullName if userInfo updates asynchronously
  useEffect(() => {
    if (userInfo?.name && !shippingAddress.fullName) {
      setShippingAddress((prev) => ({ ...prev, fullName: userInfo.name }));
    }
  }, [userInfo]);

  // Subtotal calculation safeguard
  const subtotal = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!userInfo?.token) {
      setError('Please sign in to complete your purchase.');
      return;
    }

    setLoading(true);
    setError(null);

    const orderPayload = {
      orderItems: items.map((item) => ({
        title: item.title,
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
        image: item.image,
        product: item._id || item.id,
      })),
      shippingAddress,
      paymentMethod: 'Cash on Delivery',
      totalPrice: subtotal,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to process order');
      }

      dispatch(clearCart());
      navigate('/orders'); // Redirect to Orders History page after successful purchase
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.card}>
          <h2 style={styles.title}>Your Cart is Empty</h2>
          <p style={styles.subtitle}>Add items to your cart before proceeding to checkout.</p>
          <button onClick={() => navigate('/shop')} style={styles.submitBtn}>
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.title}>Shipping & Payment</h2>

        {error && <p style={styles.errorMessage}>{error}</p>}

        <form onSubmit={handlePlaceOrder} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={shippingAddress.fullName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              value={shippingAddress.address}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.gridRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>City</label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={shippingAddress.phone}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.summaryBox}>
            <div style={styles.summaryRow}>
              <span>Order Subtotal:</span>
              <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>
            <div style={styles.summaryRow}>
              <span>Payment Mode:</span>
              <span>Cash on Delivery</span>
            </div>
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Processing Order...' : `Place Order • ₹${subtotal.toLocaleString('en-IN')}`}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    width: '100%',
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 1.5rem',
    backgroundColor: '#FAF8F5',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '2.5rem 2rem',
    borderRadius: '12px',
    border: '1px solid #E5E0DA',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    width: '100%',
    maxWidth: '520px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '1.25rem',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  errorMessage: {
    color: '#D9534F',
    backgroundColor: '#FADBD8',
    padding: '0.66rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1A1A1A',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    border: '1px solid #E5E0DA',
    fontSize: '0.95rem',
    backgroundColor: '#FAF8F5',
    color: '#1A1A1A',
    outline: 'none',
  },
  summaryBox: {
    padding: '1rem',
    backgroundColor: '#FAF8F5',
    borderRadius: '8px',
    border: '1px solid #E5E0DA',
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#1A1A1A',
  },
  submitBtn: {
    backgroundColor: '#C85A32',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.9rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '0.5rem',
    cursor: 'pointer',
  },
};

export default Checkout;