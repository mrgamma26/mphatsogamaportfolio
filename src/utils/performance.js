// Performance monitoring utility
class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.initWebVitals()
  }

  async initWebVitals() {
    // Only run in browser
    if (typeof window === 'undefined') return

    try {
      const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals')
      
      const sendToAnalytics = (metric) => {
        this.metrics[metric.name] = metric.value
        
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`${metric.name}: ${metric.value}`)
        }
        
        // Send to analytics service (implement your preferred service)
        this.sendMetric(metric)
      }

      // Measure Core Web Vitals
      onCLS(sendToAnalytics)
      onFID(sendToAnalytics)
      onFCP(sendToAnalytics)
      onLCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
    } catch (error) {
      console.warn('Web Vitals not available:', error)
    }
  }

  sendMetric(metric) {
    // Implement your analytics service here
    // Examples: Google Analytics, Mixpanel, etc.
    
    // For now, just store locally
    if (typeof window !== 'undefined') {
      const existingMetrics = JSON.parse(localStorage.getItem('performance-metrics') || '{}')
      existingMetrics[metric.name] = {
        value: metric.value,
        timestamp: Date.now()
      }
      localStorage.setItem('performance-metrics', JSON.stringify(existingMetrics))
    }
  }

  // Custom performance markers
  mark(name) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name)
    }
  }

  measure(name, startMark, endMark) {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        window.performance.measure(name, startMark, endMark)
        const measure = window.performance.getEntriesByName(name)[0]
        this.sendMetric({
          name: name,
          value: measure.duration,
          id: `custom-${Date.now()}`
        })
        return measure.duration
      } catch (error) {
        console.warn('Performance measurement failed:', error)
      }
    }
  }

  // Resource loading performance
  getResourceTimings() {
    if (typeof window !== 'undefined' && window.performance) {
      return window.performance.getEntriesByType('resource')
    }
    return []
  }

  // Navigation timing
  getNavigationTiming() {
    if (typeof window !== 'undefined' && window.performance) {
      return window.performance.getEntriesByType('navigation')[0]
    }
    return null
  }

  // Get all metrics
  getAllMetrics() {
    return this.metrics
  }
}

export const performanceMonitor = new PerformanceMonitor()

// Hook for React components
export const usePerformance = () => {
  const mark = (name) => performanceMonitor.mark(name)
  const measure = (name, start, end) => performanceMonitor.measure(name, start, end)
  const getMetrics = () => performanceMonitor.getAllMetrics()
  
  return { mark, measure, getMetrics }
}