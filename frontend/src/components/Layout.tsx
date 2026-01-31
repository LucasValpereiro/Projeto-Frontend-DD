import { Link, Outlet } from 'react-router-dom'

interface LayoutProps {
  children?: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">
          D&D — Personagens e Ranking
        </Link>
        <nav className="nav">
          <Link to="/">Início</Link>
          <Link to="/criar">Novo personagem</Link>
        </nav>
      </header>
      <main className="main">
        {children ?? <Outlet />}
      </main>
      <footer className="footer">
        Sistema D&D — Personagens, Habilidades e Ranking
      </footer>
    </div>
  )
}
