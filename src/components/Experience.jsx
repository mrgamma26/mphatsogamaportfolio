import SectionWrapper from './SectionWrapper'
import FadeIn from './FadeIn'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

const experience = [
  {
    role: { en: 'Full-Stack Developer', ny: 'Full-Stack Developer' },
    company: { en: 'Freelance', ny: 'Freelance' },
    location: { en: 'Remote', ny: 'Kutali' },
    period: { en: '2023 – Present', ny: '2023 – Pano' },
    current: true,
    type: 'dev',
    points: [
      { en: 'Developed 3 production web applications using React, PHP, and MySQL serving 200+ users with 99.5% uptime', ny: 'Ndapanga mapulogalamu atatu ogwiritsidwa ntchito ndi anthu 200+ ndi 99.5% uptime' },
      { en: 'Implemented HMAC-SHA256 authentication reducing unauthorized access attempts by 100%', ny: 'Ndinakonza chitetezo cha HMAC-SHA256 choletsa anthu osaloledwa 100%' },
      { en: 'Built responsive SPAs with React improving mobile user engagement by 40%', ny: 'Ndapanga mapulogalamu a React omwe amawonjezera kugwiritsa ntchito pa foni ndi 40%' },
      { en: 'Designed normalized database schemas preventing SQL injection through prepared statements', ny: 'Ndinapanga database yotetezeka yoletsa SQL injection' }
    ],
    skills: ['React', 'PHP', 'MySQL', 'REST API', 'Authentication', 'Security']
  }
]

export default function Experience() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const t = translations[language]

  const typeColors = {
    dev: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#60a5fa' },
    ops: { bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)', text: '#c084fc' },
    analysis: { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.3)', text: '#fbbf24' }
  }

  return (
    <SectionWrapper id="experience">
      <FadeIn>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <p style={{ fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>{t.experience.label}</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              {t.experience.title}
            </h2>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>{experience.length} {language === 'en' ? 'role' : 'ntchito'}{experience.length > 1 ? 's' : ''}</span>
        </div>
      </FadeIn>

      <div style={{ position: 'relative', paddingLeft: 'clamp(2rem, 5vw, 3rem)' }}>
        <div style={{
          position: 'absolute',
          left: '0.625rem',
          top: '0.5rem',
          bottom: '0.5rem',
          width: '2px',
          background: theme === 'dark' ? '#1e1e1e' : '#e5e5e5'
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {experience.map((job, i) => {
            const colors = typeColors[job.type]
            return (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: 'calc(-1 * clamp(2rem, 5vw, 3rem) + 0.625rem)',
                    top: '0.5rem',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: job.current ? '#10b981' : (theme === 'dark' ? '#333' : '#d4d4d4'),
                    border: `2px solid ${theme === 'dark' ? '#0a0a0a' : '#ffffff'}`,
                    zIndex: 1
                  }} />

                  <div style={{
                    padding: 'clamp(1.25rem, 3vw, 1.5rem)',
                    borderRadius: '12px',
                    border: `1px solid ${theme === 'dark' ? '#1e1e1e' : '#e5e5e5'}`,
                    background: theme === 'dark' ? '#111' : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: theme === 'light' ? 'blur(10px)' : 'none',
                    transition: 'border-color 0.2s, transform 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = theme === 'dark' ? '#333' : '#d4d4d4'; e.currentTarget.style.transform = 'translateX(4px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = theme === 'dark' ? '#1e1e1e' : '#e5e5e5'; e.currentTarget.style.transform = 'translateX(0)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <h3 style={{ fontSize: '0.94rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.35rem', letterSpacing: '-0.01em' }}>
                          {job.role[language]}
                        </h3>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                          {job.company[language]} · {job.location[language]}
                        </p>
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '100px',
                        background: job.current ? 'rgba(16, 185, 129, 0.1)' : (theme === 'dark' ? '#1a1a1a' : '#f5f5f5'),
                        color: job.current ? '#10b981' : 'var(--text-tertiary)',
                        border: `1px solid ${job.current ? 'rgba(16, 185, 129, 0.2)' : (theme === 'dark' ? '#2a2a2a' : '#e5e5e5')}`,
                        whiteSpace: 'nowrap',
                        fontWeight: 500
                      }}>
                        {job.period[language]}
                      </span>
                    </div>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                      {job.points.map((point, j) => (
                        <li key={j} style={{ display: 'flex', gap: '0.65rem', fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                          <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.35rem' }}>▸</span>
                          {point[language]}
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {job.skills.map((skill, k) => (
                        <span key={k} style={{
                          fontSize: '0.75rem',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '6px',
                          background: colors.bg,
                          color: colors.text,
                          border: `1px solid ${colors.border}`,
                          fontWeight: 500
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
