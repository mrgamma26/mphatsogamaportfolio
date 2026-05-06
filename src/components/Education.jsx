import SectionWrapper from './SectionWrapper'
import FadeIn from './FadeIn'

const education = [
  { degree: 'BSc (Honours) – Computer Science', institution: 'NACIT', location: 'Blantyre', period: '2024 – 2025' },
  { degree: 'Advanced Diploma in Computing', institution: 'NACIT', location: 'Blantyre', period: '2023 – 2024' },
  { degree: 'Diploma in Computing', institution: 'NACIT', location: 'Blantyre', period: '2021 – 2023' },
  { degree: 'Malawi School Certificate of Education (MSCE)', institution: 'Pact Secondary School', location: 'Limbe', period: '2017 – 2019' },
]

export default function Education() {
  return (
    <SectionWrapper id="education">
      <FadeIn>
      <p style={{ fontSize: '0.78rem', color: '#6366f1', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>Education</p>
      <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '3rem', color: '#f0f0f0' }}>
        Academic Background
      </h2>
      </FadeIn>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid #1e1e1e', borderRadius: '12px', overflow: 'hidden' }}>
        {education.map((edu, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '0.5rem',
            padding: '1.4rem 1.8rem',
            background: '#111',
            borderBottom: i < education.length - 1 ? '1px solid #1a1a1a' : 'none',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#141414'}
            onMouseLeave={e => e.currentTarget.style.background = '#111'}
          >
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e0e0e0', marginBottom: '0.2rem' }}>{edu.degree}</h3>
              <p style={{ fontSize: '0.82rem', color: '#666' }}>{edu.institution} · {edu.location}</p>
            </div>
            <span style={{
              fontSize: '0.75rem', padding: '0.3rem 0.8rem',
              borderRadius: '100px', border: '1px solid #2a2a2a',
              background: '#1a1a1a', color: '#777',
            }}>{edu.period}</span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
