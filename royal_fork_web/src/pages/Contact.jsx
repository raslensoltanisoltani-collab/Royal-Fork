import React from 'react'
import { Mail, Phone, MapPin, Globe, MessageCircle, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()
  return (
    <div className="contact-page section-padding">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '2.5rem', color: 'var(--navy)' }}>{t('contact.title')}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '50px', marginBottom: '60px' }}>
          {/* Info Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <ContactInfoItem 
              icon={<MapPin color="var(--gold)" />}
              title={t('contact.hq')}
              text={t('contact.address')}
            />
            <ContactInfoItem 
              icon={<Phone color="var(--gold)" />}
              title={t('contact.phone')}
              text="+33 7 76 48 26 09"
            />
            <ContactInfoItem 
              icon={<Clock color="var(--gold)" />}
              title={t('contact.hours_title')}
              text={t('contact.hours_desc')}
            />
            <ContactInfoItem 
              icon={<MessageCircle color="#25D366" />}
              title="WhatsApp"
              text="+33 7 76 48 26 09"
              link="https://wa.me/337764826093"
            />
            <ContactInfoItem 
              icon={<Mail color="var(--gold)" />}
              title={t('contact.email')}
              text="contact@royalfork.fr"
            />
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ color: 'var(--navy)', marginBottom: '15px' }}>{t('contact.countries')}</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['FR', 'CH', 'BE', 'NL', 'DE', 'IT'].map(country => (
                  <span key={country} style={{
                    padding: '5px 12px',
                    backgroundColor: 'var(--gray-light)',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: 'var(--navy)',
                    border: '1px solid var(--gold)'
                  }}>{country}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>{t('contact.form.subject')}</label>
                <select style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <option>{t('contact.form.subject_opt1')}</option>
                  <option>{t('contact.form.subject_opt2')}</option>
                  <option>{t('contact.form.subject_opt3')}</option>
                  <option>{t('contact.form.subject_opt4')}</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" placeholder={t('contact.form.firstname')} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }} />
                <input type="text" placeholder={t('contact.form.lastname')} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }} />
              </div>
              <input type="email" placeholder={t('contact.form.email_placeholder')} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }} />
              <textarea placeholder={t('contact.form.message')} rows="5" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}></textarea>
              <button type="button" className="btn-primary" style={{ padding: '15px' }}>{t('contact.form.submit')}</button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div style={{ width: '100%', height: '450px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <iframe 
            src="https://maps.google.com/maps?q=68%20Rue%20Rachais,%2069007%20Lyon,%20France&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

const ContactInfoItem = ({ icon, title, text, link }) => (
  <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
    <div style={{ marginTop: '5px' }}>{icon}</div>
    <div>
      <h4 style={{ color: 'var(--navy)', margin: 0 }}>{title}</h4>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>{text}</a>
      ) : (
        <p style={{ opacity: 0.8 }}>{text}</p>
      )}
    </div>
  </div>
)

export default Contact
