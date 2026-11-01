const About = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <span style={styles.badge}>Our Mission</span>
        <h1 style={styles.heroTitle}>Preserving Heritage. Empowering Artisans.</h1>
        <p style={styles.heroSubtitle}>
          ArtisanLink was created to bridge the gap between traditional Jaipur craftspeople and conscious patrons worldwide, ensuring sustainable livelihoods and authentic craftsmanship.
        </p>
      </section>

      {/* Story Section */}
      <section style={styles.storyGrid}>
        <div style={styles.storyCard}>
          <h2 style={styles.cardTitle}>The Jaipur Legacy</h2>
          <p style={styles.cardText}>
            Jaipur is home to generations of master artisans who have perfected centuries-old crafts—from intricate hand block printing and vibrant blue pottery to delicate brasswork and traditional handloom weaving.
          </p>
        </div>
        <div style={styles.storyCard}>
          <h2 style={styles.cardTitle}>Direct Impact</h2>
          <p style={styles.cardText}>
            By eliminating unnecessary middlemen, ArtisanLink ensures that local creators receive fair compensation for their expertise, allowing these historic art forms to thrive in the modern world.
          </p>
        </div>
      </section>

      {/* Pillars / Values Section */}
      <section style={styles.valuesSection}>
        <h2 style={styles.sectionTitle}>What Drives Us</h2>
        <div style={styles.valuesGrid}>
          <div style={styles.valueBox}>
            <h3 style={styles.valueHeader}>100% Authentic</h3>
            <p style={styles.valueDesc}>
              Every item is verified and handcrafted directly in artisan workshops across Rajasthan.
            </p>
          </div>
          <div style={styles.valueBox}>
            <h3 style={styles.valueHeader}>Fair Trade Principles</h3>
            <p style={styles.valueDesc}>
              Transparent pricing models that directly benefit craft communities and their families.
            </p>
          </div>
          <div style={styles.valueBox}>
            <h3 style={styles.valueHeader}>Cultural Preservation</h3>
            <p style={styles.valueDesc}>
              Protecting age-old techniques by connecting creators with global appreciation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  pageContainer: {
    width: '100%',
    backgroundColor: '#FAF8F5',
    paddingBottom: '4rem',
  },
  heroSection: {
    padding: '5rem 2rem 3rem 2rem',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  badge: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#C85A32',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    display: 'inline-block',
    marginBottom: '0.75rem',
  },
  heroTitle: {
    fontSize: '2.75rem',
    color: '#1A1A1A',
    fontWeight: '700',
    marginBottom: '1.25rem',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.15rem',
    color: '#4B5563',
    lineHeight: '1.6',
  },
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1100px',
    margin: '2rem auto',
    padding: '0 2rem',
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    padding: '2.5rem',
    borderRadius: '12px',
    border: '1px solid #E5E0DA',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#C85A32',
    marginBottom: '1rem',
    fontWeight: '600',
  },
  cardText: {
    fontSize: '1rem',
    color: '#4B5563',
    lineHeight: '1.6',
  },
  valuesSection: {
    maxWidth: '1100px',
    margin: '4rem auto 0 auto',
    padding: '0 2rem',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2rem',
    color: '#1A1A1A',
    marginBottom: '2.5rem',
    fontWeight: '700',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  valueBox: {
    backgroundColor: '#F4EFEA',
    padding: '2rem',
    borderRadius: '10px',
    border: '1px solid #E5E0DA',
    textAlign: 'left',
  },
  valueHeader: {
    fontSize: '1.2rem',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  valueDesc: {
    fontSize: '0.95rem',
    color: '#6B7280',
    lineHeight: '1.5',
  },
};

export default About;