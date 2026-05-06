export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '1rem',
    }}>
      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Mphatso Gama
      </span>
      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        Built with React · Hosted on Vercel
      </span>
    </footer>
  )
}
