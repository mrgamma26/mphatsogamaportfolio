import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, MessageCircle, Download, Share2 } from 'lucide-react'
import { generateResumePDF } from '../utils/resumeGenerator'

export default function FloatingIcons() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const sharePortfolio = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mphatso Gama - Portfolio',
          text: 'Check out Mphatso Gama\'s portfolio - ICT Professional & Full-Stack Developer',
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    // You could add a toast notification here
    alert('Portfolio link copied to clipboard!')
  }

  const actions = [
    {
      icon: MessageCircle,
      label: 'Contact',
      action: openContact,
      color: '#10b981'
    },
    {
      icon: Download,
      label: 'Resume',
      action: generateResumePDF,
      color: '#6366f1'
    },
    {
      icon: Share2,
      label: 'Share',
      action: sharePortfolio,
      color: '#f59e0b'
    }
  ]

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      left: '2rem',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      alignItems: 'flex-start'
    }}>
      {/* Action Buttons */}
      <AnimatePresence>
        {isExpanded && actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.8 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 25
              }}
              onClick={action.action}
              whileHover={{ scale: 1.1, x: 8 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: 'none',
                background: action.color,
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                position: 'relative'
              }}
              title={action.label}
            >
              <Icon size={20} />
            </motion.button>
          )
        })}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '1px solid var(--border)',
          background: 'var(--accent)',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
          fontSize: '1.5rem',
          fontWeight: 600
        }}
        title="Quick Actions"
      >
        +
      </motion.button>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
              marginTop: '0.5rem'
            }}
            title="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .floating-icons {
            left: 1rem !important;
            bottom: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}