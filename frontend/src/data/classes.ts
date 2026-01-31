import type { ClassInfo } from '../types'

export const CLASSES: ClassInfo[] = [
  { id: 'guerreiro', name: 'Guerreiro', hitDie: 10, magicAttr: null, style: 'Corpo a corpo, PV alto' },
  { id: 'mago', name: 'Mago', hitDie: 6, magicAttr: 'INT', style: 'Magia arcana, PM alto' },
  { id: 'clerigo', name: 'Clérigo', hitDie: 8, magicAttr: 'SAB', style: 'Cura e suporte divino' },
  { id: 'ladino', name: 'Ladino', hitDie: 8, magicAttr: null, style: 'Precisão, furtividade' },
]
