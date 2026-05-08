import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 40, color = 'var(--accent)' }) {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        border: `3px solid transparent`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        display: 'inline-block'
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  )
}

export function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        padding: '1.5rem',
        borderRadius: '12px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)'
      }}
    >
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          height: '1.5rem',
          background: 'var(--border)',
          borderRadius: '4px',
          marginBottom: '1rem',
          width: '75%'
        }}
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        style={{
          height: '1rem',
          background: 'var(--border)',
          borderRadius: '4px',
          marginBottom: '0.5rem',
          width: '100%'
        }}
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        style={{
          height: '1rem',
          background: 'var(--border)',
          borderRadius: '4px',
          width: '60%'
        }}
      />
    </motion.div>
  )
}

export function SkeletonText({ lines = 3, width = '100%' }) {
  return (
    <div style={{ width }}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          style={{
            height: '1rem',
            background: 'var(--border)',
            borderRadius: '4px',
            marginBottom: '0.5rem',
            width: i === lines - 1 ? '70%' : '100%'
          }}
        />
      ))}
    </div>
  )
}