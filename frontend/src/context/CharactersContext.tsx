import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Character, CharacterWithDetails } from '../types'
import { RACES } from '../data/races'
import { CLASSES } from '../data/classes'
import { TIERS } from '../data/tiers'
import { getAbilitiesByClass } from '../data/abilities'
import { calcScore, getTierId } from '../data/xpPm'

const STORAGE_KEY = 'dnd-characters'

function loadCharacters(): Character[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCharacters(list: Character[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

type CharactersContextValue = {
  characters: Character[]
  add: (c: Character) => void
  update: (id: string, patch: Partial<Character>) => void
  remove: (id: string) => void
  getById: (id: string) => CharacterWithDetails | null
  ranking: (Character & { score: number; tierId: string })[]
}

const CharactersContext = createContext<CharactersContextValue | null>(null)

export function CharactersProvider({ children }: { children: React.ReactNode }) {
  const [characters, setCharacters] = useState<Character[]>(() => loadCharacters())

  useEffect(() => {
    saveCharacters(characters)
  }, [characters])

  const add = useCallback((c: Character) => {
    setCharacters((prev) => [...prev, c])
  }, [])

  const update = useCallback((id: string, patch: Partial<Character>) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c))
    )
  }, [])

  const remove = useCallback((id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const getById = useCallback(
    (id: string): CharacterWithDetails | null => {
      const c = characters.find((x) => x.id === id)
      if (!c) return null
      const race = RACES.find((r) => r.id === c.raceId) ?? RACES[0]
      const classInfo = CLASSES.find((cl) => cl.id === c.classId) ?? CLASSES[0]
      const score = calcScore(c.xp, c.level, c.victories)
      const tierId = getTierId(score, TIERS)
      const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[0]
      const abilities = getAbilitiesByClass(c.classId, c.level)
      return { ...c, race, class: classInfo, tier, abilities, score }
    },
    [characters]
  )

  const ranking = characters
    .map((c) => ({
      ...c,
      score: calcScore(c.xp, c.level, c.victories),
      tierId: getTierId(calcScore(c.xp, c.level, c.victories), TIERS),
    }))
    .sort((a, b) => b.score - a.score)

  const value: CharactersContextValue = {
    characters,
    add,
    update,
    remove,
    getById,
    ranking,
  }

  return (
    <CharactersContext.Provider value={value}>
      {children}
    </CharactersContext.Provider>
  )
}

export function useCharacters(): CharactersContextValue {
  const ctx = useContext(CharactersContext)
  if (!ctx) throw new Error('useCharacters deve ser usado dentro de CharactersProvider')
  return ctx
}
