import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import Card3D from '../components/Card3D'
import SteamOverlay from '../components/SteamOverlay'
import ImageModal from '../components/ImageModal'

const Sandwiches = () => {
  const { t } = useTranslation()
  const { addToCart } = useCart()
  const [addedItems, setAddedItems] = useState({})
  const [zoomedImage, setZoomedImage] = useState(null)

  // Fetch only sandwiches from the existing menu data, or define them here
  const sandwichesData = [
    { id: 3, category: t('menu.cat_sandwiches'), name: t('menu.item3.name'), price: 20, description: t('menu.item3.desc') },
    // You can add more sandwiches here in the future
  ]

  const handleAddToCart = (item) => {
    addToCart(item)
    setAddedItems({ ...addedItems, [item.id]: true })
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }))
    }, 2000)
  }

  return (
    <div className="menu-page section-padding" style={{ backgroundColor: 'var(--gray-light)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <img src="/assets/logo.png" alt="Royal Fork Logo" style={{ width: '80px', marginBottom: '20px' }} />
          <h1 className="premium-font" style={{ fontSize: '3rem', color: 'var(--navy)', marginBottom: '10px' }}>
            {t('sandwiches.title')}
          </h1>
          <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--gold)', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#555', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            {t('sandwiches.subtitle')}
          </p>
        </motion.div>

        {/* Sandwiches Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          <AnimatePresence>
            {sandwichesData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card3D intensity={10} style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  
                  {/* Image Section */}
                  <div style={{ height: '220px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--navy)' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 2 }} />
                    
                    {item.image ? (
                      <div 
                        className="photo-watermark-container"
                        onClick={() => setZoomedImage(item.image)}
                        style={{ cursor: 'zoom-in', width: '100%', height: '100%' }}
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, opacity: 0.85 }} 
                        />
                      </div>
                    ) : (
                      <span style={{ fontSize: '3.5rem', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        🥪
                      </span>
                    )}

                    {/* Halal Badge */}
                    <div className="halal-badge">
                      <div className="halal-icon" />
                      {t('halal_badge')}
                    </div>

                    {/* Steam overlay (optional, maybe not for all sandwiches depending on if they are hot) */}
                     <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,31,63,0.8), transparent 80%)', zIndex: 1 }}>
                       <SteamOverlay count={4} height="50px" opacity={0.5} />
                     </div>
                  </div>

                  {/* Content Section */}
                  <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 3, backgroundColor: 'white' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', fontWeight: 'bold', lineHeight: 1.3, flex: 1, paddingRight: '15px' }}>
                        {item.name}
                      </h3>
                      <span style={{ fontSize: '1.4rem', color: 'var(--gold)', fontWeight: 'bold' }}>
                        {item.price}€
                      </span>
                    </div>

                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '24px', flexGrow: 1, lineHeight: 1.5 }}>
                      {item.description}
                    </p>

                    <button 
                      className="btn-primary" 
                      onClick={() => handleAddToCart(item)}
                      disabled={addedItems[item.id]}
                      style={{ 
                        width: '100%', 
                        padding: '12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: addedItems[item.id] ? '#2ecc71' : 'var(--gold)',
                        color: addedItems[item.id] ? 'white' : 'var(--navy)',
                        transition: 'all 0.3s'
                      }}
                    >
                      {addedItems[item.id] ? (
                        <>✓ {t('cart.added_btn')}</>
                      ) : (
                        <>{t('add_to_cart').toUpperCase()}</>
                      )}
                    </button>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <ImageModal 
          isOpen={!!zoomedImage} 
          imageSrc={zoomedImage} 
          onClose={() => setZoomedImage(null)} 
        />

      </div>
    </div>
  )
}

export default Sandwiches
