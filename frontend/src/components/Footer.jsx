import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brandCol}>
          <h3 style={styles.brandName}>ArtisanLink</h3>
          <p style={styles.tagline}>Handmade. Authentic. Connected.</p>
          <p style={styles.desc}>
            Connecting independent Jaipur artisans directly with conscious patrons worldwide.
          </p>
        </div>
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Marketplace</h4>
          <Link to="/shop" style={styles.footerLink}>All Products</Link>
          <Link to="/artisans" style={styles.footerLink}>Meet Artisans</Link>
          <Link to="/about" style={styles.footerLink}>Our Story</Link>
        </div>
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Support</h4>
          <span style={styles.footerLink}>Verified Craft Guarantee</span>
          <span style={styles.footerLink}>Shipping & Orders</span>
          <span style={styles.footerLink}>Contact Support</span>
        </div>
      </div>
      <div style={styles.bottomBar}>
        <p>© 2026 ArtisanLink. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#F4EFEA',
    borderTop: '1px solid #E5E0DA',
    padding: '3.5rem 3rem 1.5rem 3rem',
    marginTop: '4rem',
    width: '100%',
  },
  container: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '3rem',
  },
  brandName: { color: '#C85A32', fontSize: '1.25rem', marginBottom: '0.25rem' },
  tagline: { fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', marginBottom: '1rem' },
  desc: { fontSize: '0.875rem', color: '#4B5563', maxWidth: '400px', lineHeight: '1.6' },
  colTitle: { fontSize: '0.95rem', fontWeight: '600', marginBottom: '1rem', color: '#1A1A1A' },
  footerLink: { display: 'block', fontSize: '0.875rem', color: '#4B5563', marginBottom: '0.5rem' },
  bottomBar: {
    width: '100%',
    marginTop: '2.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #E5E0DA',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#6B7280',
  },
};

export default Footer;