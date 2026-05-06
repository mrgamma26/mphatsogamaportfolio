import SectionWrapper from './SectionWrapper'
import FadeIn from './FadeIn'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

const GMAIL = 'https://mail.google.com/mail/?view=cm&to=mphatsotobiasg@gmail.com&su=Hiring%20Inquiry'

const contacts = [
  { label: 'Email', value: 'mphatsotobiasg@gmail.com', href: GMAIL },
  { label: 'Phone', value: '+265 994 310 305', href: 'tel:+265994310305' },
  { label: 'Location', value: 'Blantyre, Malawi', href: null },
  { label: 'GitHub', value: 'github.com/mrgamma26', href: 'https://github.com/mrgamma26' },
]

export default function Contact() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const t = translations[language].contact

  return (
    <SectionWrapper id="contact">
      <FadeIn>
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>{t.label}</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {t.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            {t.subtitle}
          </p>

          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
            {contacts.map(({ label, value, href }) => (
              <motion.div
                key={label}
                whileHover={href ? { scale: 1.02, y: -2 } : {}}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  backdropFilter: theme === 'light' ? 'blur(10px)' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: href ? 'pointer' : 'default',
                  transition: 'border-color 0.3s',
                }}
                onClick={() => href && window.open(href, '_blank')}
                onMouseEnter={e => href && (e.currentTarget.style.borderColor = 'var(--text-muted)')}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
              </motion.div>
            ))}
          </div>

          <motion.a
            href={GMAIL}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-block',
              padding: '0.85rem 2rem',
              borderRadius: '10px',
              background: 'var(--text-primary)',
              color: 'var(--bg)',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
              transition: 'box-shadow 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.35)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.25)'}
          >
            {t.sendMessage}
          </motion.a>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}
