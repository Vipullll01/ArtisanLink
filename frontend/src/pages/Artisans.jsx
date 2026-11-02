import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Artisans = () => {
  const [artisansData, setArtisansData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArtisan, setActiveArtisan] = useState(null);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const { data } = await axios.get('https://artisanlink-jvq9.onrender.com/api/artisans');
        setArtisansData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching artisans:', err);
        setError('Failed to load artisan profiles.');
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  const categories = ['All', 'Block Printing', 'Blue Pottery', 'Brassware', 'Lac & Jewelry', 'Miniature Art', 'Leathercraft'];

  const filteredArtisans = selectedCategory === 'All'
    ? artisansData
    : artisansData.filter((a) => a.category === selectedCategory);

  // Helper function to safely extract specialties as an array
  const getSpecialties = (artisan) => {
    const raw = artisan.specialties || artisan.specialty || artisan.products || artisan.items;
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string') return raw.split(',').map((s) => s.trim());
    return [];
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#1A1A1A' }}>Loading artisans...</div>;
  if (error) return <div style={{ padding: '4rem', textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={styles.pageContainer}>
      {/* Hero Banner */}
      <section style={styles.hero}>
        <span style={styles.tag}>Jaipur Craftspeople</span>
        <h1 style={styles.title}>Meet the Hands Behind the Craft</h1>
        <p style={styles.subtitle}>
          Discover master artisans across Jaipur carrying forward centuries of block printing, blue pottery, lac jewelry, and miniature art.
        </p>

        {/* Filter Pills */}
        <div style={styles.filterGroup}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...styles.filterBtn,
                backgroundColor: selectedCategory === cat ? '#C85A32' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : '#1A1A1A',
                borderColor: selectedCategory === cat ? '#C85A32' : '#E5E0DA',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Artisans Grid */}
      <section style={styles.grid}>
        {filteredArtisans.map((artisan) => (
          <div key={artisan._id || artisan.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.badge}>{artisan.badge || 'Heritage Artisan'}</span>
              <span style={styles.location}>{artisan.location}</span>
            </div>
            <h2 style={styles.artisanName}>{artisan.name}</h2>
            <p style={styles.craftTitle}>{artisan.craft || artisan.category}</p>
            <p style={styles.bio}>{artisan.bio}</p>
            <div style={styles.metaRow}>
              <span style={styles.metaText}>
                <strong>Workshop:</strong> {artisan.workshop || artisan.workshopName || artisan.studio || 'N/A'}
              </span>
              <span style={styles.metaText}>{artisan.experience}</span>
            </div>
            <button
              onClick={() => setActiveArtisan(artisan)}
              style={styles.profileBtn}
            >
              View Collection & Story
            </button>
          </div>
        ))}
      </section>

      {/* Story & Collection Modal */}
      {activeArtisan && (
        <div style={styles.modaloverlay} onClick={() => setActiveArtisan(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setActiveArtisan(null)}>X</button>
            
            <span style={styles.badge}>{activeArtisan.badge || 'Heritage Artisan'}</span>
            <h2 style={styles.modalTitle}>{activeArtisan.name}</h2>
            
            <p style={styles.modalSubtitle}>
              {(activeArtisan.craft || activeArtisan.category || '')} {activeArtisan.location ? `• ${activeArtisan.location}` : ''}
            </p>

            <div style={styles.modalBody}>
              <h3 style={styles.modalHeading}>Artisan's Heritage & Story</h3>
              <p style={styles.modalText}>
                {activeArtisan.fullStory || activeArtisan.bio || 'Story details coming soon.'}
              </p>

              <h3 style={styles.modalHeading}>Workshop Specialties</h3>
              {getSpecialties(activeArtisan).length > 0 ? (
                <ul style={styles.specialtiesList}>
                  {getSpecialties(activeArtisan).map((item, idx) => (
                    <li key={idx} style={styles.specialtyItem}>
                      • {typeof item === 'string' ? item : item.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={styles.modalText}>
                  {activeArtisan.craft || activeArtisan.category || 'Handcrafted items'}
                </p>
              )}
            </div>

            <button
              style={styles.actionBtn}
              onClick={() => alert(`Redirecting to catalog filtered by ${activeArtisan.name}...`)}
            >
              Explore {activeArtisan.name}'s Catalog
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  pageContainer: {
    width: '100%',
    backgroundColor: '#FAF8F5',
    minHeight: '100vh',
    paddingBottom: '5rem',
  },
  hero: {
    padding: '4rem 2rem 2rem 2rem',
    textAlign: 'center',
    maxWidth: '850px',
    margin: '0 auto',
  },
  tag: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#C85A32',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1A1A1A',
    margin: '0.75rem 0',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#6B7280',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },
  filterGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    border: '1px solid',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  grid: {
    maxWidth: '1200px',
    margin: '2rem auto 0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E5E0DA',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: '700',
    backgroundColor: '#F4EFEA',
    color: '#C85A32',
    padding: '0.25rem 0.6rem',
    borderRadius: '4px',
    textTransform: 'uppercase',
  },
  location: {
    fontSize: '0.85rem',
    color: '#6B7280',
  },
  artisanName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '0.25rem',
  },
  craftTitle: {
    fontSize: '0.95rem',
    color: '#C85A32',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  bio: {
    fontSize: '0.95rem',
    color: '#4B5563',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
    flex: 1,
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    color: '#6B7280',
    paddingTop: '1rem',
    borderTop: '1px solid #E5E0DA',
    marginBottom: '1.25rem',
  },
  metaText: {
    fontSize: '0.85rem',
  },
  profileBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  modaloverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: '2.5rem',
    borderRadius: '12px',
    maxWidth: '550px',
    width: '100%',
    position: 'relative',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  },
  closeBtn: {
    position: 'absolute',
    top: '1.25rem',
    right: '1.25rem',
    border: 'none',
    background: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
    color: '#6B7280',
  },
  modalTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: '0.5rem',
  },
  modalSubtitle: {
    fontSize: '0.95rem',
    color: '#C85A32',
    fontWeight: '600',
    marginBottom: '1.5rem',
  },
  modalBody: {
    marginBottom: '2rem',
  },
  modalHeading: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },
  modalText: {
    fontSize: '0.95rem',
    color: '#4B5563',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  },
  specialtiesList: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  specialtyItem: {
    fontSize: '0.9rem',
    color: '#1A1A1A',
    marginBottom: '0.35rem',
  },
  actionBtn: {
    width: '100%',
    backgroundColor: '#C85A32',
    color: '#FFFFFF',
    border: 'none',
    padding: '0.85rem',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Artisans;