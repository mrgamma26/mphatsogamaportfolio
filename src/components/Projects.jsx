import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import FadeIn from './FadeIn'

const projects = [
  {
    name: 'MarketSphere Commerce Platform',
    description: 'Full-stack multi-vendor marketplace with a normalised MySQL schema, 18-endpoint REST API with HMAC-SHA256 auth, and SQL injection prevention via prepared statements.',
    stack: ['React 18', 'PHP 8.1', 'MySQL', 'HMAC Auth', 'REST API', 'RBAC'],
    points: [
      'React 18 SPA with Context API global state, custom hooks, and role-based access control across Buyer, Vendor, and Admin journeys.',
      'Modular payment and notification service layer; horizontally scalable architecture with documented caching and load-balancing strategy.',
    ],
    github: 'https://github.com/mrgamma26/marketsphere',
    featured: true,
  },
  {
    name: 'FlowDesk Service',
    description: 'Reporting system for service desk operations with incident tracking and performance analytics.',
    stack: ['React', 'Node.js', 'MongoDB'],
    points: [
      'Comprehensive incident tracking and reporting dashboard.',
      'Real-time analytics for service desk performance metrics.',
    ],
    github: 'https://github.com/mrgamma26/-FlowDesk-Service',
    featured: false,
  },
  {
    name: 'InsightIQ Analytics',
    description: 'Data analytics platform for business intelligence and insights visualization.',
    stack: ['React', 'Python', 'PostgreSQL'],
    points: [
      'Interactive data visualization and reporting tools.',
      'Advanced analytics engine for business metrics.',
    ],
    github: 'https://github.com/mrgamma26/insightiq-analytics',
    featured: false,
  },
]

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <FadeIn>
        <p style={{ fontSize: '0.78rem', color: '#6366f1', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>Projects</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.75rem', color: '#f0f0f0' }}>
          Things I've Built
        </h2>
        <p style={{ color: '#666', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', marginBottom: '3rem', maxWidth: '480px' }}>
          Real-world projects demonstrating full-stack capability and security-first thinking.
        </p>
      </FadeIn>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project, i) => (
          <FadeIn key={i} delay={i * 0.12} direction="up">
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                padding: 'clamp(1.5rem, 4vw, 1.8rem)',
                borderRadius: '14px',
                border: '1px solid #222',
                background: '#111',
                display: 'flex', flexDirection: 'column', gap: '1rem',
                position: 'relative', height: '100%',
                cursor: 'default',
              }}
            >
              {project.featured && (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    position: 'absolute', top: '1.2rem', right: '1.2rem',
                    fontSize: '0.68rem', padding: '0.3rem 0.8rem',
                    borderRadius: '100px', border: '1px solid #333',
                    background: '#1a1a1a', color: '#888',
                    letterSpacing: '0.06em', fontWeight: 600,
                  }}
                >Featured</motion.span>
              )}

              <div>
                <h3 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1rem)', fontWeight: 600, color: '#f0f0f0', marginBottom: '0.5rem' }}>{project.name}</h3>
                <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)', color: '#666', lineHeight: 1.7 }}>{project.description}</p>
              </div>

              {project.points.length > 0 && (
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {project.points.map((p, j) => (
                    <li key={j} style={{
                      fontSize: 'clamp(0.78rem, 2vw, 0.82rem)', color: '#666', lineHeight: 1.6,
                      paddingLeft: '0.9rem', borderLeft: '2px solid #333',
                    }}>{p}</li>
                  ))}
                </ul>
              )}

              {project.stack.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.stack.map(tech => (
                    <motion.span 
                      key={tech}
                      whileHover={{ scale: 1.1, y: -2 }}
                      style={{
                        fontSize: 'clamp(0.68rem, 1.8vw, 0.72rem)', padding: '0.3rem 0.7rem',
                        borderRadius: '6px', background: '#0d0d0d',
                        border: '1px solid #1a1a1a', color: '#888',
                      }}
                    >{tech}</motion.span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                <motion.a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer"
                  whileHover={{ x: 5 }}
                  style={{
                    display: 'inline-block',
                    fontSize: 'clamp(0.75rem, 2vw, 0.8rem)', 
                    color: '#666', 
                    transition: 'color 0.2s',
                    fontWeight: 500,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f0f0f0'}
                  onMouseLeave={e => e.currentTarget.style.color = '#666'}
                >
                  View on GitHub →
                </motion.a>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  )
}
