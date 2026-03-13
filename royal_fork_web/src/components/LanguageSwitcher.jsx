import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return (
    <div className="language-switcher" style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
      {['fr', 'en', 'ar', 'de', 'it', 'nl'].map((lng) => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          style={{
            margin: '0 5px',
            background: 'none',
            border: 'none',
            color: i18n.language === lng ? 'var(--gold)' : 'var(--white)',
            cursor: 'pointer',
            fontWeight: i18n.language === lng ? 'bold' : 'normal',
            textTransform: 'uppercase',
            fontSize: '0.8rem'
          }}
        >
          {lng}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
