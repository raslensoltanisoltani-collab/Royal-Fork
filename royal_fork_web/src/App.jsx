import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Order from './pages/Order'
import Corporate from './pages/Corporate'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Tracking from './pages/Tracking'
import Admin from './pages/Admin'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import DailyMenu from './pages/DailyMenu'
import Sandwiches from './pages/Sandwiches'
import Patisserie from './pages/Patisserie'
import ChatBot from './components/ChatBot'
import SteamEffect from './components/SteamEffect'
import WhatsAppButton from './components/WhatsAppButton'
import VisitorTracker from './components/VisitorTracker'
import Analytics from './pages/Analytics'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { CartProvider } from './context/CartContext'
import './index.css'
import './i18n/config'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useTranslation } from 'react-i18next'

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder_key')

function App() {
  const { t } = useTranslation();
  const [user, setUser] = React.useState(null);
  const [devAdmin] = React.useState(() => localStorage.getItem('devAdmin') === 'true');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    // Firebase might fail if not configured — don't block forever
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => { unsubscribe(); clearTimeout(timer); };
  }, []);

  if (loading) return null; // Or a loading spinner

  return (
    <PayPalScriptProvider options={{ "client-id": "test", currency: "EUR" }}>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <Router>
          <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/order" element={<Order />} />
              <Route path="/corporate" element={<Corporate />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/login" element={<Login />} />
              <Route path="/daily-menu" element={<DailyMenu />} />
              <Route path="/sandwiches" element={<Sandwiches />} />
              <Route path="/patisserie" element={<Patisserie />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
            <VisitorTracker />
            <ChatBot />
            <SteamEffect />
            <WhatsAppButton />
          </main>
          <footer style={{
            backgroundColor: 'var(--navy)',
            color: 'var(--white)',
            padding: '60px 0 20px',
            marginTop: '80px'
          }}>
            <div className="container">
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px'
              }}>
                <div>
                  <h3 style={{ color: 'var(--gold)', marginBottom: '20px' }}>Royal Fork</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{t('footer.desc')}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gold)', marginTop: '5px', fontWeight: 'bold' }}>{t('footer.certification')}</p>
                  {/* Icônes réseaux sociaux */}
                  <div style={{ display: 'flex', gap: '12px', marginTop: '18px' }}>
                    {/* Facebook */}
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1877F2', color: '#fff', transition: 'transform 0.2s, opacity 0.2s', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.opacity = '0.9'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
                      title="Facebook"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                    </a>
                    {/* TikTok */}
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#010101', color: '#fff', transition: 'transform 0.2s, opacity 0.2s', textDecoration: 'none', border: '1px solid #333' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.opacity = '0.9'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
                      title="TikTok"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34v-7.1a8.16 8.16 0 004.77 1.52V5.5a4.85 4.85 0 01-1-.81z"/>
                      </svg>
                    </a>
                    {/* Instagram */}
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: '#fff', transition: 'transform 0.2s, opacity 0.2s', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.opacity = '0.9'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
                      title="Instagram"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 style={{ marginBottom: '20px' }}>{t('footer.quick_links')}</h4>
                  <ul style={{ listStyle: 'none', fontSize: '0.9rem', opacity: 0.8 }}>
                    <li><Link to="/menu" style={{ color: 'inherit', textDecoration: 'none' }}>{t('footer.link_menu')}</Link></li>
                    <li><Link to="/corporate" style={{ color: 'inherit', textDecoration: 'none' }}>{t('footer.link_corporate')}</Link></li>
                    <li><Link to="/gallery" style={{ color: 'inherit', textDecoration: 'none' }}>{t('footer.link_gallery')}</Link></li>
                    <li><Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>{t('footer.link_contact')}</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ marginBottom: '20px' }}>{t('footer.hq_title')}</h4>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{t('footer.hq_address')}</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '10px' }}>{t('footer.hq_email')}</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{t('footer.hq_tel')}</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  <a href="https://wa.me/447764826093" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none', fontWeight: 'bold' }}>
                    {t('footer.hq_whatsapp')}
                  </a>
                </p>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '10px' }}>{t('footer.hq_served')}</p>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', textAlign: 'center', fontSize: '0.8rem', opacity: 0.6 }}>
                {t('footer.copyright', { year: new Date().getFullYear() })} &nbsp;|&nbsp; <Link to="/admin" style={{ color: 'inherit', opacity: 0.4, fontSize: '0.7rem' }}>{t('footer.admin')}</Link>
              </div>
            </div>
          </footer>
        </div>
          </Router>
        </Elements>
      </CartProvider>
    </PayPalScriptProvider>
  )
}

export default App
