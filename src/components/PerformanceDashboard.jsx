import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, X, Zap, Clock, Eye } from 'lucide-react'
import { performanceMonitor } from '../utils/performance'

export default function PerformanceDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [metrics, setMetrics] = useState({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true)
    }

    const updateMetrics = () => {
      const allMetrics = performanceMonitor.getAllMetrics()
      const navigation = performanceMonitor.getNavigationTiming()
      const resources = performanceMonitor.getResourceTimings()
      
      setMetrics({
        ...allMetrics,
        navigation,
        resourceCount: resources.length,
        totalResourceSize: resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0)
      })
    }

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000)
    updateMetrics()

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatTime = (ms) => {
    if (ms < 1000) return `${Math.round(ms)}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  const getScoreColor = (score) => {
    if (score >= 90) return '#10b981' // Green
    if (score >= 50) return '#f59e0b' // Orange
    return '#ef4444' // Red
  }

  const getMetricScore = (name, value) => {
    const thresholds = {
      'CLS': { good: 0.1, poor: 0.25 },
      'FID': { good: 100, poor: 300 },
      'LCP': { good: 2500, poor: 4000 },
      'FCP': { good: 1800, poor: 3000 },
      'TTFB': { good: 800, poor: 1800 }
    }

    const threshold = thresholds[name]
    if (!threshold) return 75

    if (value <= threshold.good) return 95
    if (value <= threshold.poor) return 65
    return 25
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 100,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(10px)',
          color: 'var(--accent)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
        title="Performance Dashboard"
      >
        <Activity size={20} />
      </motion.button>

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

            {/* Dashboard Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed',
                bottom: '5rem',
                right: '2rem',
                zIndex: 99,
                width: '400px',
                maxHeight: '500px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                backdropFilter: 'blur(20px)',
                overflowY: 'auto'
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Activity size={20} style={{ color: 'var(--accent)' }} />
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: 0
                  }}>
                    Performance
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '0.25rem'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Core Web Vitals */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Zap size={16} />
                  Core Web Vitals
                </h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {['CLS', 'FID', 'LCP', 'FCP', 'TTFB'].map(metric => {
                    const value = metrics[metric]
                    if (!value) return null
                    
                    const score = getMetricScore(metric, value)
                    const color = getScoreColor(score)
                    
                    return (
                      <div key={metric} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem',
                        background: 'var(--bg)',
                        borderRadius: '8px',
                        border: '1px solid var(--border)'
                      }}>
                        <div>
                          <div style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)'
                          }}>
                            {metric}
                          </div>
                          <div style={{
                            fontSize: '0.7rem',
                            color: 'var(--text-muted)'
                          }}>
                            {metric === 'CLS' ? value.toFixed(3) : formatTime(value)}
                          </div>
                        </div>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: `conic-gradient(${color} ${score * 3.6}deg, var(--border) 0deg)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: 'var(--bg-card)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color
                          }}>
                            {score}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Resource Stats */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Eye size={16} />
                  Resources
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    padding: '0.75rem',
                    background: 'var(--bg)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--accent)'
                    }}>
                      {metrics.resourceCount || 0}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)'
                    }}>
                      Resources
                    </div>
                  </div>
                  <div style={{
                    padding: '0.75rem',
                    background: 'var(--bg)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--accent)'
                    }}>
                      {formatBytes(metrics.totalResourceSize || 0)}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)'
                    }}>
                      Total Size
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Metrics */}
              {metrics['app-load-time'] && (
                <div>
                  <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Clock size={16} />
                    App Metrics
                  </h4>
                  <div style={{
                    padding: '0.75rem',
                    background: 'var(--bg)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)'
                      }}>
                        App Load Time
                      </span>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}>
                        {formatTime(metrics['app-load-time'])}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                textAlign: 'center'
              }}>
                Development Mode Only
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .performance-dashboard {
            right: 1rem !important;
            width: calc(100vw - 2rem) !important;
            max-width: 400px !important;
          }
        }
      `}</style>
    </>
  )
}