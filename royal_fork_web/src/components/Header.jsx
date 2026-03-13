import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { cartCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { to: "/", label: t('home', 'Accueil') },
    { to: "/menu", label: t('menu', 'La Carte') },
    { to: "/daily-menu", label: t('daily_menu', 'Menu du Jour') },
    { to: "/sandwiches", label: t('sandwiches', 'Sandwiches') },
    { to: "/patisserie", label: t('patisserie', 'Pâtisserie') },
    { to: "/corporate", label: t('corporate', 'Entreprises') },
    { to: "/gallery", label: t('gallery', 'Galerie') },
    { to: "/contact", label: t('contact', 'Contact') },
  ]

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header style={{
      backgroundColor: 'var(--navy)',
      color: 'var(--white)',
      padding: '0.8rem 0',
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
        <Link to="/" onClick={closeMenu} style={{ textDecoration: 'none' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={`${import.meta.env.BASE_URL}assets/logo.png`} 
              alt="Royal Fork Logo" 
              style={{ height: '50px', width: 'auto' }} 
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hide-mobile" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="hide-mobile">
            <LanguageSwitcher />
          </div>
          
          <div onClick={() => { navigate('/order'); closeMenu(); }} style={{ position: 'relative', cursor: 'pointer' }}>
            <ShoppingCart color="var(--gold)" size={22} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'var(--gold)',
                color: 'var(--navy)',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.65rem',
                fontWeight: 'bold'
              }}>{cartCount}</span>
            )}
          </div>
          
          <button className="btn-primary hide-mobile" onClick={() => navigate('/order')} style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
            {t('order_now')}
          </button>

          {/* Mobile Menu Toggle */}
          <div className="hide-desktop" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ cursor: 'pointer', color: 'var(--gold)' }}>
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '66px', // Header height approx
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--navy)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          gap: '15px',
          overflowY: 'auto'
        }}>
          {navLinks.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              onClick={closeMenu}
              style={{ color: 'var(--white)', textDecoration: 'none', fontWeight: 600, fontSize: '1.2rem', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
            <LanguageSwitcher />
          </div>
          <button 
            className="btn-primary" 
            onClick={() => { navigate('/order'); closeMenu(); }} 
            style={{ marginTop: '10px', width: '100%' }}
          >
            {t('order_now')}
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
