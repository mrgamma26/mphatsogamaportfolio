import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ThemeSwitcher from './components/ThemeSwitcher'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div style={{ minHeight: '100vh', background: 'var(--bg)', transition: 'background 0.3s ease' }}>
          <CustomCursor />
          <ThemeSwitcher />
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
