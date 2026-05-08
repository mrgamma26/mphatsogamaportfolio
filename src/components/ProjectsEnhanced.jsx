import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ExternalLink, GitBranch, X } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'

// Sample projects data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and MySQL',
    category: 'web',
    technologies: ['React', 'Node.js', 'MySQL', 'Stripe'],
    image: '/project1.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    category: 'web',
    technologies: ['React', 'Socket.io', 'MongoDB'],
    image: '/project2.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: false
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication',
    category: 'mobile',
    technologies: ['React Native', 'Firebase', 'Biometrics'],
    image: '/project3.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    id: 4,
    title: 'Desktop Analytics Tool',
    description: 'Data visualization and analytics desktop application',
    category: 'desktop',
    technologies: ['Electron', 'D3.js', 'SQLite'],
    image: '/project4.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: false
  }
]

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'web', label: 'Web Apps' },
  { key: 'mobile', label: 'Mobile Apps' },
  { key: 'desktop', label: 'Desktop Apps' }
]

export default function ProjectsEnhanced() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const { language } = useLanguage()
  const t = translations[language].projects

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesFilter = activeFilter === 'all' || project.category === activeFilter
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesFilter && matchesSearch
    })
  }, [activeFilter, searchTerm])

  const ProjectCard = ({ project, index }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        background: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer'
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {project.featured && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'var(--accent)',
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 600,
          zIndex: 2
        }}>
          Featured
        </div>
      )}

      <div style={{
        height: '200px',
        background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          fontSize: '3rem',
          opacity: 0.3
        }}>
          📱
        </div>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }}
        className="project-overlay"
        >
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)'
              }}
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)'
              }}
            >
              <GitBranch size={20} />
            </motion.a>
          )}
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          color: 'var(--text-primary)'
        }}>
          {project.title}
        </h3>
        
        <p style={{
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          {project.description}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          {project.technologies.map(tech => (
            <span
              key={tech}
              style={{
                padding: '0.25rem 0.75rem',
                background: 'var(--accent)22',
                color: 'var(--accent)',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 500
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--accent)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              View Live <ExternalLink size={14} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              Code <GitBranch size={14} />
            </a>
          )}
        </div>
      </div>

      <style>{`
        .project-overlay:hover {
          opacity: 1 !important;
        }
      `}</style>
    </motion.div>
  )

  return (
    <SectionWrapper id="projects">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 5vw, 2rem)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{
            color: 'var(--accent)',
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            {t.label}
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            margin: '0.5rem 0 1rem',
            color: 'var(--text-primary)'
          }}>
            {t.title}
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{
            position: 'relative',
            flex: '1',
            minWidth: '250px',
            maxWidth: '400px'
          }}>
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <Filter size={18} />
            Filters
            {showFilters && <X size={16} />}
          </button>
        </motion.div>

        {/* Filter Categories */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}
            >
              {categories.map(category => (
                <motion.button
                  key={category.key}
                  onClick={() => setActiveFilter(category.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '25px',
                    border: 'none',
                    background: activeFilter === category.key ? 'var(--accent)' : 'var(--bg-card)',
                    color: activeFilter === category.key ? 'white' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {category.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No projects found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  )
}