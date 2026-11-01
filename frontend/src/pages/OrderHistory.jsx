import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const OrderHistory = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth?.userInfo);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInfo?.token) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch order history');
        }

        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo, navigate]);

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <h2>Loading your order history...</h2>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <span style={styles.tag}>Account</span>
        <h1 style={styles.title}>Your Order History ({orders.length})</h1>
      </div>

      {error && <p style={styles.errorMessage}>{error}</p>}

      {orders.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📦</div>
          <h2>No orders placed yet</h2>
          <p style={styles.emptySubtitle}>
            When you purchase handcrafted items, your orders will appear here.
          </p>
          <Link to="/shop" style={styles.shopBtn}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={styles.ordersList}>
          {orders.map((order) => {
            const orderId = order._id || order.id;
            const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });

            return (
              <div key={orderId} style={styles.orderCard}>
                <div style={styles.cardHeader}>
                  <div>
                    <span style={styles.orderLabel}>ORDER #</span>
                    <strong style={styles.orderId}>{orderId}</strong>
                  </div>
                  <div>
                    <span style={styles.orderLabel}>DATE PLACED</span>
                    <p style={styles.orderValue}>{orderDate}</p>
                  </div>
                  <div>
                    <span style={styles.orderLabel}>TOTAL</span>
                    <p style={styles.orderPrice}>
                      ₹{(order.totalPrice || 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <span style={styles.statusBadge}>
                      {order.isPaid ? 'Paid' : 'Cash on Delivery'}
                    </span>
                  </div>
                </div>

                <div style={styles.cardBody}>
                  {order.orderItems?.map((item, index) => (
                    <div key={index} style={styles.itemRow}>
                      <img
                        src={item.image || 'https://via.placeholder.com/60'}
                        alt={item.title}
                        style={styles.itemThumb}
                      />
                      <div style={styles.itemDetails}>
                        <h4 style={styles.itemTitle}>{item.title}</h4>
                        <p style={styles.itemMeta}>
                          Qty: {item.quantity} × ₹{(item.price || 0).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.cardFooter}>
                  <p style={styles.shippingText}>
                    <strong>Shipping Address:</strong> {order.shippingAddress?.address},{' '}
                    {order.shippingAddress?.city} - {order.shippingAddress?.postalCode}
                  </p>
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
  pageContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
    minHeight: '80vh',
  },
  centerContainer: {
    textAlign: 'center',
    paddingTop: '5rem',
  },
  header: {
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #E5E0DA',
  },
  tag: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#C85A32',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: '0.25rem',
  },
  errorMessage: {
    color: '#D9534F',
    backgroundColor: '#FADBD8',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '1.5rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E5E0DA',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  emptySubtitle: {
    color: '#6B7280',
    marginBottom: '1.5rem',
  },
  shopBtn: {
    display: 'inline-block',
    backgroundColor: '#C85A32',
    color: '#FFFFFF',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontWeight: '600',
    textDecoration: 'none',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E5E0DA',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#FAF8F5',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #E5E0DA',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  orderLabel: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#6B7280',
    display: 'block',
  },
  orderId: {
    fontSize: '0.85rem',
    color: '#1A1A1A',
  },
  orderValue: {
    fontSize: '0.85rem',
    color: '#1A1A1A',
    margin: 0,
  },
  orderPrice: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#1A1A1A',
    margin: 0,
  },
  statusBadge: {
    backgroundColor: '#E6F4EA',
    color: '#137333',
    padding: '0.3rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  cardBody: {
    padding: '1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  itemThumb: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '6px',
    border: '1px solid #E5E0DA',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },
  itemMeta: {
    fontSize: '0.85rem',
    color: '#6B7280',
    margin: '0.2rem 0 0 0',
  },
  cardFooter: {
    backgroundColor: '#FAF8F5',
    padding: '0.75rem 1.5rem',
    borderTop: '1px solid #E5E0DA',
  },
  shippingText: {
    fontSize: '0.8rem',
    color: '#6B7280',
    margin: 0,
  },
};

export default OrderHistory;