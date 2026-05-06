import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 1001,
      display: 'flex',
      gap: '0.5rem',
    }}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(10px)',
          color: 'var(--text-primary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLanguage}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(10px)',
          color: 'var(--text-primary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        {language === 'en' ? 'Chichewa' : 'English'}
      </motion.button>
    </div>
  )
}
