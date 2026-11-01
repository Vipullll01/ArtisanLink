import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authStart, authSuccess, authFailure, logout } from '../redux/authSlice';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.auth || {});

  // Redirect to /shop automatically if user is already logged in
  useEffect(() => {
    if (userInfo) {
      // Small delay or direct redirect if needed, or allow them to view profile
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authStart());

    const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
    const payload = isSignUp
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      dispatch(authSuccess(data));
      navigate('/shop');
    } catch (err) {
      dispatch(authFailure(err.message));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // If user is logged in, show User Profile view instead of forms
  // Inside Login.jsx where userInfo is rendered:
if (userInfo) {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome, {userInfo.name}!</h2>
          <p style={styles.subtitle}>Email: {userInfo.email}</p>
          <p style={styles.roleBadge}>Role: {userInfo.role}</p>
        </div>

        {userInfo.role === 'artisan' && (
          <button
            onClick={() => navigate('/artisan-dashboard')}
            style={styles.dashboardBtn}
          >
            Go to Artisan Studio Dashboard
          </button>
        )}

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Log Out
        </button>
      </div>
    </div>
  );
}

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p style={styles.subtitle}>
            {isSignUp
              ? 'Join the community supporting independent Jaipur artisans.'
              : 'Sign in to manage your orders or artisan store.'}
          </p>
        </div>

        {error && <p style={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {isSignUp && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ananya Sharma"
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>I am joining as a:</label>
                <div style={styles.roleGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="role"
                      value="customer"
                      checked={formData.role === 'customer'}
                      onChange={handleChange}
                      style={styles.radio}
                    />
                    Patron / Buyer
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="role"
                      value="artisan"
                      checked={formData.role === 'artisan'}
                      onChange={handleChange}
                      style={styles.radio}
                    />
                    Artisan
                  </label>
                </div>
              </div>
            </>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style={styles.toggleFooter}>
          <p style={styles.toggleText}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                dispatch(authFailure(null));
                setIsSignUp(!isSignUp);
              }}
              style={styles.toggleBtn}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
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
    maxWidth: '440px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#6B7280',
    lineHeight: '1.4',
  },
  roleBadge: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#C85A32',
    marginTop: '0.5rem',
    textTransform: 'capitalize',
  },
  errorMessage: {
    color: '#D9534F',
    backgroundColor: '#FADBD8',
    padding: '0.6rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    textAlign: 'left',
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
    outline: 'none',
    backgroundColor: '#FAF8F5',
    color: '#1A1A1A',
  },
  roleGroup: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '0.25rem',
  },
  radioLabel: {
    fontSize: '0.85rem',
    color: '#1A1A1A',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    cursor: 'pointer',
  },
  radio: {
    accentColor: '#C85A32',
  },
  submitBtn: {
    backgroundColor: '#C85A32',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.85rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '0.5rem',
    cursor: 'pointer',
  },
  logoutBtn: {
    width: '100%',
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.85rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '1rem',
    cursor: 'pointer',
  },
  toggleFooter: {
    marginTop: '1.5rem',
    textAlign: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid #E5E0DA',
  },
  toggleText: {
    fontSize: '0.875rem',
    color: '#6B7280',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#C85A32',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer',
    paddingLeft: '0.25rem',
  }, 
  dashboardBtn: {
  width: '100%',
  backgroundColor: '#C85A32',
  color: '#FFFFFF',
  border: 'none',
  padding: '0.85rem',
  borderRadius: '6px',
  fontSize: '1rem',
  fontWeight: '600',
  marginBottom: '0.75rem',
  cursor: 'pointer',
},
};

export default Login;