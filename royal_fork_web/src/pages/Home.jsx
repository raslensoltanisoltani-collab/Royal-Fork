import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import Card3D from '../components/Card3D'
import ReviewCard from '../components/ReviewCard'
import ReviewForm from '../components/ReviewForm'
import SteamOverlay from '../components/SteamOverlay'
import { db } from '../firebase'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'

const Home = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([])
  const [showReviewForm, setShowReviewForm] = useState(false)

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc')
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const r = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setReviews(r)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" style={{
        height: '80vh',
        background: `linear-gradient(rgba(0,31,63,0.5), rgba(0,31,63,0.5)), url("${import.meta.env.BASE_URL}assets/hero_main.jpg")`, // Official hero asset
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'var(--white)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Steam Effect */}
        <SteamOverlay count={15} height="100px" opacity={0.7} />

        {/* Icônes réseaux sociaux - haut gauche */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 10
        }}>
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '42px', height: '42px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(6px)',
              border: '1.5px solid rgba(255,255,255,0.6)',
              color: '#fff',
              textDecoration: 'none',
              transition: 'transform 0.22s, background-color 0.22s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.18)'; e.currentTarget.style.backgroundColor = '#1877F2'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            title="TikTok"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '42px', height: '42px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(6px)',
              border: '1.5px solid rgba(255,255,255,0.6)',
              color: '#fff',
              textDecoration: 'none',
              transition: 'transform 0.22s, background-color 0.22s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.18)'; e.currentTarget.style.backgroundColor = '#010101'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34v-7.1a8.16 8.16 0 004.77 1.52V5.5a4.85 4.85 0 01-1-.81z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '42px', height: '42px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(6px)',
              border: '1.5px solid rgba(255,255,255,0.6)',
              color: '#fff',
              textDecoration: 'none',
              transition: 'transform 0.22s, background-color 0.22s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.18)'; e.currentTarget.style.background = 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
        </div>
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container"
        >
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--gold)' }}>
            {t('hero_title')}
          </h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
            {t('hero_subtitle')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              className="btn-primary" 
              onClick={() => navigate('/order')}
              style={{ fontSize: '1.1rem', padding: '15px 30px' }}
            >
              {t('order_now')}
            </button>
            <button 
              className="btn-outline" 
              onClick={() => {
                const servicesSection = document.getElementById('services-section');
                if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ fontSize: '1.1rem', padding: '15px 30px', borderColor: 'var(--white)', color: 'var(--white)' }}
            >
              {t('services')}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Detailed Presentation Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '25px' }}>{t('home.excellence_title')}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#444', marginBottom: '20px' }}>
                {t('home.excellence_desc1')}
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#444', marginBottom: '25px' }} dangerouslySetInnerHTML={{ __html: t('home.excellence_desc2') }} />
              <div style={{ backgroundColor: 'var(--navy)', color: 'var(--white)', padding: '30px', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontStyle: 'italic', opacity: 0.9 }}>
                  {t('home.excellence_quote')}
                </p>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <Card3D intensity={10} style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                <img src={`${import.meta.env.BASE_URL}assets/kitchen.jpg`} alt="Cuisine Royal Fork" style={{ width: '100%', display: 'block' }} />
                <SteamOverlay count={10} height="100px" opacity={0.7} />
              </Card3D>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', backgroundColor: 'var(--gold)', color: 'var(--navy)', padding: '20px', borderRadius: '8px', fontWeight: 'bold', zIndex: 10 }}>
                {t('home.hq')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services-section" className="section-padding" style={{ backgroundColor: 'var(--gray-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '10px' }}>{t('home.experience_title')}</h2>
            <p style={{ opacity: 0.7 }}>{t('home.experience_subtitle')}</p>
            <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--gold)', margin: '20px auto' }}></div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            <ServiceCard 
              title={t('home.services.catering_title')}
              desc={t('home.services.catering_desc')}
            />
            <ServiceCard 
              title={t('home.services.coffee_title')}
              desc={t('home.services.coffee_desc')}
            />
            <ServiceCard 
              title={t('home.services.seminar_title')}
              desc={t('home.services.seminar_desc')}
            />
            <ServiceCard 
              title={t('home.services.custom_title')}
              desc={t('home.services.custom_desc')}
            />
          </div>
        </div>
      </section>
      {/* Delivery Fleet Section */}
      <section className="section-padding">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '20px' }}>{t('home.delivery_title')}</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.8 }}>
              {t('home.delivery_desc')}
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ backgroundColor: 'var(--navy)', color: 'var(--white)', padding: '15px 25px', borderRadius: '4px' }}>
                <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--gold)' }}>100%</strong>
                <span style={{ fontSize: '0.9rem' }}>{t('home.freshness')}</span>
              </div>
              <div style={{ backgroundColor: 'var(--navy)', color: 'var(--white)', padding: '15px 25px', borderRadius: '4px' }}>
                <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--gold)' }}>Europe</strong>
                <span style={{ fontSize: '0.9rem' }}>{t('home.international')}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Card3D intensity={15} style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img 
                src={`${import.meta.env.BASE_URL}assets/delivery_van.jpg`} 
                alt="Royal Fork Delivery Van" 
                style={{ width: '100%', display: 'block' }} 
              />
            </Card3D>
            <Card3D intensity={15} style={{ borderRadius: '12px', overflow: 'hidden', marginTop: '40px' }}>
              <img 
                src={`${import.meta.env.BASE_URL}assets/delivery_scooter.jpg`} 
                alt="Royal Fork Delivery Scooter" 
                style={{ width: '100%', display: 'block' }} 
              />
            </Card3D>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ backgroundColor: '#fcfcfc', padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h5 style={{ color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '10px' }}>{t('home.testimonials_subtitle')}</h5>
            <h2 style={{ color: 'var(--navy)', fontSize: '2.5rem' }}>{t('home.testimonials_title')}</h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px' 
          }}>
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <ReviewCard 
                  key={rev.id}
                  name={rev.name} 
                  role={rev.role} 
                  content={rev.content} 
                  rating={rev.rating}
                  createdAt={rev.createdAt}
                />
              ))
            ) : (
              // Fallback cards with requested 2026 dates
              <>
                <ReviewCard 
                  name="Jean-Pierre B." 
                  role={t('home.reviews.client1_role')} 
                  content={t('home.reviews.client1_text')} 
                  rating={5}
                  date={t('home.reviews.client1_date')}
                />
                <ReviewCard 
                  name="Sarah L." 
                  role={t('home.reviews.client2_role')} 
                  content={t('home.reviews.client2_text')} 
                  rating={5}
                  date={t('home.reviews.client2_date')}
                />
              </>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button className="btn-outline" onClick={() => setShowReviewForm(true)}>
              {t('home.give_review')}
            </button>
          </div>
        </div>
      </section>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: 'white',
                maxWidth: '500px',
                width: '100%',
                borderRadius: '12px',
                position: 'relative'
              }}
            >
              <ReviewForm onClose={() => setShowReviewForm(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ServiceCard = ({ title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    style={{
      backgroundColor: 'var(--white)',
      padding: '40px 30px',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
      textAlign: 'center'
    }}
  >
    <h3 style={{ marginBottom: '15px', color: 'var(--navy)' }}>{title}</h3>
    <p style={{ color: '#666' }}>{desc}</p>
  </motion.div>
)

export default Home
