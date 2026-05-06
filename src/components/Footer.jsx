export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #1a1a1a',
      padding: '2rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '1rem',
    }}>
      <span style={{ fontSize: '0.82rem', color: '#444' }}>
        © {new Date().getFullYear()} Mphatso Gama
      </span>
      <span style={{ fontSize: '0.82rem', color: '#333' }}>
        Built with React · Hosted on Vercel
      </span>
    </footer>
  )
}
