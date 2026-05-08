import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      // Theme state
      theme: 'dark',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),
      
      // Language state
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () => set((state) => ({
        language: state.language === 'en' ? 'ny' : 'en'
      })),
      
      // UI state
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
      
      // Contact form state
      contactForm: {
        isSubmitting: false,
        isSuccess: false,
        error: null
      },
      setContactFormState: (formState) => set((state) => ({
        contactForm: { ...state.contactForm, ...formState }
      })),
      
      // Projects filter state
      projectsFilter: 'all',
      projectsSearch: '',
      setProjectsFilter: (filter) => set({ projectsFilter: filter }),
      setProjectsSearch: (search) => set({ projectsSearch: search }),
      
      // Performance metrics
      performanceMetrics: {},
      setPerformanceMetric: (name, value) => set((state) => ({
        performanceMetrics: { ...state.performanceMetrics, [name]: value }
      }))
    }),
    {
      name: 'app-settings',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language
      })
    }
  )
)

export default useAppStore