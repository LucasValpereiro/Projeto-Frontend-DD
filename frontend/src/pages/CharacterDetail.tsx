import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCharacters } from '../hooks/useCharacters'
import { modifier } from '../data/xpPm'
import type { AttrKey } from '../types'

const ATTR_ORDER: AttrKey[] = ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR']
const ATTR_NAMES: Record<AttrKey, string> = {
  FOR: 'Força',
  DES: 'Destreza',
  CON: 'Constituição',
  INT: 'Inteligência',
  SAB: 'Sabedoria',
  CAR: 'Carisma',
}

export function CharacterDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getById, update, remove } = useCharacters()
  const char = id ? getById(id) : null

  if (!char) {
    return (
      <div className="page">
        <p>Personagem não encontrado.</p>
        <Link to="/">Voltar ao início</Link>
      </div>
    )
  }

  const handleXpChange = (delta: number) => {
    const next = Math.max(0, char.xp + delta)
    update(char.id, { xp: next })
  }

  const handlePvChange = (delta: number) => {
    const next = Math.max(0, Math.min(char.pvMax, char.pv + delta))
    update(char.id, { pv: next })
  }

  const handlePmChange = (delta: number) => {
    const next = Math.max(0, Math.min(char.pmMax, char.pm + delta))
    update(char.id, { pm: next })
  }

  const handleVictory = () => {
    update(char.id, { victories: char.victories + 1 })
  }

  const handleLevelUp = () => {
    if (char.level >= 20) return
    const newLevel = char.level + 1
    const hitDie = char.class.hitDie
    const avg = hitDie === 6 ? 4 : hitDie === 8 ? 5 : 6
    const conMod = modifier(char.attributes.CON)
    const newPvMax = char.pvMax + avg + conMod
    const newPmMax = char.class.magicAttr
      ? char.pmMax + (char.classId === 'mago' ? 4 : 3) + modifier(char.attributes[char.class.magicAttr])
      : char.pmMax + 1 + modifier(char.attributes.CAR)
    update(char.id, {
      level: newLevel,
      pvMax: newPvMax,
      pv: newPvMax,
      pmMax: newPmMax,
      pm: newPmMax,
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Excluir "${char.name}"?`)) {
      remove(char.id)
      navigate('/')
    }
  }

  const tierColor =
    {
      cobre: 'var(--tier-cobre)',
      bronze: 'var(--tier-bronze)',
      prata: 'var(--tier-prata)',
      ouro: 'var(--tier-ouro)',
      platina: 'var(--tier-platina)',
      esmeralda: 'var(--tier-esmeralda)',
      diamante: 'var(--tier-diamante)',
      champion: 'var(--tier-champion)',
    }[char.tier.id] ?? 'var(--ink)'

  return (
    <div className="page character-detail">
      <div className="detail-header">
        <div>
          <h1>{char.name}</h1>
          <p className="meta">
            {char.race.name} {char.class.name} · Nível {char.level}
          </p>
          <span className="tier-badge large" style={{ borderColor: tierColor, color: tierColor }}>
            {char.tier.name} — {char.tier.title}
          </span>
        </div>
        <div className="detail-actions">
          <Link to="/" className="btn btn-secondary">
            Voltar
          </Link>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Excluir
          </button>
        </div>
      </div>

      <div className="detail-grid">
        <section className="panel attributes-panel">
          <h2>Atributos</h2>
          <div className="attr-list">
            {ATTR_ORDER.map((key) => (
              <div key={key} className="attr-row">
                <span>{ATTR_NAMES[key]}</span>
                <span className="value">{char.attributes[key]}</span>
                <span className="mod">
                  {modifier(char.attributes[key]) >= 0 ? '+' : ''}
                  {modifier(char.attributes[key])}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel vitals-panel">
          <h2>PV e PM</h2>
          <div className="vitals">
            <div className="vital">
              <label>PV</label>
              <div className="vital-controls">
                <button type="button" onClick={() => handlePvChange(-1)} aria-label="Menos PV">
                  −
                </button>
                <span>
                  {char.pv} / {char.pvMax}
                </span>
                <button type="button" onClick={() => handlePvChange(1)} aria-label="Mais PV">
                  +
                </button>
              </div>
            </div>
            <div className="vital">
              <label>PM</label>
              <div className="vital-controls">
                <button type="button" onClick={() => handlePmChange(-1)} aria-label="Menos PM">
                  −
                </button>
                <span>
                  {char.pm} / {char.pmMax}
                </span>
                <button type="button" onClick={() => handlePmChange(1)} aria-label="Mais PM">
                  +
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="panel progress-panel">
          <h2>Progressão</h2>
          <div className="progress-row">
            <label>XP</label>
            <div className="progress-controls">
              <button type="button" onClick={() => handleXpChange(-100)}>−100</button>
              <button type="button" onClick={() => handleXpChange(-10)}>−10</button>
              <span className="xp-value">{char.xp.toLocaleString('pt-BR')}</span>
              <button type="button" onClick={() => handleXpChange(10)}>+10</button>
              <button type="button" onClick={() => handleXpChange(100)}>+100</button>
            </div>
          </div>
          <div className="progress-row">
            <label>Vitórias</label>
            <span>{char.victories}</span>
            <button type="button" className="btn btn-small" onClick={handleVictory}>
              +1 vitória
            </button>
          </div>
          <div className="progress-row">
            <label>Pontuação</label>
            <span className="score">{char.score.toLocaleString('pt-BR')}</span>
          </div>
          {char.level < 20 && (
            <button type="button" className="btn btn-primary" onClick={handleLevelUp}>
              Subir de nível
            </button>
          )}
        </section>

        <section className="panel traits-panel">
          <h2>Traços da raça</h2>
          <p className="traits-text">{char.race.traits}</p>
        </section>

        <section className="panel abilities-panel full-width">
          <h2>Habilidades</h2>
          <ul className="abilities-list">
            {char.abilities.map((a) => (
              <li key={a.id} className={`ability ability-${a.type.toLowerCase()}`}>
                <div className="ability-header">
                  <span className="ability-name">{a.name}</span>
                  <span className="ability-type">{a.type}</span>
                  <span className="ability-cost">{a.cost === 0 ? '—' : `${a.cost} PM`}</span>
                </div>
                <p className="ability-effect">{a.effect}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
