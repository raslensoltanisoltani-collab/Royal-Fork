import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu as MenuIcon } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { cartCount } = useCart()

  return (
    <header style={{
      backgroundColor: 'var(--navy)',
      color: 'var(--white)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={`${import.meta.env.BASE_URL}assets/logo.png`} 
              alt="Royal Fork Logo" 
              style={{ height: '60px', width: 'auto' }} 
            />
          </div>
        </Link>

        <nav style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}>{t('home', 'Accueil')}</Link>
          <Link to="/menu" style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}>{t('menu', 'La Carte')}</Link>
          <Link to="/daily-menu" style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}>{t('daily_menu', 'Menu du Jour')}</Link>
          <Link to="/sandwiches" style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}>{t('sandwiches', 'Sandwiches')}</Link>
          <Link to="/patisserie" style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}>{t('patisserie', 'Pâtisserie')}</Link>
          <Link to="/corporate" style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}>{t('corporate', 'Entreprises')}</Link>
          <Link to="/gallery" style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}>{t('gallery', 'Galerie')}</Link>
          <Link to="/contact" style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500 }}>{t('contact', 'Contact')}</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <LanguageSwitcher />
          <div onClick={() => navigate('/order')} style={{ position: 'relative', cursor: 'pointer' }}>
            <ShoppingCart color="var(--gold)" size={24} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'var(--gold)',
                color: 'var(--navy)',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}>{cartCount}</span>
            )}
          </div>
          <button className="btn-primary" onClick={() => navigate('/order')} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            {t('order_now')}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
