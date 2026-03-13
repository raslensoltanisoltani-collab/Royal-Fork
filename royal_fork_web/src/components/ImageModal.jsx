import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const ImageModal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          cursor: 'zoom-out'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '10px',
            zIndex: 10000
          }}
        >
          <X size={36} />
        </button>

        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           exit={{ scale: 0.8, opacity: 0 }}
           transition={{ type: 'spring', damping: 25, stiffness: 300 }}
           onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
           style={{ position: 'relative', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
        >
            <div className="photo-watermark-container" style={{ display: 'inline-block', maxWidth: '90vw', maxHeight: '90vh' }}>
                <img
                    src={imageSrc}
                    alt="Zoomed image"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '90vh',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                />
            </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ImageModal
