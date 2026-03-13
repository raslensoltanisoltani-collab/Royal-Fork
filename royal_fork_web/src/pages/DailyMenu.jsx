import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Card3D from '../components/Card3D';
import SteamOverlay from '../components/SteamOverlay';

const getDailySpecial = (t) => ({
  id: 100,
  category: 'Main dishes',
  name: t('daily.item.name'),
  price: 36,
  originalPrice: 45,
  description: t('daily.item.desc'),
  image: '/assets/daily_menu_hero.jpg'
});

const DailyMenu = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [notification, setNotification] = useState(null);

  const dailySpecial = getDailySpecial(t);
  
  const handleAddToCart = (item) => {
    addToCart(item);
    setNotification(`${item.name} ${t('cart.added_toast')}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="daily-menu-page">
      {/* Hero Section */}
      <section className="hero-mini" style={{
        height: '400px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/daily_menu_hero.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--white)',
        textAlign: 'center'
      }}>
        {/* Adds watermark over hero image */}
        <div className="photo-watermark-container" style={{ position: 'absolute', inset: 0, zIndex: 1 }}></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px', color: 'var(--gold)' }}>{t('daily.title')}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{t('daily.subtitle')}</p>
        </motion.div>
      </section>

      <section className="section-padding">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ 
              backgroundColor: 'var(--gold-light)', 
              color: 'var(--gold-dark)', 
              padding: '5px 15px', 
              borderRadius: '20px', 
              fontSize: '0.8rem', 
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>{t('daily.limited_offer')}</span>
            <h2 style={{ marginTop: '20px', fontSize: '2.5rem', color: 'var(--navy)' }}>{t('daily.chef_specialty')}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card3D intensity={15}>
                <div className="photo-watermark-container" style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                  <img src={dailySpecial.image} alt={dailySpecial.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
                  <SteamOverlay count={6} height="70px" opacity={0.7} />
                </div>
              </Card3D>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 style={{ fontSize: '2rem', color: 'var(--navy)', marginBottom: '15px' }}>{dailySpecial.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--gold)' }}>{dailySpecial.price}€</span>
                <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', opacity: 0.4 }}>{dailySpecial.originalPrice}€</span>
                <span style={{ backgroundColor: 'var(--red)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{t('daily.discount')}</span>
              </div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '30px' }}>
                {dailySpecial.description}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600 }}>
                  <span style={{ color: 'var(--gold)' }}>✓</span> {t('daily.feature1')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600 }}>
                  <span style={{ color: 'var(--gold)' }}>✓</span> {t('daily.feature2')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600 }}>
                  <span style={{ color: 'var(--gold)' }}>✓</span> {t('daily.feature3')}
                </div>
              </div>

              <button 
                className="btn-primary" 
                style={{ marginTop: '40px', width: '100%', padding: '15px', fontSize: '1.1rem' }}
                onClick={() => handleAddToCart(dailySpecial)}
              >
                {t('daily.add_offer')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notification Toast */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: 'var(--navy)',
            color: 'var(--white)',
            padding: '15px 25px',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            border: '1px solid var(--gold)',
            zIndex: 2000
          }}
        >
          {notification}
        </motion.div>
      )}
    </div>
  );
};

export default DailyMenu;
