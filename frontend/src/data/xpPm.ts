export const XP_BY_LEVEL: number[] = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000,
  85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000,
]

export const PM_BASE_MAGO: number[] = [
  6, 8, 10, 12, 16, 18, 22, 24, 28, 32,
  ...Array.from({ length: 10 }, (_, i) => 32 + (i + 1) * 4),
]

export const PM_BASE_CLERIGO: number[] = [
  6, 8, 10, 12, 14, 16, 18, 20, 24, 28,
  ...Array.from({ length: 10 }, (_, i) => 28 + (i + 1) * 3),
]

export function levelFromXp(xp: number): number {
  let level = 1
  for (let i = XP_BY_LEVEL.length - 1; i >= 0; i--) {
    if (xp >= XP_BY_LEVEL[i]) {
      level = i + 1
      break
    }
  }
  return level
}

/** Modificador para atributos de 1 a 50: (valor - 10) / 2 arredondado para baixo. */
export function modifier(attr: number): number {
  return Math.floor((attr - 10) / 2)
}

export function calcScore(xp: number, level: number, victories: number): number {
  return xp + level * 100 + victories * 50
}

export function getTierId(score: number, tiers: { id: string; minScore: number }[]): string {
  let found = tiers[0].id
  for (const t of tiers) {
    if (score >= t.minScore) found = t.id
  }
  return found
}
