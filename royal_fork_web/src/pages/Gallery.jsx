import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Card3D from '../components/Card3D'
import ImageModal from '../components/ImageModal'
const Gallery = () => {
  const { t } = useTranslation()
  const BASE = import.meta.env.BASE_URL
  const images = [
    { id: 1, title: t('gallery.img1'), type: 'Events', category: t('gallery.cat1'),     src: `${BASE}assets/event_buffet.jpg` },
    { id: 2, title: t('gallery.img2'), type: 'Delivery', category: t('gallery.cat2'),   src: `${BASE}assets/delivery_scooter.jpg` },
    { id: 3, title: t('gallery.img3'), type: 'Corporate', category: t('gallery.cat3'), src: `${BASE}assets/corporate_coffee.jpg` },
    { id: 4, title: t('gallery.img4'), type: 'Kitchen', category: t('gallery.cat4'),    src: `${BASE}assets/kitchen.jpg` },
    { id: 5, title: t('gallery.img5'), type: 'Fleet', category: t('gallery.cat5'),     src: `${BASE}assets/delivery_van.jpg` },
    { id: 6, title: t('gallery.img6'), type: 'Packaging', category: t('gallery.cat6'),  src: `${BASE}assets/packaging.jpg` },
    { id: 7, title: t('gallery.img7'), type: 'Desserts', category: t('gallery.cat7'),   src: `${BASE}assets/desserts_spread.jpg` },
  ]

  const [zoomedImage, setZoomedImage] = useState(null)

  return (
    <div className="gallery-page section-padding">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5rem', color: 'var(--navy)' }}
        >
          {t('gallery.page_title')}
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card3D
                intensity={12}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: '300px',
                  position: 'relative',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}
              >
                {/* Photo */}
                <div 
                  className="photo-watermark-container" 
                  onClick={() => setZoomedImage(img.src)}
                  style={{ cursor: 'zoom-in', width: '100%', height: '100%' }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 60%)',
                  pointerEvents: 'none'
                }} />

                {/* Label */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,31,63,0.85), transparent)',
                  padding: '30px 20px 15px',
                  color: 'white'
                }}>
                  <p style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '4px' }}>{img.title}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {img.category}
                  </span>
                </div>

                {/* Steam wisps on some cards */}
                {['Events', 'Kitchen', 'Desserts'].includes(img.type) && (
                  <div className="steam-container" style={{ bottom: '60px' }}>
                    <div className="steam-wisp" />
                    <div className="steam-wisp" />
                    <div className="steam-wisp" />
                  </div>
                )}

                {/* Copyright */}
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)',
                  backgroundColor: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px'
                }}>
                  © Royal Fork
                </div>
              </Card3D>
            </motion.div>
          ))}
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

export default Gallery
