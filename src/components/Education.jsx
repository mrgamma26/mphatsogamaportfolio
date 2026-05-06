import SectionWrapper from './SectionWrapper'
import FadeIn from './FadeIn'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

const education = [
  { degree: 'BSc (Honours) – Computer Science', institution: 'NACIT', location: 'Blantyre', period: '2024 – 2025' },
  { degree: 'Advanced Diploma in Computing', institution: 'NACIT', location: 'Blantyre', period: '2023 – 2024' },
  { degree: 'Diploma in Computing', institution: 'NACIT', location: 'Blantyre', period: '2021 – 2023' },
  { degree: 'Malawi School Certificate of Education (MSCE)', institution: 'Pact Secondary School', location: 'Limbe', period: '2017 – 2019' },
]

export default function Education() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const t = translations[language].education

  return (
    <SectionWrapper id="education">
      <FadeIn>
        <p style={{ fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>{t.label}</p>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '3rem', color: 'var(--text-primary)' }}>
          {t.title}
        </h2>
      </FadeIn>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
        {education.map((edu, i) => (
          <FadeIn key={i} delay={i * 0.08} direction="up">
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: '0.5rem',
              padding: '1.4rem 1.8rem',
              background: 'var(--bg-card)',
              backdropFilter: theme === 'light' ? 'blur(10px)' : 'none',
              borderBottom: i < education.length - 1 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = theme === 'dark' ? '#141414' : 'rgba(255,255,255,0.9)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
            >
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{edu.degree}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{edu.institution} · {edu.location}</p>
              </div>
              <span style={{
                fontSize: '0.75rem', padding: '0.3rem 0.8rem',
                borderRadius: '100px', border: '1px solid var(--border)',
                background: 'var(--bg)', color: 'var(--text-muted)',
              }}>{edu.period}</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  )
}
