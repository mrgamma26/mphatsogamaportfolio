import SectionWrapper from './SectionWrapper'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import { MapPin, GraduationCap, Code, Briefcase, Award, Calendar } from 'lucide-react'

export default function About() {
  const { language } = useLanguage()
  const t = translations[language].about

  const stats = [
    { 
      label: t.location, 
      value: t.locationValue, 
      icon: MapPin, 
      color: '#ef4444',
      description: 'Based in the commercial capital of Malawi'
    },
    { 
      label: t.degree, 
      value: t.degreeValue, 
      icon: GraduationCap, 
      color: '#8b5cf6',
      description: 'Honours degree in Computer Science'
    },
    { 
      label: t.focus, 
      value: t.focusValue, 
      icon: Code, 
      color: '#06b6d4',
      description: 'Full-stack development and ICT solutions'
    },
    { 
      label: t.status, 
      value: t.statusValue, 
      icon: Briefcase, 
      color: '#10b981',
      description: 'Available for immediate opportunities'
    },
  ]

  const achievements = [
    { icon: Award, label: 'BSc Honours', value: 'Computer Science' },
    { icon: Calendar, label: 'Experience', value: '3+ Years' },
    { icon: Code, label: 'Projects', value: '15+ Completed' }
  ]

  return (
    <SectionWrapper id="about">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ 
              fontSize: '0.78rem', 
              color: 'var(--accent)', 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase', 
              marginBottom: '1rem', 
              fontWeight: 600,
              display: 'block'
            }}>
              {t.label}
            </span>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              fontWeight: 700, 
              letterSpacing: '-0.03em', 
              lineHeight: 1.15, 
              marginBottom: '1.5rem', 
              color: 'var(--text-primary)' 
            }}>
              {t.title}
            </h2>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
          marginBottom: '4rem'
        }}
        className="about-grid"
        >
          <ScrollReveal direction="left">
            <div>
              <p style={{ 
                color: 'var(--text-secondary)', 
                lineHeight: 1.8, 
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', 
                marginBottom: '1.5rem'
              }}>
                {t.description1}
              </p>
              <p style={{ 
                color: 'var(--text-secondary)', 
                lineHeight: 1.8, 
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', 
                marginBottom: '2rem'
              }}>
                {t.description2}
              </p>

              {/* Quick achievements */}
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap'
              }}>
                {achievements.map(({ icon: Icon, label, value }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: 'var(--accent)11',
                      borderRadius: '25px',
                      border: '1px solid var(--accent)33'
                    }}
                  >
                    <Icon size={16} style={{ color: 'var(--accent)' }} />
                    <div>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--text-muted)',
                        fontWeight: 500
                      }}>
                        {label}
                      </div>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: 'var(--text-primary)',
                        fontWeight: 600
                      }}>
                        {value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div style={{
              position: 'relative',
              padding: '2rem',
              background: 'linear-gradient(135deg, var(--accent)11, var(--accent-2)11)',
              borderRadius: '20px',
              border: '1px solid var(--accent)22'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '40px',
                height: '40px',
                background: 'var(--accent)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
              }}>
                💡
              </div>
              
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>
                What I Bring
              </h3>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {[
                  'Full-stack web development expertise',
                  'Secure database design & optimization',
                  'Modern React & PHP applications',
                  'ICT support & system administration',
                  'Cloud deployment & DevOps practices'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: 'var(--accent)',
                      borderRadius: '50%',
                      flexShrink: 0
                    }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats Grid */}
        <StaggerContainer className="stats-grid">
          {stats.map(({ label, value, icon: Icon, color, description }, index) => (
            <StaggerItem key={label}>
              <motion.div 
                className="stat-card"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '60px',
                  height: '60px',
                  background: `${color}22`,
                  borderRadius: '50%',
                  opacity: 0.5
                }} />
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: `${color}22`,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <p style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--text-muted)', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em', 
                      marginBottom: '0.25rem', 
                      fontWeight: 600 
                    }}>
                      {label}
                    </p>
                    <p style={{ 
                      fontSize: '1rem', 
                      color: 'var(--text-primary)', 
                      fontWeight: 700,
                      lineHeight: 1.2
                    }}>
                      {value}
                    </p>
                  </div>
                </div>
                
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                  margin: 0
                }}>
                  {description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </SectionWrapper>
  )
}
