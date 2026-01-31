import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCharacters } from '../hooks/useCharacters'
import { TIERS } from '../data/tiers'
import { CLASSES } from '../data/classes'
import type { Tier } from '../types'

const tierColors: Record<string, string> = {
  cobre: 'var(--tier-cobre)',
  bronze: 'var(--tier-bronze)',
  prata: 'var(--tier-prata)',
  ouro: 'var(--tier-ouro)',
  platina: 'var(--tier-platina)',
  esmeralda: 'var(--tier-esmeralda)',
  diamante: 'var(--tier-diamante)',
  champion: 'var(--tier-champion)',
}

function TierBadge({ tierId }: { tierId: string }) {
  const tier = TIERS.find((t) => t.id === tierId) as Tier | undefined
  const color = tierColors[tierId] ?? 'var(--ink)'
  return (
    <span className="tier-badge" style={{ borderColor: color, color }}>
      {tier?.name ?? tierId}
    </span>
  )
}

export function Home() {
  const { characters, ranking } = useCharacters()
  const [tutorialOpen, setTutorialOpen] = useState(true)

  return (
    <div className="page home">
      <div className="page-header">
        <h1>Personagens</h1>
        <Link to="/criar" className="btn btn-primary">
          Novo personagem
        </Link>
      </div>

      <section className="tutorial-section">
        <button
          type="button"
          className="tutorial-toggle"
          onClick={() => setTutorialOpen((o) => !o)}
          aria-expanded={tutorialOpen}
        >
          {tutorialOpen ? '▼' : '▶'} Como usar
        </button>
        {tutorialOpen && (
          <div className="tutorial-content">
            <ol className="tutorial-steps">
              <li><strong>Criar personagem:</strong> clique em &quot;Novo personagem&quot; e preencha em 3 etapas (Identidade → Atributos → Revisão). Atributos vão de 1 a 50; você pode digitar ou usar os botões + e −.</li>
              <li><strong>Ver ficha:</strong> na lista ou no ranking, clique no nome do personagem para abrir a ficha com atributos, PV/PM, habilidades e traços da raça.</li>
              <li><strong>Progressão:</strong> na ficha, use os botões para ajustar PV e PM, adicionar XP (+10 / +100) e vitórias. Clique em &quot;Subir de nível&quot; quando tiver XP suficiente.</li>
              <li><strong>Ranking:</strong> a pontuação (XP + nível × 100 + vitórias × 50) define seu tier: Cobre → Bronze → Prata → Ouro → Platina → Esmeralda → Diamante → Champion.</li>
            </ol>
          </div>
        )}
      </section>

      {characters.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum personagem ainda.</p>
          <Link to="/criar" className="btn btn-primary">
            Criar primeiro personagem
          </Link>
        </div>
      ) : (
        <>
          <section className="ranking-section">
            <h2>Ranking</h2>
            <ol className="ranking-list">
              {ranking.map((c, i) => (
                <li key={c.id} className="ranking-item">
                  <span className="rank">#{i + 1}</span>
                  <Link to={`/personagem/${c.id}`} className="rank-name">
                    {c.name}
                  </Link>
                  <span className="rank-level">Nível {c.level}</span>
                  <span className="rank-score">{c.score.toLocaleString('pt-BR')}</span>
                  <TierBadge tierId={c.tierId} />
                </li>
              ))}
            </ol>
          </section>

          <section className="characters-section">
            <h2>Lista de personagens</h2>
            <ul className="character-grid">
              {characters.map((c) => {
                const r = ranking.find((x) => x.id === c.id)
                return (
                  <li key={c.id}>
                    <Link to={`/personagem/${c.id}`} className="card character-card">
                      <span className="card-name">{c.name}</span>
                      <span className="card-meta">
                        Nível {c.level} · {CLASSES.find((cl) => cl.id === c.classId)?.name ?? c.classId}
                      </span>
                      {r && <TierBadge tierId={r.tierId} />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        </>
      )}
    </div>
  )
}
