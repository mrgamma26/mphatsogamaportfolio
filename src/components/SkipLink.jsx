import { motion } from 'framer-motion'

export default function SkipLink() {
  return (
    <motion.a
      href="#main-content"
      initial={{ y: -100 }}
      whileFocus={{ y: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        zIndex: 9999,
        padding: '0.75rem 1rem',
        background: 'var(--accent)',
        color: 'white',
        borderRadius: '6px',
        fontSize: '0.9rem',
        fontWeight: 600,
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transform: 'translateY(-100px)',
        transition: 'transform 0.2s ease'
      }}
      onFocus={(e) => {
        e.target.style.transform = 'translateY(0)'
      }}
      onBlur={(e) => {
        e.target.style.transform = 'translateY(-100px)'
      }}
    >
      Skip to main content
    </motion.a>
  )
}