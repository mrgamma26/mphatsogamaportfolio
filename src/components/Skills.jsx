import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import FadeIn from './FadeIn'

const techStack = [
  { name: 'React', video: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', video: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'PHP', video: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'MySQL', video: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'HTML5', video: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', video: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Git', video: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Node.js', video: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
]

const skills = {
  'Security': { items: ['RBAC', 'HMAC Auth', 'Bcrypt', 'SQL Injection Prevention', 'Prepared Statements'] },
  'Development': { items: ['REST APIs', 'SPA Architecture', 'State Management', 'Responsive Design', 'API Integration'] },
  'Tools': { items: ['Git', 'VS Code', 'Postman', 'Chrome DevTools', 'npm/Composer'] },
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <FadeIn>
        <p style={{ fontSize: '0.78rem', color: '#6366f1', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>Skills</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.75rem', color: '#f0f0f0' }}>
          What I Work With
        </h2>
        <p style={{ color: '#666', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', marginBottom: '3rem', maxWidth: '480px' }}>
          A toolkit built through real projects and hands-on experience.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="tech-grid">
          {techStack.map(({ name, video }, i) => (
            <motion.div 
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.05 }}
              style={{
                padding: '1.5rem 1rem',
                borderRadius: '14px',
                border: '1px solid #222',
                background: '#111',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'default',
              }}
            >
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img 
                  src={video} 
                  alt={name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </motion.div>
              <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)', fontWeight: 600, color: '#d0d0d0', textAlign: 'center' }}>{name}</p>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, { items }], idx) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, borderColor: '#333' }}
              style={{
                padding: '1.5rem',
                borderRadius: '14px',
                border: '1px solid #222',
                background: '#111',
              }}
            >
              <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)', color: '#888', fontWeight: 600, marginBottom: '1rem' }}>{category}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {items.map(skill => (
                  <motion.span 
                    key={skill}
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: '#1a1a1a' }}
                    style={{
                      fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)', padding: '0.4rem 0.8rem',
                      borderRadius: '8px', background: '#0d0d0d',
                      border: '1px solid #1a1a1a', color: '#999',
                    }}
                  >{skill}</motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <style>{`
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 1rem;
          margin-bottom: 3rem;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        
        @media (max-width: 640px) {
          .tech-grid {
            grid-template-columns: repeat(auto-fill, minmax(95px, 1fr));
            gap: 0.75rem;
          }
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </SectionWrapper>
  )
}
