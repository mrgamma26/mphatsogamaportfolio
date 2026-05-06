import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import FadeIn from './FadeIn'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

const projects = [
  {
    name: 'MarketSphere',
    description: 'Full-stack multi-vendor marketplace with normalised MySQL schema, 18-endpoint REST API with HMAC-SHA256 auth, and SQL injection prevention.',
    stack: ['React 18', 'PHP 8.1', 'MySQL', 'HMAC Auth', 'REST API', 'RBAC'],
    github: 'https://github.com/mrgamma26/marketsphere',
    featured: true,
  },
  {
    name: 'FlowDesk Service',
    description: 'Reporting system for service desk operations with incident tracking and performance analytics.',
    stack: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/mrgamma26/-FlowDesk-Service',
    featured: false,
  },
  {
    name: 'InsightIQ Analytics',
    description: 'Data analytics platform for business intelligence and insights visualization.',
    stack: ['React', 'Python', 'PostgreSQL'],
    github: 'https://github.com/mrgamma26/insightiq-analytics',
    featured: false,
  },
]

export default function Projects() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const t = translations[language].projects

  return (
    <SectionWrapper id="projects">
      <FadeIn>
        <p style={{ fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>{t.label}</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          {t.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', marginBottom: '3rem', maxWidth: '480px' }}>
          {t.subtitle}
        </p>
      </FadeIn>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {projects.map((project, i) => (
          <FadeIn key={i} delay={i * 0.12} direction="up">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                display: 'block',
                padding: 'clamp(2rem, 5vw, 2.5rem)',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                backdropFilter: theme === 'light' ? 'blur(10px)' : 'none',
                position: 'relative',
                textDecoration: 'none',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-muted)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              {project.featured && (
                <span style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  fontSize: '0.7rem',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '100px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                }}>Featured</span>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.02em'
                }}>{project.name}</h3>
                <p style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  maxWidth: '800px'
                }}>{project.description}</p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {project.stack.map(tech => (
                  <span
                    key={tech}
                    style={{
                      fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)',
                      padding: '0.4rem 0.9rem',
                      borderRadius: '8px',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                    }}
                  >{tech}</span>
                ))}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: 'clamp(0.8rem, 2vw, 0.85rem)',
                color: 'var(--text-muted)',
                fontWeight: 500,
              }}>
                <span>{t.viewProject}</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >→</motion.span>
              </div>
            </motion.a>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  )
}
