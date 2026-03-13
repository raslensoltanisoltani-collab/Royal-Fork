import React from 'react'
import { CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Card3D from '../components/Card3D'
import SteamOverlay from '../components/SteamOverlay'

const Corporate = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className="corporate-page">
      {/* Hero / Intro */}
      <section className="section-padding" style={{ backgroundColor: 'var(--navy)', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', color: 'var(--gold)', marginBottom: '30px' }}>{t('corp.title')}</h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '900px', margin: '0 auto', lineHeight: '1.6', opacity: 0.9 }}>
            {t('corp.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
            
            {/* Business Catering */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0 }}><CheckCircle color="var(--gold)" size={32} /></div>
              <div>
                <h3 style={{ color: 'var(--navy)', marginBottom: '15px' }}>{t('corp.service1_title')}</h3>
                <p style={{ marginBottom: '15px', color: '#666' }}>{t('corp.service1_desc')}</p>
                <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <li>• {t('corp.service1_item1')}</li>
                  <li>• {t('corp.service1_item2')}</li>
                  <li>• {t('corp.service1_item3')}</li>
                  <li>• {t('corp.service1_item4')}</li>
                </ul>
              </div>
            </div>

            {/* Coffee Break */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0 }}><CheckCircle color="var(--gold)" size={32} /></div>
              <div>
                <h3 style={{ color: 'var(--navy)', marginBottom: '15px' }}>{t('corp.service2_title')}</h3>
                <p style={{ marginBottom: '15px', color: '#666' }}>{t('corp.service2_desc')}</p>
                <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <li>• {t('corp.service2_item1')}</li>
                  <li>• {t('corp.service2_item2')}</li>
                  <li>• {t('corp.service2_item3')}</li>
                  <li>• {t('corp.service2_item4')}</li>
                </ul>
              </div>
            </div>

            {/* Seminars */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0 }}><CheckCircle color="var(--gold)" size={32} /></div>
              <div>
                <h3 style={{ color: 'var(--navy)', marginBottom: '15px' }}>{t('corp.service3_title')}</h3>
                <p style={{ color: '#666' }}>{t('corp.service3_desc')}</p>
              </div>
            </div>

            {/* Tailor Made */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0 }}><CheckCircle color="var(--gold)" size={32} /></div>
              <div>
                <h3 style={{ color: 'var(--navy)', marginBottom: '15px' }}>{t('corp.service4_title')}</h3>
                <p style={{ color: '#666' }}>{t('corp.service4_desc')}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Visual Break with Images */}
      <section style={{ paddingBottom: '80px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: '20px' }}>
          <Card3D intensity={10} style={{ borderRadius: '8px', overflow: 'hidden', height: '350px', position: 'relative' }}>
            <img src={`${import.meta.env.BASE_URL}assets/corporate_coffee.jpg`} alt="Coffee Break" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <SteamOverlay count={6} height="70px" />
          </Card3D>
          <Card3D intensity={10} style={{ borderRadius: '8px', overflow: 'hidden', height: '350px', position: 'relative' }}>
            <img src={`${import.meta.env.BASE_URL}assets/event_buffet.jpg`} alt="Event Buffet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <SteamOverlay count={8} height="80px" />
          </Card3D>
          <Card3D intensity={10} style={{ borderRadius: '8px', overflow: 'hidden', height: '350px', position: 'relative' }}>
            <img src={`${import.meta.env.BASE_URL}assets/desserts_spread.jpg`} alt="Desserts" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <SteamOverlay count={4} height="50px" />
          </Card3D>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding" style={{ backgroundColor: 'var(--gray-light)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--white)', padding: '50px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: 'var(--navy)', fontSize: '2rem', textAlign: 'center', marginBottom: '40px' }}>{t('corp.why_choose')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <ValueItem text={t('corp.reason1')} />
              <ValueItem text={t('corp.reason2')} />
              <ValueItem text={t('corp.reason3')} />
              <ValueItem text={t('corp.reason4')} />
              <ValueItem text={t('corp.reason5')} />
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <p style={{ fontSize: '1.4rem', fontStyle: 'italic', color: 'var(--navy)', fontWeight: 'bold' }}>
              {t('corp.tagline')}
            </p>
            <button 
              className="btn-primary" 
              onClick={() => navigate('/contact')}
              style={{ marginTop: '30px', padding: '15px 40px' }}
            >
              {t('corp.request_quote')}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

const ValueItem = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px' }}>
    <div style={{ width: '10px', height: '10px', backgroundColor: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }}></div>
    <span style={{ fontSize: '1rem', fontWeight: '500' }}>{text}</span>
  </div>
)

export default Corporate
