import SectionWrapper from './SectionWrapper'
import FadeIn from './FadeIn'

const experience = [
  {
    role: 'Full-Stack Developer',
    company: 'Freelance',
    location: 'Remote',
    period: '2023 – Present',
    points: [
      'Developed secure, scalable web applications using React, PHP, and MySQL with focus on authentication and data protection.',
      'Implemented REST APIs with HMAC-SHA256 authentication and role-based access control for multi-user platforms.',
      'Built responsive SPAs with modern state management patterns and optimized performance.',
      'Designed normalized database schemas and implemented SQL injection prevention through prepared statements.',
    ],
  },
]

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <FadeIn>
        <p style={{ fontSize: '0.78rem', color: '#6366f1', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>Experience</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '3rem', color: '#f0f0f0' }}>
          Where I've Worked
        </h2>
      </FadeIn>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {experience.map((job, i) => (
          <FadeIn key={i} delay={i * 0.15} direction="up">
            <div style={{
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              borderRadius: '14px',
              border: '1px solid #1e1e1e',
              background: '#111',
              transition: 'border-color 0.2s, transform 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', fontWeight: 600, color: '#f0f0f0', marginBottom: '0.25rem' }}>{job.role}</h3>
                  <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)', color: '#666' }}>{job.company} · {job.location}</p>
                </div>
                <span style={{
                  fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)',
                  padding: '0.3rem 0.9rem',
                  borderRadius: '100px',
                  border: '1px solid #2a2a2a',
                  background: '#1a1a1a',
                  color: '#777',
                  whiteSpace: 'nowrap',
                }}>{job.period}</span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {job.points.map((point, j) => (
                  <li key={j} style={{ display: 'flex', gap: '0.75rem', fontSize: 'clamp(0.82rem, 2vw, 0.88rem)', color: '#777', lineHeight: 1.7 }}>
                    <span style={{
                      flexShrink: 0, marginTop: '0.6rem',
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: '#555', display: 'inline-block',
                    }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  )
}
