import SectionWrapper from './SectionWrapper'
import ContactForm from './ContactForm'
import ScrollReveal from './ScrollReveal'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import { generateResumePDF, generateCoverLetter } from '../utils/resumeGenerator'
import { Download, FileText, Mail, Phone, MapPin, GitBranch } from 'lucide-react'

const GMAIL = 'https://mail.google.com/mail/?view=cm&to=mphatsotobiasg@gmail.com&su=Hiring%20Inquiry'

const contacts = [
  { 
    label: 'Email', 
    value: 'mphatsotobiasg@gmail.com', 
    href: GMAIL,
    icon: Mail,
    color: '#ea4335'
  },
  { 
    label: 'Phone', 
    value: '+265 994 310 305', 
    href: 'tel:+265994310305',
    icon: Phone,
    color: '#34a853'
  },
  { 
    label: 'Location', 
    value: 'Blantyre, Malawi', 
    href: null,
    icon: MapPin,
    color: '#fbbc04'
  },
  { 
    label: 'GitHub', 
    value: 'github.com/mrgamma26', 
    href: 'https://github.com/mrgamma26',
    icon: GitBranch,
    color: '#333'
  },
]

export default function Contact() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const t = translations[language].contact

  const handleDownloadResume = () => {
    generateResumePDF()
  }

  const handleDownloadCoverLetter = () => {
    const jobTitle = prompt('Enter job title (optional):', 'Software Developer')
    const company = prompt('Enter company name (optional):', 'Your Company')
    generateCoverLetter(jobTitle || 'Software Developer', company || 'Your Company')
  }

  return (
    <SectionWrapper id="contact">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2rem)' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
              marginBottom: '1rem', 
              color: 'var(--text-primary)' 
            }}>
              {t.title}
            </h2>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.1rem', 
              lineHeight: 1.7, 
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '4rem',
          alignItems: 'start'
        }}
        className="contact-grid"
        >
          {/* Contact Information */}
          <ScrollReveal direction="left">
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: 'var(--text-primary)'
              }}>
                Get In Touch
              </h3>
              
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}>
                Ready to discuss your next project or explore opportunities? 
                I'm always open to interesting conversations and collaborations.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {contacts.map(({ label, value, href, icon: Icon, color }) => (
                  <motion.div
                    key={label}
                    whileHover={href ? { scale: 1.02, x: 8 } : {}}
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-card)',
                      backdropFilter: theme === 'light' ? 'blur(10px)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      cursor: href ? 'pointer' : 'default',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => href && window.open(href, '_blank')}
                    onMouseEnter={e => href && (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `${color}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: 'var(--text-muted)', 
                        fontWeight: 500,
                        marginBottom: '0.25rem'
                      }}>
                        {label}
                      </div>
                      <div style={{ 
                        fontSize: '0.9rem', 
                        color: 'var(--text-primary)', 
                        fontWeight: 600 
                      }}>
                        {value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Download Actions */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <motion.button
                  onClick={handleDownloadResume}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    border: '1px solid var(--accent)',
                    background: 'var(--accent)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  <Download size={18} />
                  Download Resume (PDF)
                </motion.button>

                <motion.button
                  onClick={handleDownloadCoverLetter}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  <FileText size={18} />
                  Generate Cover Letter
                </motion.button>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right">
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </SectionWrapper>
  )
}
