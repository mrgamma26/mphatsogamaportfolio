import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long')
})

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur'
  })

  const watchedMessage = watch('message', '')

  const onSubmit = async (data) => {
    try {
      setSubmitStatus(null)
      
      // Simulate API call - replace with your actual endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      reset()
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
      
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit'
  }

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#ef4444',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--text-primary)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        background: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: submitStatus === 'success' ? '#10b98133' : '#ef444433',
              border: `1px solid ${submitStatus === 'success' ? '#10b981' : '#ef4444'}`,
              color: submitStatus === 'success' ? '#10b981' : '#ef4444'
            }}
          >
            {submitStatus === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
              {submitStatus === 'success' 
                ? 'Message sent successfully! I\'ll get back to you soon.' 
                : 'Failed to send message. Please try again or contact me directly.'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="name" style={labelStyle}>
              Name *
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              style={errors.name ? errorInputStyle : inputStyle}
              placeholder="Your full name"
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  style={{
                    color: '#ef4444',
                    fontSize: '0.8rem',
                    marginTop: '0.25rem'
                  }}
                >
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label htmlFor="email" style={labelStyle}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              style={errors.email ? errorInputStyle : inputStyle}
              placeholder="your.email@example.com"
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  style={{
                    color: '#ef4444',
                    fontSize: '0.8rem',
                    marginTop: '0.25rem'
                  }}
                >
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <label htmlFor="subject" style={labelStyle}>
            Subject *
          </label>
          <input
            id="subject"
            type="text"
            {...register('subject')}
            style={errors.subject ? errorInputStyle : inputStyle}
            placeholder="What's this about?"
          />
          <AnimatePresence>
            {errors.subject && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                style={{
                  color: '#ef4444',
                  fontSize: '0.8rem',
                  marginTop: '0.25rem'
                }}
              >
                {errors.subject.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="message" style={labelStyle}>
            Message * 
            <span style={{ 
              color: 'var(--text-muted)', 
              fontWeight: 400, 
              fontSize: '0.8rem',
              marginLeft: '0.5rem'
            }}>
              ({watchedMessage.length}/1000)
            </span>
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message')}
            style={{
              ...errors.message ? errorInputStyle : inputStyle,
              resize: 'vertical',
              minHeight: '120px'
            }}
            placeholder="Tell me about your project, requirements, or just say hello!"
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                style={{
                  color: '#ef4444',
                  fontSize: '0.8rem',
                  marginTop: '0.25rem'
                }}
              >
                {errors.message.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          style={{
            padding: '1rem 2rem',
            borderRadius: '10px',
            border: 'none',
            background: isSubmitting ? 'var(--text-muted)' : 'var(--accent)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease',
            alignSelf: 'flex-start'
          }}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size={20} color="white" />
              Sending...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}