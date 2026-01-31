import { modifier } from '../data/xpPm'
import type { AttrKey } from '../types'

const ATTR_NAMES: Record<AttrKey, string> = {
  FOR: 'Força',
  DES: 'Destreza',
  CON: 'Constituição',
  INT: 'Inteligência',
  SAB: 'Sabedoria',
  CAR: 'Carisma',
}

const MIN_ATTR = 1
const MAX_ATTR = 50

interface AttrStepperProps {
  attrKey: AttrKey
  value: number
  onChange: (value: number) => void
  readOnly?: boolean
}

export function AttrStepper({ attrKey, value, onChange, readOnly }: AttrStepperProps) {
  const v = Math.max(MIN_ATTR, Math.min(MAX_ATTR, value))
  const mod = modifier(v)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.target.value, 10)
    if (!Number.isNaN(n)) onChange(Math.max(MIN_ATTR, Math.min(MAX_ATTR, n)))
  }

  return (
    <div className="attr-stepper">
      <span className="attr-stepper-label">{ATTR_NAMES[attrKey]}</span>
      <div className="attr-stepper-controls">
        {!readOnly && (
          <button
            type="button"
            className="attr-stepper-btn"
            onClick={() => onChange(Math.max(MIN_ATTR, v - 1))}
            aria-label={`Diminuir ${ATTR_NAMES[attrKey]}`}
          >
            −
          </button>
        )}
        <input
          type="number"
          min={MIN_ATTR}
          max={MAX_ATTR}
          value={v}
          onChange={handleInput}
          readOnly={readOnly}
          className="attr-stepper-input"
          aria-label={ATTR_NAMES[attrKey]}
        />
        {!readOnly && (
          <button
            type="button"
            className="attr-stepper-btn"
            onClick={() => onChange(Math.min(MAX_ATTR, v + 1))}
            aria-label={`Aumentar ${ATTR_NAMES[attrKey]}`}
          >
            +
          </button>
        )}
      </div>
      <span className="attr-stepper-mod">
        Mod {mod >= 0 ? '+' : ''}{mod}
      </span>
    </div>
  )
}
