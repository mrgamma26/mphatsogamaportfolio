import { Component } from 'react'
import { motion } from 'framer-motion'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            background: 'var(--bg)',
            color: 'var(--text-primary)'
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}
          >
            😵
          </motion.div>
          
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            marginBottom: '1rem',
            color: 'var(--text-primary)'
          }}>
            Oops! Something went wrong
          </h2>
          
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '500px',
            lineHeight: 1.6
          }}>
            We encountered an unexpected error. Don't worry, this has been logged and we'll look into it.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Try Again
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Reload Page
            </motion.button>
          </div>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'var(--bg-card)',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              maxWidth: '600px',
              width: '100%'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, marginBottom: '0.5rem' }}>
                Error Details (Development)
              </summary>
              <pre style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                overflow: 'auto',
                whiteSpace: 'pre-wrap'
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </motion.div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary