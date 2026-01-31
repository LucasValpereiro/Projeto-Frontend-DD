import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCharacters } from '../hooks/useCharacters'
import { RACES } from '../data/races'
import { CLASSES } from '../data/classes'
import { buildNewCharacter } from '../utils/characterCreate'
import type { Attributes, AttrKey } from '../types'
import { AttrStepper } from '../components/AttrStepper'

const ATTR_ORDER: AttrKey[] = ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR']

const DEFAULT_ATTRS: Attributes = { FOR: 10, DES: 10, CON: 10, INT: 10, SAB: 10, CAR: 10 }
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8]

const STEPS = [
  { id: 1, title: 'Identidade' },
  { id: 2, title: 'Atributos' },
  { id: 3, title: 'Revisão' },
]

export function CreateCharacter() {
  const navigate = useNavigate()
  const { add } = useCharacters()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [raceId, setRaceId] = useState('humano')
  const [classId, setClassId] = useState('guerreiro')
  const [attributes, setAttributes] = useState<Attributes>({ ...DEFAULT_ATTRS })
  const [error, setError] = useState('')

  const race = RACES.find((r) => r.id === raceId)
  const cls = CLASSES.find((c) => c.id === classId)

  const assignStandard = () => {
    const sorted = [...STANDARD_ARRAY].sort((a, b) => b - a)
    const next: Attributes = { ...attributes }
    ATTR_ORDER.forEach((key, i) => {
      next[key] = Math.min(50, Math.max(1, sorted[i] ?? 10))
    })
    setAttributes(next)
  }

  const rollAttribute = () => {
    const roll = () => {
      const dices = [0, 0, 0, 0].map(() => Math.floor(Math.random() * 6) + 1)
      dices.sort((a, b) => a - b)
      return Math.min(50, Math.max(1, dices[1]! + dices[2]! + dices[3]!))
    }
    setAttributes({
      FOR: roll(),
      DES: roll(),
      CON: roll(),
      INT: roll(),
      SAB: roll(),
      CAR: roll(),
    })
  }

  const setAttr = (key: AttrKey, value: number) => {
    const n = Math.max(1, Math.min(50, value))
    setAttributes((prev) => ({ ...prev, [key]: n }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (step < 3) {
      setStep(step + 1)
      return
    }
    const char = buildNewCharacter(name, raceId, classId, attributes)
    add(char)
    navigate(`/personagem/${char.id}`)
  }

  return (
    <div className="page create-character">
      <div className="page-header">
        <h1>Criar personagem</h1>
        <Link to="/" className="btn btn-secondary">
          Voltar
        </Link>
      </div>

      <div className="steps-indicator">
        {STEPS.map((s) => (
          <span
            key={s.id}
            className={`step-dot ${step >= s.id ? 'active' : ''}`}
            title={s.title}
          >
            {s.id}
          </span>
        ))}
        <span className="steps-label">
          Etapa {step} de 3: {STEPS[step - 1]?.title}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        {/* Etapa 1: Identidade */}
        {step === 1 && (
          <section className="form-section">
            <h2>Identidade</h2>
            <label>
              Nome do personagem
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Aragorn, Gandalf..."
                maxLength={60}
                autoFocus
              />
            </label>
            <label>
              Raça
              <select value={raceId} onChange={(e) => setRaceId(e.target.value)}>
                {RACES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Classe
              <select value={classId} onChange={(e) => setClassId(e.target.value)}>
                {CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-actions">
              <Link to="/" className="btn btn-secondary">
                Cancelar
              </Link>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setStep(2)}
                disabled={!name.trim()}
              >
                Próximo: Atributos
              </button>
            </div>
          </section>
        )}

        {/* Etapa 2: Atributos */}
        {step === 2 && (
          <section className="form-section">
            <h2>Atributos (1 a 50)</h2>
            <p className="form-hint">
              Digite o valor ou use os botões + e − para ajustar. Você pode usar &quot;Rolagem&quot; ou &quot;Array padrão&quot; para preencher rápido.
            </p>
            <div className="attr-actions">
              <button type="button" className="btn btn-secondary" onClick={rollAttribute}>
                Rolagem (4d6)
              </button>
              <button type="button" className="btn btn-secondary" onClick={assignStandard}>
                Array padrão
              </button>
            </div>
            <div className="attr-stepper-grid">
              {ATTR_ORDER.map((key) => (
                <AttrStepper
                  key={key}
                  attrKey={key}
                  value={attributes[key]}
                  onChange={(v) => setAttr(key, v)}
                />
              ))}
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                Voltar
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
                Próximo: Revisão
              </button>
            </div>
          </section>
        )}

        {/* Etapa 3: Revisão */}
        {step === 3 && (
          <section className="form-section">
            <h2>Revisão</h2>
            <div className="review-block">
              <p><strong>Nome:</strong> {name || '—'}</p>
              <p><strong>Raça:</strong> {race?.name ?? '—'}</p>
              <p><strong>Classe:</strong> {cls?.name ?? '—'}</p>
              <p><strong>Atributos:</strong></p>
              <ul className="review-attrs">
                {ATTR_ORDER.map((key) => (
                  <li key={key}>{key}: {attributes[key]}</li>
                ))}
              </ul>
            </div>
            {error && <p className="form-error">{error}</p>}
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                Voltar
              </button>
              <button type="submit" className="btn btn-primary">
                Criar personagem
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  )
}
