import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { CreateCharacter } from './pages/CreateCharacter'
import { CharacterDetail } from './pages/CharacterDetail'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar" element={<CreateCharacter />} />
        <Route path="/personagem/:id" element={<CharacterDetail />} />
      </Routes>
    </Layout>
  )
}
