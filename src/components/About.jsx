import SectionWrapper from './SectionWrapper'
import FadeIn from './FadeIn'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="about-grid">
        <FadeIn direction="left">
          <p style={{ fontSize: '0.78rem', color: '#6366f1', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>About Me</p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.5rem', color: '#f0f0f0' }}>
            ICT Professional & Developer
          </h2>
          <p style={{ color: '#777', lineHeight: 1.8, fontSize: 'clamp(0.88rem, 2vw, 0.95rem)', marginBottom: '1rem' }}>
            I'm an ICT professional with a BSc (Honours) in Computer Science and hands-on experience in service desk coordination, full-stack development, and systems analysis.
          </p>
          <p style={{ color: '#777', lineHeight: 1.8, fontSize: 'clamp(0.88rem, 2vw, 0.95rem)', marginBottom: '2rem' }}>
            Skilled in incident management, SLA compliance, stakeholder communication, and building secure digital solutions. Eager to contribute to ICT operations, systems support, or digital transformation roles in banking, financial services, or insurance.
          </p>

          <div className="stats-grid">
            {[
              { label: 'Location', value: 'Blantyre, Malawi' },
              { label: 'Degree', value: 'BSc (Hons) CS' },
              { label: 'Focus', value: 'Full-Stack & ICT' },
              { label: 'Status', value: 'Open to Work' },
            ].map(({ label, value }) => (
              <motion.div 
                key={label} 
                className="stat-card"
                whileHover={{ y: -3, borderColor: '#333' }}
              >
                <p style={{ fontSize: '0.7rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem', fontWeight: 600 }}>{label}</p>
                <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)', color: '#d0d0d0', fontWeight: 500 }}>{value}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.2}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <div style={{
              width: '100%',
              maxWidth: '300px',
              aspectRatio: '1',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)',
              border: '1px solid #222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p style={{ fontSize: '4rem', opacity: 0.3 }}>👨‍💻</p>
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
          border: 1px solid #222;
          background: #111;
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
