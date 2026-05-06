import SectionWrapper from './SectionWrapper'
import FadeIn from './FadeIn'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

export default function About() {
  const { language } = useLanguage()
  const t = translations[language].about

  return (
    <SectionWrapper id="about">
      <FadeIn>
        <p style={{ fontSize: '0.78rem', color: '#6366f1', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>{t.label}</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          {t.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.88rem, 2vw, 0.95rem)', marginBottom: '1rem', maxWidth: '800px' }}>
          {t.description1}
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.88rem, 2vw, 0.95rem)', marginBottom: '2rem', maxWidth: '800px' }}>
          {t.description2}
        </p>

        <div className="stats-grid">
          {[
            { label: t.location, value: t.locationValue },
            { label: t.degree, value: t.degreeValue },
            { label: t.focus, value: t.focusValue },
            { label: t.status, value: t.statusValue },
          ].map(({ label, value }) => (
            <motion.div 
              key={label} 
              className="stat-card"
              whileHover={{ y: -3 }}
            >
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem', fontWeight: 600 }}>{label}</p>
              <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</p>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          max-width: 800px;
        }
        .stat-card {
          padding: 1rem 1.2rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          backdrop-filter: blur(10px);
          transition: all 0.3s;
        }
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }
      `}</style>
    </SectionWrapper>
  )
}
