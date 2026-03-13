import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
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

  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoomedImage, setZoomedImage] = useState(null)

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  const getCardStyle = (index) => {
    const diff = index - currentIndex
    
    // Manage wrap-around for a continuous circular feel
    let adjustedDiff = diff
    if (diff > images.length / 2) adjustedDiff -= images.length
    if (diff < -images.length / 2) adjustedDiff += images.length

    const isActive = adjustedDiff === 0
    const absDiff = Math.abs(adjustedDiff)

    return {
      zIndex: 10 - absDiff,
      opacity: Math.max(0.4, 1 - absDiff * 0.3),
      scale: Math.max(0.6, 1 - absDiff * 0.15),
      x: adjustedDiff * 280, // Horizontal offset
      rotateY: adjustedDiff * -35, // 3D rotation
      filter: isActive ? 'none' : 'blur(2px) grayscale(20%)',
    }
  }

  return (
    <div className="gallery-page section-padding" style={{ overflow: 'hidden', perspective: '1200px' }}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '60px', fontSize: '2.5rem', color: 'var(--navy)' }}
        >
          {t('gallery.page_title')}
        </motion.h2>

        {/* 3D Carousel Container */}
        <div style={{ 
          position: 'relative', 
          height: '500px', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <AnimatePresence mode="popLayout">
            {images.map((img, index) => {
              const style = getCardStyle(index)
              // Only render visible cards to optimize performance
              if (Math.abs(index - currentIndex) > 3 && 
                  Math.abs(index - currentIndex) < images.length - 3) return null

              return (
                <motion.div
                  key={img.id}
                  layout
                  initial={false}
                  animate={style}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{
                    position: 'absolute',
                    width: '320px',
                    height: '400px',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <Card3D intensity={15} style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '20px', 
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    border: index === currentIndex ? '3px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                      <img 
                        src={img.src} 
                        alt={img.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,31,63,0.9), transparent 60%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '25px',
                        color: 'white'
                      }}>
                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '5px' }}>{img.title}</p>
                        <span style={{ fontSize: '0.8rem', color: 'var(--gold)', textTransform: 'uppercase' }}>{img.category}</span>
                        
                        {index === currentIndex && (
                          <div 
                            onClick={() => setZoomedImage(img.src)}
                            style={{ 
                              position: 'absolute', top: '20px', right: '20px', 
                              backgroundColor: 'rgba(212,175,55,0.8)', padding: '8px', 
                              borderRadius: '50%', cursor: 'pointer', transition: 'transform 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                          >
                            <Maximize2 size={18} color="white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Navigation Controls */}
          <button 
            onClick={prevImage}
            style={{
              position: 'absolute', left: '5%', zIndex: 100,
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(5px)', color: 'white', transition: 'all 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <ChevronLeft size={30} />
          </button>
          
          <button 
            onClick={nextImage}
            style={{
              position: 'absolute', right: '5%', zIndex: 100,
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(5px)', color: 'white', transition: 'all 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <ChevronRight size={30} />
          </button>
        </div>

        {/* Carousel Pagination dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
          {images.map((_, i) => (
            <div 
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: i === currentIndex ? '30px' : '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: i === currentIndex ? 'var(--gold)' : 'rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
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
