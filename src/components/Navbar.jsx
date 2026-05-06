import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton'

const links = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [0, 1])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  return (
    <>
      <motion.nav 
        style={{ opacity }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="navbar"
      >
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 clamp(1rem, 5vw, 2rem)',
          background: scrolled ? 'rgba(10,10,10,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '64px',
        }}>
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{
            display: 'none', background: 'none', border: 'none',
            color: '#f0f0f0', padding: '0.5rem',
          }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div style={{ display: 'none', gap: '2rem', flex: 1, justifyContent: 'center' }} className="nav-desktop">
            {links.map((l, i) => (
              <motion.a 
                key={l} 
                href={`#${l.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  fontSize: '0.85rem', color: '#888', fontWeight: 500,
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => e.target.style.color = '#f0f0f0'}
                onMouseLeave={e => e.target.style.color = '#888'}
              >{l}</motion.a>
            ))}
          </div>

          <motion.a 
            href="#" 
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#f0f0f0',
            }}
          >
            MG
          </motion.a>

          <MagneticButton 
            href="https://mail.google.com/mail/?view=cm&to=mphatsotobiasg@gmail.com&su=Hiring%20Inquiry" 
            target="_blank" 
            rel="noreferrer" 
            className="hire-btn"
            style={{
              fontSize: '0.8rem', fontWeight: 600, padding: '0.5rem 1.2rem',
              border: '1px solid #333', borderRadius: '6px', color: '#f0f0f0',
              transition: 'all 0.3s ease', whiteSpace: 'nowrap',
              background: 'transparent',
            }}
            onMouseEnter={e => { e.target.style.background = '#f0f0f0'; e.target.style.color = '#0a0a0a'; e.target.style.borderColor = '#f0f0f0' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#f0f0f0'; e.target.style.borderColor = '#333' }}
          >
            Hire Me
          </MagneticButton>
        </div>
      </motion.nav>

      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: menuOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0,
          background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)',
          zIndex: 99, padding: '2rem',
          overflowY: 'auto',
        }} 
        className="mobile-menu"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {links.map((l, i) => (
            <motion.a 
              key={l} 
              href={`#${l.toLowerCase()}`} 
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -50 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{
                fontSize: '1.5rem', color: '#888', fontWeight: 600,
                transition: 'color 0.3s ease', padding: '0.5rem 0',
                borderBottom: '1px solid #1a1a1a',
              }}
              onMouseEnter={e => e.target.style.color = '#f0f0f0'}
              onMouseLeave={e => e.target.style.color = '#888'}
            >{l}</motion.a>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
          .logo { margin-left: auto; }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: flex !important; }
          .hire-btn { display: none !important; }
          .logo { position: absolute; left: 50%; transform: translateX(-50%); }
        }
      `}</style>
    </>
  )
}
