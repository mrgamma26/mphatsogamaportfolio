import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  distance = 50,
  once = true,
  threshold = 0.1,
  className,
  style = {}
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once, 
    margin: `-${threshold * 100}% 0px -${threshold * 100}% 0px` 
  })

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    'up-left': { x: distance, y: distance },
    'up-right': { x: -distance, y: distance },
    'down-left': { x: distance, y: -distance },
    'down-right': { x: -distance, y: -distance }
  }

  const initial = {
    opacity: 0,
    ...directions[direction]
  }

  const animate = {
    opacity: isInView ? 1 : 0,
    x: isInView ? 0 : directions[direction]?.x || 0,
    y: isInView ? 0 : directions[direction]?.y || 0
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal

// Preset animation components for common use cases
export const FadeIn = ({ children, delay = 0, ...props }) => (
  <ScrollReveal direction="up" distance={20} delay={delay} {...props}>
    {children}
  </ScrollReveal>
)

export const SlideInLeft = ({ children, delay = 0, ...props }) => (
  <ScrollReveal direction="left" delay={delay} {...props}>
    {children}
  </ScrollReveal>
)

export const SlideInRight = ({ children, delay = 0, ...props }) => (
  <ScrollReveal direction="right" delay={delay} {...props}>
    {children}
  </ScrollReveal>
)

export const ZoomIn = ({ children, delay = 0, ...props }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    {...props}
  >
    {children}
  </motion.div>
)

export const StaggerContainer = ({ children, staggerDelay = 0.1, ...props }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({ children, direction = 'up', ...props }) => {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 }
  }

  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          ...directions[direction]
        },
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}