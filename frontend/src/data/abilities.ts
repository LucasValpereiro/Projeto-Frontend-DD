import type { Ability } from '../types'

const byClass: Record<string, Omit<Ability, 'id'>[]> = {
  guerreiro: [
    { name: 'Golpe pesado', type: 'Ataque', cost: 0, effect: '1d10 + FOR. Corpo a corpo.', level: 1, attr: 'FOR' },
    { name: 'Investida', type: 'Ataque', cost: 2, effect: '2d8 + FOR. Deslocar 3 m antes. Alvo pode ser derrubado (teste FOR).', level: 3, attr: 'FOR' },
    { name: 'Grito de guerra', type: 'Suporte', cost: 3, effect: 'Aliados em alcance curto: +2 no próximo ataque até o fim do seu próximo turno.', level: 5, attr: 'CAR' },
    { name: 'Corte profundo', type: 'Ataque', cost: 4, effect: '3d10 + FOR. Corpo a corpo. Uma vez por cena.', level: 7, attr: 'FOR' },
    { name: 'Segunda chance', type: 'Suporte', cost: 2, effect: 'Reação: sofrer o dano no lugar de aliado adjacente (metade se bem-sucedido).', level: 9, attr: 'CON' },
    { name: 'Fúria do guerreiro', type: 'Ataque', cost: 5, effect: '2d10 + FOR. Até 2 alvos. Uma vez por descanso.', level: 11, attr: 'FOR' },
    { name: 'Muralha de aço', type: 'Suporte', cost: 4, effect: 'Você e aliados adjacentes: +3 defesa até o início do seu próximo turno.', level: 13, attr: 'CON' },
    { name: 'Golpe final', type: 'Ataque', cost: 6, effect: '4d10 + FOR. Se alvo com ≤½ PV, dobra dados. Uma vez por descanso.', level: 15, attr: 'FOR' },
  ],
  mago: [
    { name: 'Bola de fogo', type: 'Magia', cost: 4, effect: '2d6 + INT, área pequena. Teste DES para metade.', level: 1, attr: 'INT' },
    { name: 'Raio de gelo', type: 'Magia', cost: 3, effect: '1d8 + INT. Alvo −2 DES até o fim do próximo turno.', level: 2, attr: 'INT' },
    { name: 'Escudo arcano', type: 'Suporte', cost: 2, effect: 'Você ou aliado: +4 defesa até o fim do seu próximo turno.', level: 1, attr: 'INT' },
    { name: 'Raio arcano', type: 'Magia', cost: 2, effect: '1d6 + INT, alcance longo.', level: 1, attr: 'INT' },
    { name: 'Névoa cegante', type: 'Suporte', cost: 3, effect: 'Névoa em área pequena. Dentro: desvantagem em ataques. 2 rodadas.', level: 3, attr: 'INT' },
    { name: 'Detonar', type: 'Magia', cost: 5, effect: '3d6 + INT em área média. Teste CON para metade. Uma vez por cena.', level: 5, attr: 'INT' },
    { name: 'Teleporte curto', type: 'Suporte', cost: 4, effect: 'Teleporta você ou aliado até 9 m. Uma vez por cena.', level: 7, attr: 'INT' },
    { name: 'Prisão de força', type: 'Magia', cost: 6, effect: 'Alvo teste SAB ou fica imóvel 2 rodadas. Uma vez por cena.', level: 9, attr: 'INT' },
    { name: 'Mísseis mágicos', type: 'Magia', cost: 3, effect: '3 projéteis, 1d4 + INT cada. Acertam automaticamente.', level: 11, attr: 'INT' },
    { name: 'Invulnerabilidade breve', type: 'Suporte', cost: 8, effect: 'Imune a todo dano até o início do seu próximo turno. Uma vez por descanso.', level: 15, attr: 'INT' },
  ],
  clerigo: [
    { name: 'Cura leve', type: 'Suporte', cost: 2, effect: 'Restaura 1d8 + SAB de PV em você ou aliado em alcance curto.', level: 1, attr: 'SAB' },
    { name: 'Golpe sagrado', type: 'Magia', cost: 3, effect: '1d6 + SAB. Não-morto: dobro.', level: 2, attr: 'SAB' },
    { name: 'Bênção', type: 'Suporte', cost: 4, effect: 'Aliados em alcance curto: +1 em ataques e saves por 3 rodadas.', level: 4, attr: 'SAB' },
    { name: 'Escudo da fé', type: 'Suporte', cost: 2, effect: 'Um aliado: +2 defesa e resistência a necrótico até o fim do seu próximo turno.', level: 1, attr: 'SAB' },
    { name: 'Purificação', type: 'Suporte', cost: 3, effect: 'Remove veneno ou doença de um aliado em alcance curto.', level: 3, attr: 'SAB' },
    { name: 'Raio solar', type: 'Magia', cost: 4, effect: '2d6 + SAB. Não-mortos/trevas: desvantagem no save.', level: 5, attr: 'SAB' },
    { name: 'Reviver', type: 'Suporte', cost: 8, effect: 'Aliado com 0 PV estável e volta com 1d4 PV. Uma vez por descanso.', level: 7, attr: 'SAB' },
    { name: 'Julgamento', type: 'Magia', cost: 5, effect: '2d8 + SAB. Alvo teste SAB ou atordoado 1 rodada.', level: 9, attr: 'SAB' },
    { name: 'Cura em massa', type: 'Suporte', cost: 6, effect: 'Aliados em alcance curto recuperam 1d6 + SAB de PV.', level: 11, attr: 'SAB' },
    { name: 'Intervenção divina', type: 'Suporte', cost: 10, effect: 'Milagre único (critério do mestre). Uma vez por campanha.', level: 15, attr: 'SAB' },
  ],
  ladino: [
    { name: 'Ataque furtivo', type: 'Ataque', cost: 0, effect: '1d6 + DES. Com vantagem ou flanqueado: +2d6.', level: 1, attr: 'DES' },
    { name: 'Finta', type: 'Suporte', cost: 1, effect: 'Próximo ataque contra um alvo tem vantagem.', level: 2, attr: 'DES' },
    { name: 'Veneno', type: 'Suporte', cost: 2, effect: 'Próxima arma: alvo CON CD 15 ou perde a ação no próximo turno.', level: 3, attr: 'DES' },
    { name: 'Golpe preciso', type: 'Ataque', cost: 3, effect: '2d6 + DES. Ignora metade da defesa do alvo.', level: 5, attr: 'DES' },
    { name: 'Esconder-se', type: 'Suporte', cost: 0, effect: 'Teste DES (furtividade). Se passar, fica escondido até mover ou atacar.', level: 1, attr: 'DES' },
    { name: 'Sombra', type: 'Suporte', cost: 4, effect: 'Invisível até seu próximo turno ou até atacar. Uma vez por cena.', level: 7, attr: 'DES' },
    { name: 'Múltiplos alvos', type: 'Ataque', cost: 4, effect: 'Dois ataques (1d6 + DES cada). Pode aplicar Ataque furtivo em um.', level: 9, attr: 'DES' },
    { name: 'Golpe letal', type: 'Ataque', cost: 6, effect: '3d6 + DES. Surpreso/imóvel: dobra. Uma vez por descanso.', level: 11, attr: 'DES' },
    { name: 'Reflexos', type: 'Suporte', cost: 2, effect: 'Reação: +4 defesa contra um ataque.', level: 13, attr: 'DES' },
    { name: 'Mestre das sombras', type: 'Suporte', cost: 5, effect: 'Teleporta até 6 m para penumbra/escuro. Uma vez por cena.', level: 15, attr: 'DES' },
  ],
}

export function getAbilitiesByClass(classId: string, characterLevel: number): Ability[] {
  const list = byClass[classId] ?? []
  return list
    .filter((a) => a.level <= characterLevel)
    .map((a, i) => ({ ...a, id: `${classId}-${a.name}-${i}` }))
}

export function getAllAbilitiesByClass(classId: string): Ability[] {
  const list = byClass[classId] ?? []
  return list.map((a, i) => ({ ...a, id: `${classId}-${a.name}-${i}` }))
}
