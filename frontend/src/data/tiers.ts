import type { Tier } from '../types'

export const TIERS: Tier[] = [
  { id: 'cobre', name: 'Cobre', minScore: 0, title: 'Iniciante' },
  { id: 'bronze', name: 'Bronze', minScore: 500, title: 'Aprendiz' },
  { id: 'prata', name: 'Prata', minScore: 2000, title: 'Aventureiro' },
  { id: 'ouro', name: 'Ouro', minScore: 5000, title: 'Veterano' },
  { id: 'platina', name: 'Platina', minScore: 12000, title: 'Expert' },
  { id: 'esmeralda', name: 'Esmeralda', minScore: 25000, title: 'Elite' },
  { id: 'diamante', name: 'Diamante', minScore: 45000, title: 'Mestre' },
  { id: 'champion', name: 'Champion', minScore: 70000, title: 'Campeão' },
]
