export type AttrKey = 'FOR' | 'DES' | 'CON' | 'INT' | 'SAB' | 'CAR'

export interface Attributes {
  FOR: number
  DES: number
  CON: number
  INT: number
  SAB: number
  CAR: number
}

export interface Race {
  id: string
  name: string
  bonus: Partial<Attributes>
  traits: string
}

export interface ClassInfo {
  id: string
  name: string
  hitDie: number
  magicAttr: AttrKey | null
  style: string
}

export type AbilityType = 'Ataque' | 'Magia' | 'Suporte'

export interface Ability {
  id: string
  name: string
  type: AbilityType
  cost: number
  effect: string
  level: number
  attr: AttrKey
}

export interface Tier {
  id: string
  name: string
  minScore: number
  title: string
}

export interface Character {
  id: string
  name: string
  raceId: string
  classId: string
  attributes: Attributes
  level: number
  xp: number
  pv: number
  pvMax: number
  pm: number
  pmMax: number
  victories: number
  createdAt: string
  updatedAt: string
}

export interface CharacterWithDetails extends Character {
  race: Race
  class: ClassInfo
  tier: Tier
  abilities: Ability[]
  score: number
}
