import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

export default function Hero() {
  const { language } = useLanguage()
  const t = translations[language].hero

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 'clamp(5rem, 15vh, 8rem) clamp(1rem, 5vw, 2rem) 4rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 'min(600px, 90vw)', height: 'min(600px, 90vw)',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }} 
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{
          width: 'clamp(120px, 20vw, 180px)',
          height: 'clamp(120px, 20vw, 180px)',
          borderRadius: '50%',
          border: '4px solid var(--border)',
          background: 'var(--bg-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}>
          <img 
            src="/profile.jpg" 
            alt="Mphatso Gama"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML += '<div style="font-size: 4rem; color: var(--text-muted)">👨💻</div>'
            }}
          />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.35rem 1rem', borderRadius: '100px',
          border: '1px solid var(--border)', background: 'var(--bg-card)',
          backdropFilter: 'blur(10px)',
          fontSize: 'clamp(0.7rem, 2vw, 0.78rem)', color: 'var(--text-secondary)',
          marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
          letterSpacing: '0.04em',
        }}
      >
        <motion.span 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} 
        />
        {t.available}
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 'clamp(2rem, 8vw, 5.5rem)',
          fontWeight: 700, lineHeight: 1.05,
          letterSpacing: '-0.04em', color: 'var(--text-primary)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          maxWidth: '90vw',
          wordBreak: 'break-word',
        }}
      >
        {t.title}
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
          color: 'var(--text-secondary)',
          maxWidth: 'min(520px, 90vw)',
          lineHeight: 1.7,
          marginBottom: 'clamp(2rem, 5vw, 2.5rem)',
          fontWeight: 400,
          padding: '0 1rem',
        }}
      >
        {t.subtitle}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex', gap: 'clamp(0.75rem, 2vw, 1rem)',
          flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: 'clamp(2.5rem, 6vw, 3.5rem)',
          padding: '0 1rem',
        }}
      >
        <MagneticButton href="#projects" style={{
          padding: 'clamp(0.7rem, 2vw, 0.85rem) clamp(1.6rem, 4vw, 2rem)',
          borderRadius: '10px',
          background: 'var(--text-primary)', color: 'var(--bg)',
          fontWeight: 600, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
          transition: 'all 0.3s ease',
          border: 'none',
          display: 'inline-block',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
        }}
          onMouseEnter={e => { e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.35)' }}
          onMouseLeave={e => { e.target.style.boxShadow = '0 4px 14px rgba(0,0,0,0.25)' }}
        >{t.viewProjects}</MagneticButton>
        <MagneticButton href="https://mail.google.com/mail/?view=cm&to=mphatsotobiasg@gmail.com&su=Hiring%20Inquiry"
           target="_blank" rel="noreferrer"
           style={{
            padding: 'clamp(0.7rem, 2vw, 0.85rem) clamp(1.6rem, 4vw, 2rem)',
            borderRadius: '10px',
            border: '1px solid var(--border)', color: 'var(--text-primary)',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(10px)',
            fontWeight: 600, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
            transition: 'all 0.3s ease',
            display: 'inline-block',
          }}
          onMouseEnter={e => { e.target.style.borderColor = 'var(--text-muted)' }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--border)' }}
        >{t.getInTouch}</MagneticButton>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', gap: 'clamp(0.8rem, 3vw, 1.2rem)', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {[
          { label: t.github, href: 'https://github.com/mrgamma26' },
          { label: t.email, href: 'mailto:mphatsotobiasg@gmail.com' },
        ].map(({ label, href }) => (
          <MagneticButton key={label} href={href} target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.6rem 1.2rem', borderRadius: '10px',
            border: '1px solid var(--border)', background: 'var(--bg-card)',
            backdropFilter: 'blur(10px)',
            color: 'var(--text-secondary)', transition: 'all 0.3s ease',
            fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
            fontWeight: 500,
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            <span className="link-label">{label}</span>
          </MagneticButton>
        ))}
      </motion.div>

      <motion.a 
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.8 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
        style={{
          position: 'absolute', bottom: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '0.4rem', fontSize: '0.75rem', letterSpacing: '0.08em',
        }}
      >
        ↓
      </motion.a>

      <style>{`
        @media (max-width: 480px) {
          .link-label { display: block; }
        }
      `}</style>
    </section>
  )
}
