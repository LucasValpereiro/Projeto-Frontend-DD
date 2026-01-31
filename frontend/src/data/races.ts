import type { Race } from '../types'

export const RACES: Race[] = [
  {
    id: 'humano',
    name: 'Humano',
    bonus: { FOR: 1, DES: 1, CON: 1, INT: 1, SAB: 1, CAR: 1 },
    traits: 'Versatilidade: uma vez por descanso longo, pode rolar novamente um teste de atributo que falhou.',
  },
  {
    id: 'elfo',
    name: 'Elfo',
    bonus: { DES: 2, SAB: 1 },
    traits: 'Visão no escuro (18 m). Sangue élfico: vantagem contra enfeitiçamento e adormecimento.',
  },
  {
    id: 'anao',
    name: 'Anão',
    bonus: { CON: 2, FOR: 1 },
    traits: 'Resistência anã: vantagem contra veneno. Vigor: +1 PV máximo por nível.',
  },
  {
    id: 'orc',
    name: 'Orc',
    bonus: { FOR: 2, CON: 1 },
    traits: 'Fúria: uma vez por descanso, +2 de dano em um ataque corpo a corpo. Ameaçador: vantagem em Intimidação.',
  },
  {
    id: 'halfling',
    name: 'Halfling',
    bonus: { DES: 2, CAR: 1 },
    traits: 'Sorte: ao tirar 1 em d20, pode rolar de novo (uma vez por cena). Furtivo: pode se esconder atrás de criaturas Médio+.',
  },
  {
    id: 'meio-elfo',
    name: 'Meio-Elfo',
    bonus: { CAR: 2 },
    traits: 'Visão no escuro (18 m). +1 em dois atributos à escolha. Versatilidade: duas perícias à escolha.',
  },
]
