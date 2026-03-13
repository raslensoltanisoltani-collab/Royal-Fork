import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import Card3D from '../components/Card3D'
import SteamOverlay from '../components/SteamOverlay'
import ImageModal from '../components/ImageModal'

const BASE = import.meta.env.BASE_URL

const menuData = [
  { id: 1, category: 'Starters', name: 'Mélange de Mezzés Libanais', price: 18, description: 'Hummus, moutabal, taboulé libanais et falafels croustillants.' },
  { id: 8, category: 'Starters', name: 'Falafel de Luxe', price: 14, description: 'Boulettes de pois chiches aux herbes fraîches, sauce tahini premium.' },
  { id: 13, category: 'Starters', name: 'Salade Mechouia', price: 16, description: 'Salade tunisienne de poivrons et tomates grillés, thon et œuf bio.', image: `${BASE}assets/salade_mechouia.jpg` },
  { id: 18, category: 'Starters', name: 'Salade Méditerranéenne à l\'Escalope', price: 19, description: 'Salade fraîche (laitue, tomate, carotte, maïs, olives) accompagnée d\'une escalope panée croustillante et d\'un filet d\'huile d\'olive.', image: `${BASE}assets/salade_mediterraneenne.jpg` },
  { id: 15, category: 'Starters', name: 'Tajine Tunisien', price: 18, description: 'Délicieux tajine tunisien façon quiche, aux œufs, fromage, persil et poulet.', image: `${BASE}assets/tajine_tunisien.jpg` },
  { id: 2, category: 'Main dishes', name: 'Filet de Bœuf Rossini & Riz Gourmet', price: 45, description: 'Filet de bœuf, foie gras poêlé, sauce Madère, servi avec son riz pilaf savoureux.', image: `${BASE}assets/filet_boeuf.jpg` },
  { id: 9, category: 'Starters', name: 'Couscous Royal', price: 34, description: 'Semoule fine, sept légumes, agneau, poulet et merguez artisanale.', image: `${BASE}assets/couscous_royal.jpg` },
  { id: 10, category: 'Main dishes', name: 'Mansaf Traditionnel', price: 42, description: 'Plat national jordanien : agneau mijoté dans une sauce au yaourt séché (jameed)', image: `${BASE}assets/mansaf.jpg` },
  { id: 11, category: 'Main dishes', name: 'Mloukhia Tunisienne', price: 32, description: 'Ragoût traditionnel de feuilles de corète et bœuf fondant.', image: `${BASE}assets/mloukhia.jpg` },
  { id: 14, category: 'Main dishes', name: 'Spaghetti Fruits de Mer', price: 28, description: 'Spaghetti savoureux aux crevettes, moules et palourdes, sauce tomate épicée.', image: `${BASE}assets/spaghetti_fruits_de_mer.jpg` },
  { id: 16, category: 'Main dishes', name: 'Spaghetti au Poulet', price: 22, description: 'Spaghetti gourmands au poulet rôti, pois chiches et olives de table.', image: `${BASE}assets/spaghetti_poulet.jpg` },
  { id: 12, category: 'Main dishes', name: 'Brochettes de Kebab Chef', price: 29, description: 'Viande hachée d\'agneau et bœuf aux épices orientales, grillée au charbon.' },
  { id: 6, category: 'Main dishes', name: 'Tajine d\'Agneau Royal', price: 38, description: 'Mijoté d\'agneau aux pruneaux, amandes grillées et miel.' },
  { id: 3, category: 'Sandwiches', name: 'Club Sandwich Safran', price: 20, description: 'Poulet au safran, légumes grillés, sauce légère au yaourt.' },
  { id: 4, category: 'Desserts', name: 'Dôme Chocolat & Cardamome', price: 14, description: 'Mousse chocolat noir, infusion cardamome, feuille d\'or.' },

  { id: 17, category: 'Drinks', name: 'Citronnade Fraîche (1L)', price: 12, description: 'Citronnade maison aux citrons frais, servie en bouteille de 1 litre avec notre étiquette signature.', image: `${BASE}assets/citronnade.jpg` },
]

const Menu = () => {
  const { t } = useTranslation()
  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('All')
  const [notification, setNotification] = useState(null)
  const [zoomedImage, setZoomedImage] = useState(null)

  const handleAddToCart = (item) => {
    addToCart(item)
    setNotification(`${item.name} ajouté au panier !`)
    setTimeout(() => setNotification(null), 3000)
  }

  const categories = ['All', 'Starters', 'Main dishes', 'Sandwiches', 'Desserts', 'Drinks']

  const getCategoryTranslation = (cat) => {
    switch (cat) {
      case 'All': return t('menu.all');
      case 'Starters': return t('menu.cat_starters');
      case 'Main dishes': return t('menu.cat_mains');
      case 'Sandwiches': return t('menu.cat_sandwiches');
      case 'Desserts': return t('menu.cat_desserts');
      case 'Drinks': return t('menu.cat_drinks');
      default: return cat;
    }
  }

  const translatedMenuData = menuData.map(item => ({
    ...item,
    name: t(`menu.item${item.id}.name`),
    description: t(`menu.item${item.id}.desc`)
  }))

  const filteredItems = activeCategory === 'All' 
    ? translatedMenuData 
    : translatedMenuData.filter(item => item.category === activeCategory)

  return (
    <div className="menu-page section-padding">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', color: 'var(--navy)' }}>{t('menu')}</h2>
        
        {/* Category Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat ? 'btn-primary' : 'btn-outline'}
              style={{ padding: '8px 20px', fontSize: '0.9rem' }}
            >
              {getCategoryTranslation(cat)}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {filteredItems.map(item => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={item.id}
            >
              <Card3D intensity={10} style={{
                backgroundColor: 'var(--white)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                border: '1px solid var(--gray-light)'
              }}>
                <div style={{ height: '200px', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  {/* Sheen overlay */}
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
                    <span style={{ fontSize: '3.5rem', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>
                      {item.category === 'Starters' ? '🥗' :
                       item.category === 'Main dishes' ? '🍽️' :
                       item.category === 'Sandwiches' ? '🥪' :
                       item.category === 'Desserts' ? '🍮' : '☕'}
                    </span>
                  )}
                  {/* Targeted Steam Effect – بخار الطعام */}
                  {['Main dishes', 'Starters'].includes(item.category) && <SteamOverlay count={4} height="50px" opacity={0.6} />}
                  {/* Halal Badge */}
                  <div className="halal-badge">
                    <div className="halal-icon" />
                    100% Halal
                  </div>

                  {/* Category badge */}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--gold)', color: 'var(--navy)', fontSize: '0.65rem', fontWeight: 'bold', padding: '3px 8px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {getCategoryTranslation(item.category)}
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--navy)' }}>{item.name}</h3>
                    <span style={{ fontWeight: 'bold', color: 'var(--gold)', fontSize: '1.1rem' }}>{item.price}€</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#666', marginBottom: '20px', height: '40px', overflow: 'hidden' }}>{item.description}</p>
                  <button 
                    className="btn-primary" 
                    style={{ width: '100%', fontSize: '0.85rem' }}
                    onClick={() => handleAddToCart(item)}
                  >
                    {t('add_to_cart')}
                  </button>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* Notification Toast */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: 'var(--navy)',
              color: 'var(--gold)',
              padding: '12px 24px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000,
              fontWeight: 'bold'
            }}
          >
            {notification}
          </motion.div>
        )}
        
        <ImageModal 
          isOpen={!!zoomedImage} 
          imageSrc={zoomedImage} 
          onClose={() => setZoomedImage(null)} 
        />
      </div>
    </div>
  )
}

export default Menu
