import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Tracking = () => {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)

  // Mock progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 4) setStep(step + 1)
    }, 5000)
    return () => clearTimeout(timer)
  }, [step])

  const steps = [
    { id: 1, label: t('tracking.step1_title'), icon: <CheckCircle size={24} />, desc: t('tracking.step1_desc') },
    { id: 2, label: t('tracking.step2_title'), icon: <Clock size={24} />, desc: t('tracking.step2_desc') },
    { id: 3, label: t('tracking.step3_title'), icon: <Truck size={24} />, desc: t('tracking.step3_desc') },
    { id: 4, label: t('tracking.step4_title'), icon: <Package size={24} />, desc: t('tracking.step4_desc') },
  ]

  return (
    <div className="tracking-page section-padding">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '10px' }}>{t('tracking.title')}</h2>
          <p style={{ opacity: 0.7 }}>Commande #RF-2026-001</p>
        </div>

        <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            {/* Vertical Line */}
            <div style={{
              position: 'absolute',
              left: '11px',
              top: '10px',
              bottom: '10px',
              width: '2px',
              backgroundColor: '#eee'
            }}></div>

            {steps.map((s) => (
              <div key={s.id} style={{ marginBottom: '40px', position: 'relative', opacity: step >= s.id ? 1 : 0.4 }}>
                <div style={{
                  position: 'absolute',
                  left: '-40px',
                  top: '0',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: step >= s.id ? 'var(--gold)' : '#eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step >= s.id ? 'var(--navy)' : '#999',
                  zIndex: 2
                }}>
                  {s.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: step >= s.id ? 'var(--navy)' : 'inherit', marginBottom: '5px' }}>{s.label}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <button className="btn-outline" onClick={() => window.location.href = '/'}>{t('tracking.back_home')}</button>
        </div>
      </div>
    </div>
  )
}

export default Tracking
