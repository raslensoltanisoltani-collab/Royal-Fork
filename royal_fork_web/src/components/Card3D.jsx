import React, { useRef } from 'react'

/**
 * Card3D – Dynamic 3D tilt effect on hover
 * Wrap any content with this to give it a mouse-tracking 3D perspective.
 */
const Card3D = ({ children, style = {}, intensity = 15 }) => {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left   // 0 → width
    const y = e.clientY - rect.top    // 0 → height
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = -((y - cy) / cy) * intensity
    const rotateY =  ((x - cx) / cx) * intensity
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`
    card.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5}px 30px rgba(0,0,0,0.25)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transition: 'transform 0.1s ease, box-shadow 0.1s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  )
}

export default Card3D
