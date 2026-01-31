import type { Character, Attributes } from '../types'
import { RACES } from '../data/races'
import { CLASSES } from '../data/classes'
import { TIERS } from '../data/tiers'
import { modifier, calcScore, getTierId, PM_BASE_MAGO, PM_BASE_CLERIGO } from '../data/xpPm'

function applyRaceBonus(attrs: Attributes, raceId: string): Attributes {
  const race = RACES.find((r) => r.id === raceId)
  if (!race?.bonus) return attrs
  const out = { ...attrs }
  const keys = Object.keys(race.bonus) as (keyof Attributes)[]
  for (const k of keys) {
    const v = race.bonus[k]
    if (v != null) out[k] = Math.min(50, out[k] + v)
  }
  return out
}

function calcPvMax(classId: string, level: number, conMod: number): number {
  const cls = CLASSES.find((c) => c.id === classId)
  const hitDie = cls?.hitDie ?? 8
  const avgPerLevel = hitDie === 6 ? 4 : hitDie === 8 ? 5 : 6
  const first = hitDie + conMod
  const rest = (level - 1) * (avgPerLevel + conMod)
  return Math.max(1, first + rest)
}

function calcPmMax(classId: string, level: number, magicMod: number): number {
  const cls = CLASSES.find((c) => c.id === classId)
  if (!cls?.magicAttr) return Math.max(0, level + magicMod)
  const arr = classId === 'mago' ? PM_BASE_MAGO : classId === 'clerigo' ? PM_BASE_CLERIGO : null
  const base = arr ? arr[Math.min(level - 1, arr.length - 1)] ?? 6 : 6
  return Math.max(0, base + magicMod)
}

export function buildNewCharacter(
  name: string,
  raceId: string,
  classId: string,
  baseAttributes: Attributes
): Character {
  const attributes = applyRaceBonus(baseAttributes, raceId)
  const cls = CLASSES.find((c) => c.id === classId)
  const conMod = modifier(attributes.CON)
  const magicMod = cls?.magicAttr ? modifier(attributes[cls.magicAttr]) : modifier(attributes.CAR)
  const pvMax = calcPvMax(classId, 1, conMod)
  const pmMax = calcPmMax(classId, 1, magicMod)
  const score = calcScore(0, 1, 0)
  const tierId = getTierId(score, TIERS)
  const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[0]
  const now = new Date().toISOString()
  const id =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (ch) => {
          const r = (Math.random() * 16) | 0
          const v = ch === 'x' ? r : (r & 0x3) | 0x8
          return v.toString(16)
        })
  return {
    id,
    name: name.trim() || 'Sem nome',
    raceId,
    classId,
    attributes,
    level: 1,
    xp: 0,
    pv: pvMax,
    pvMax,
    pm: pmMax,
    pmMax,
    victories: 0,
    createdAt: now,
    updatedAt: now,
  }
}
