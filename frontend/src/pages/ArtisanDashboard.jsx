import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  'Block Printing',
  'Blue Pottery',
  'Brassware',
  'Leathercraft',
  'Lac & Jewelry',
  'Miniature Art',
];

const ArtisanDashboard = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth?.userInfo);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Block Printing',
    price: '',
    artisanName: userInfo?.name || '',
    location: 'Jaipur',
    image: '',
    description: '',
  });

  const fetchMyProducts = async () => {
    if (!userInfo?.token) return;
    try {
      const res = await fetch('http://localhost:5000/api/products/myproducts', {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    fetchMyProducts();
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (item) => {
    setEditingId(item._id || item.id);
    setFormData({
      title: item.title || '',
      category: item.category || 'Block Printing',
      price: item.price || '',
      artisanName: item.artisanName || userInfo?.name || '',
      location: item.location || 'Jaipur',
      image: item.image || '',
      description: item.description || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Block Printing',
      price: '',
      artisanName: userInfo?.name || '',
      location: 'Jaipur',
      image: '',
      description: '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this craft item?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete product');

      setProducts((prev) => prev.filter((item) => (item._id || item.id) !== id));
      if (editingId === id) handleCancelEdit();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isEditMode = Boolean(editingId);
    const url = isEditMode
      ? `http://localhost:5000/api/products/${editingId}`
      : 'http://localhost:5000/api/products';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          artisanName: formData.artisanName || userInfo?.name || 'Artisan',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Failed to ${isEditMode ? 'update' : 'list'} product`);
      }

      if (isEditMode) {
        setProducts((prev) =>
          prev.map((item) => ((item._id || item.id) === editingId ? data : item))
        );
        alert('Craft listing updated successfully!');
      } else {
        setProducts((prev) => [data, ...prev]);
        alert('Craft listing created successfully!');
      }

      handleCancelEdit();
    } catch (err) {
      setError(err.message || 'An error occurred while saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Artisan Studio Dashboard</h1>
        <p style={styles.subtitle}>
          Welcome back, {userInfo?.name}. Manage and publish your authentic handicrafts.
        </p>
      </div>

      <div style={styles.contentGrid}>
        {/* Craft Creation / Edit Form */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              {editingId ? 'Edit Craft Item' : 'List New Craft Item'}
            </h2>
            {editingId && (
              <button onClick={handleCancelEdit} style={styles.cancelBtn}>
                Cancel Edit
              </button>
            )}
          </div>

          {error && <p style={styles.errorMessage}>{error}</p>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Handprinted Sanganeri Dupatta"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.gridRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={styles.input}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="1200"
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Craft Story / Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the craft techniques used..."
                rows="3"
                style={styles.textarea}
              />
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading
                ? editingId
                  ? 'Updating Craft...'
                  : 'Publishing Craft...'
                : editingId
                ? 'Update Listing'
                : 'Publish Listing'}
            </button>
          </form>
        </div>

        {/* Existing Inventory List */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Your Published Crafts ({products.length})</h2>
          {products.length === 0 ? (
            <p style={styles.emptyText}>You haven't listed any craft items yet.</p>
          ) : (
            <div style={styles.inventoryList}>
              {products.map((item) => {
                const itemId = item._id || item.id;
                return (
                  <div key={itemId} style={styles.itemRow}>
                    <img src={item.image} alt={item.title} style={styles.thumb} />
                    <div style={styles.itemDetails}>
                      <h4 style={styles.itemTitle}>{item.title}</h4>
                      <span style={styles.itemBadge}>{item.category}</span>
                    </div>
                    <div style={styles.actionColumn}>
                      <strong style={styles.itemPrice}>
                        ₹{(item.price || 0).toLocaleString('en-IN')}
                      </strong>
                      <div style={styles.btnGroup}>
                        <button
                          onClick={() => handleEditClick(item)}
                          style={styles.editBtn}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(itemId)}
                          style={styles.deleteBtn}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2.5rem 1.5rem',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '0.95rem',
    marginTop: '0.25rem',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #E5E0DA',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1A1A1A',
    margin: 0,
  },
  cancelBtn: {
    backgroundColor: '#E5E7EB',
    color: '#374151',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  errorMessage: {
    color: '#D9534F',
    backgroundColor: '#FADBD8',
    padding: '0.6rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
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
    fontSize: '0.9rem',
    backgroundColor: '#FAF8F5',
  },
  textarea: {
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    border: '1px solid #E5E0DA',
    fontSize: '0.9rem',
    backgroundColor: '#FAF8F5',
    resize: 'vertical',
  },
  submitBtn: {
    backgroundColor: '#C85A32',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.85rem',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '600',
    marginTop: '0.5rem',
    cursor: 'pointer',
  },
  emptyText: {
    color: '#6B7280',
    fontSize: '0.9rem',
  },
  inventoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxHeight: '450px',
    overflowY: 'auto',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem',
    border: '1px solid #E5E0DA',
    borderRadius: '8px',
    backgroundColor: '#FAF8F5',
  },
  thumb: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1A1A1A',
    margin: 0,
  },
  itemBadge: {
    fontSize: '0.75rem',
    color: '#C85A32',
    fontWeight: '500',
  },
  actionColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.35rem',
  },
  itemPrice: {
    fontSize: '0.95rem',
    color: '#1A1A1A',
  },
  btnGroup: {
    display: 'flex',
    gap: '0.4rem',
  },
  editBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.25rem 0.55rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.25rem 0.55rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default ArtisanDashboard;