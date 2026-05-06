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
      <div className="about-grid">
        <FadeIn direction="left">
          <p style={{ fontSize: '0.78rem', color: '#6366f1', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>{t.label}</p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            {t.title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.88rem, 2vw, 0.95rem)', marginBottom: '1rem' }}>
            {t.description1}
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.88rem, 2vw, 0.95rem)', marginBottom: '2rem' }}>
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
                whileHover={{ y: -3, borderColor: 'var(--border)' }}
              >
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem', fontWeight: 600 }}>{label}</p>
                <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.2}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              border: '3px solid var(--border)',
              background: 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <img 
                src="/profile.jpg" 
                alt="Mphatso Gama"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML += '<div style="font-size: 5rem; color: var(--text-muted)">👨💻</div>'
                }}
              />
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .stat-card {
          padding: 1rem 1.2rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          transition: border-color 0.3s;
        }
        @media (max-width: 968px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
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
