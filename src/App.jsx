import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CustomCursor from './components/CustomCursor'
import ThemeSwitcherEnhanced from './components/ThemeSwitcherEnhanced'
import ErrorBoundary from './components/ErrorBoundary'
import SkipLink from './components/SkipLink'
import LoadingSpinner from './components/LoadingSpinner'
import PerformanceDashboard from './components/PerformanceDashboard'
import FloatingIcons from './components/FloatingIcons'
import { performanceMonitor } from './utils/performance'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'

// Lazy load heavy components
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const ProjectsEnhanced = lazy(() => import('./components/ProjectsEnhanced'))
const Education = lazy(() => import('./components/Education'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

// Loading fallback component
const SectionLoader = () => (
  <div style={{ 
    padding: '4rem 2rem', 
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px'
  }}>
    <LoadingSpinner size={40} />
  </div>
)

export default function App() {
  useEffect(() => {
    // Mark app start
    performanceMonitor.mark('app-start')
    
    // Mark when app is fully loaded
    const handleLoad = () => {
      performanceMonitor.mark('app-loaded')
      performanceMonitor.measure('app-load-time', 'app-start', 'app-loaded')
    }
    
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <div style={{ minHeight: '100vh', background: 'var(--bg)', transition: 'background 0.3s ease' }}>
            <SkipLink />
            <CustomCursor />
            <ThemeSwitcherEnhanced />
            <PerformanceDashboard />
            <FloatingIcons />
            <Navbar />
            
            <main id="main-content">
              <Hero />
              
              <Suspense fallback={<SectionLoader />}>
                <About />
              </Suspense>
              
              <Suspense fallback={<SectionLoader />}>
                <Skills />
              </Suspense>
              
              <Suspense fallback={<SectionLoader />}>
                <Experience />
              </Suspense>
              
              <Suspense fallback={<SectionLoader />}>
                <ProjectsEnhanced />
              </Suspense>
              
              <Suspense fallback={<SectionLoader />}>
                <Education />
              </Suspense>
              
              <Suspense fallback={<SectionLoader />}>
                <Contact />
              </Suspense>
              
              <Suspense fallback={<SectionLoader />}>
                <Footer />
              </Suspense>
            </main>
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
