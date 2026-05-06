export default function SectionWrapper({ id, children }) {
  return (
    <section id={id} style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: 'clamp(4rem, 10vh, 6rem) clamp(1rem, 5vw, 2rem)',
    }}>
      {children}
    </section>
  )
}
