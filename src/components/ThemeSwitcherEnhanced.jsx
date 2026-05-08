import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor, Settings, Languages, Globe } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const themes = [
  { key: 'dark', label: 'Dark', icon: Moon },
  { key: 'light', label: 'Light', icon: Sun },
  { key: 'auto', label: 'Auto', icon: Monitor }
]

const languages = [
  { key: 'en', label: 'English', flag: '🇺🇸' },
  { key: 'ny', label: 'Chichewa', flag: '🇲🇼' }
]

const accentColors = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Rose', value: '#f43f5e' }
]

export default function ThemeSwitcherEnhanced() {
  const { theme, language, setLanguage } = useAppStore()
  const [isOpen, setIsOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(theme)
  const [accentColor, setAccentColor] = useState('#6366f1')
  const [autoTheme, setAutoTheme] = useState('dark')

  // Auto theme detection
  useEffect(() => {
    if (currentTheme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e) => {
        const newTheme = e.matches ? 'dark' : 'light'
        setAutoTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
      }
      
      handleChange(mediaQuery)
      mediaQuery.addEventListener('change', handleChange)
      
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      document.documentElement.setAttribute('data-theme', currentTheme)
    }
  }, [currentTheme])

  // Apply accent color
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accentColor)
    localStorage.setItem('accent-color', accentColor)
  }, [accentColor])

  // Load saved accent color
  useEffect(() => {
    const savedAccent = localStorage.getItem('accent-color')
    if (savedAccent) {
      setAccentColor(savedAccent)
    }
  }, [])

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang)
  }

  const getCurrentIcon = () => {
    if (currentTheme === 'auto') {
      return autoTheme === 'dark' ? Moon : Sun
    }
    const themeObj = themes.find(t => t.key === currentTheme)
    return themeObj ? themeObj.icon : Moon
  }

  const CurrentIcon = getCurrentIcon()
  const currentLanguageFlag = languages.find(l => l.key === language)?.flag || '🇺🇸'

  return (
    <>
      {/* Mobile-optimized floating buttons */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '1rem',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {/* Language Switcher Button */}
        <motion.button
          onClick={() => handleLanguageChange(language === 'en' ? 'ny' : 'en')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(10px)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            fontSize: '1.2rem'
          }}
          aria-label={`Switch to ${language === 'en' ? 'Chichewa' : 'English'}`}
          title={`Switch to ${language === 'en' ? 'Chichewa' : 'English'}`}
        >
          {currentLanguageFlag}
        </motion.button>

        {/* Theme Settings Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(10px)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
          aria-label="Theme settings"
        >
          <CurrentIcon size={20} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 98,
                background: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(2px)'
              }}
            />

            {/* Theme Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="theme-switcher-panel"
              style={{
                position: 'fixed',
                bottom: '8rem',
                right: '1rem',
                zIndex: 99,
                width: '320px',
                maxWidth: 'calc(100vw - 2rem)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--border)'
              }}>
                <Settings size={20} style={{ color: 'var(--accent)' }} />
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: 0
                }}>
                  Theme Settings
                </h3>
              </div>

              {/* Language Selection */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}>
                  Language
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem'
                }}>
                  {languages.map(lang => {
                    const isActive = language === lang.key
                    
                    return (
                      <motion.button
                        key={lang.key}
                        onClick={() => handleLanguageChange(lang.key)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                          background: isActive ? 'var(--accent)22' : 'transparent',
                          color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '1rem' }}>{lang.flag}</span>
                        {lang.label}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Theme Selection */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}>
                  Appearance
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem'
                }}>
                  {themes.map(themeOption => {
                    const Icon = themeOption.icon
                    const isActive = currentTheme === themeOption.key
                    
                    return (
                      <motion.button
                        key={themeOption.key}
                        onClick={() => handleThemeChange(themeOption.key)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                          background: isActive ? 'var(--accent)22' : 'transparent',
                          color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Icon size={16} />
                        {themeOption.label}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Accent Color Selection */}
              <div>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}>
                  Accent Color
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: '0.5rem'
                }}>
                  {accentColors.map(color => (
                    <motion.button
                      key={color.value}
                      onClick={() => setAccentColor(color.value)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: accentColor === color.value ? '2px solid var(--text-primary)' : '2px solid transparent',
                        background: color.value,
                        cursor: 'pointer',
                        position: 'relative',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      title={color.name}
                    >
                      {accentColor === color.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{
                            position: 'absolute',
                            inset: '6px',
                            borderRadius: '50%',
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: color.value
                          }} />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border)'
              }}>
                <motion.button
                  onClick={() => {
                    setCurrentTheme('dark')
                    setAccentColor('#6366f1')
                    localStorage.setItem('theme', 'dark')
                    localStorage.setItem('accent-color', '#6366f1')
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 500
                  }}
                >
                  Reset to Default
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .theme-switcher-panel {
            right: 1rem !important;
            width: calc(100vw - 2rem) !important;
            max-width: 280px !important;
          }
        }
      `}</style>
    </>
  )
}