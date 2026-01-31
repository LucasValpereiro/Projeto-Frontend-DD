# Design do Sistema D&D — Personagens, Habilidades e Ranking

## 1. Visão geral

Sistema de RPG inspirado em D&D com:
- **Personagens**: raça, classe, atributos, PV/PM, nível
- **Habilidades**: ataques, magias e suporte com custos e efeitos
- **Ranking**: níveis, XP e tiers (Bronze → Lendário)

---

## 2. Personagem

### 2.1 Atributos base (6)

| Atributo | Sigla | Uso principal |
|----------|--------|----------------|
| Força    | FOR   | Dano físico, carga |
| Destreza | DES   | Esquiva, precisão |
| Constituição | CON | PV, resistência |
| Inteligência | INT | Magias, conhecimento |
| Sabedoria | SAB  | Percepção, cura |
| Carisma  | CAR   | persuasão, liderança |

**Valor típico:** 8–18 (gerado por rolagem ou pontos).

### 2.2 Raças (exemplos)

| Raça   | Bônus atributo      | Traço especial        |
|--------|----------------------|------------------------|
| Humano | +1 em todos          | Versatilidade          |
| Elfo   | +2 DES, +1 SAB       | Visão no escuro        |
| Anão   | +2 CON, +1 FOR       | Resistência veneno     |
| Orc    | +2 FOR, +1 CON       | Fúria (dano +2 1x/descanso) |

### 2.3 Classes

| Classe    | Dado de vida | Foco           | Recursos |
|-----------|--------------|----------------|----------|
| Guerreiro | d10          | Combate corpo a corpo | PV alto, poucas magias |
| Mago      | d6           | Magia ofensiva/controle | PM alto, magias |
| Clérigo   | d8           | Cura e suporte | PM médio, magias divinas |
| Ladino    | d8           | Precisão e furtividade | Crítico, esquiva |

### 2.4 Nível e progressão

- **Nível:** 1–20
- **XP para subir:** tabela por nível (ex.: nível 2 = 300 XP, nível 3 = 900 XP).
- **PV:** base por classe + modificador CON por nível.
- **PM:** base por classe + modificador INT/SAB/CAR (conforme classe) por nível.

---

## 3. Habilidades

### 3.1 Estrutura de uma habilidade

- **Nome**
- **Tipo:** Ataque | Magia | Suporte
- **Custo:** PM ou “—” se livre
- **Efeito:** descrição (dano, cura, buff, debuff)
- **Nível desbloqueado:** em qual nível da classe a habilidade fica disponível
- **Atributo usado:** qual atributo define precisão/dano (ex.: FOR para golpe, INT para bola de fogo)

### 3.2 Exemplos por classe

**Guerreiro**
- Golpe pesado — Ataque — 0 PM — 1d10 + FOR — Nível 1
- Investida — Ataque — 2 PM — 2d8 + FOR, desloca — Nível 3
- Grito de guerra — Suporte — 3 PM — aliados +2 em próximo ataque — Nível 5

**Mago**
- Bola de fogo — Magia — 4 PM — 2d6 + INT em área — Nível 1
- Raio de gelo — Magia — 3 PM — 1d8 + INT, reduz DES 1 rodada — Nível 2
- Escudo arcano — Suporte — 2 PM — +4 defesa 2 rodadas — Nível 1

**Clérigo**
- Cura leve — Suporte — 2 PM — 1d8 + SAB PV — Nível 1
- Golpe sagrado — Magia — 3 PM — 1d6 + SAB, inimigo não-morto: dobro — Nível 2
- Bênção — Suporte — 4 PM — aliados +1 em ataques e saves 3 rodadas — Nível 4

**Ladino**
- Ataque furtivo — Ataque — 0 PM — 1d6 + DES, +2d6 se vantagem — Nível 1
- Veneno — Suporte — 2 PM — próxima arma: alvo CON 15 ou perde ação — Nível 3
- Finta — Suporte — 1 PM — próximo ataque com vantagem — Nível 2

---

## 4. Ranking

### 4.1 Métricas

- **Nível do personagem:** 1–20
- **XP total:** soma de todo XP ganho (campanhas, arenas, missões)
- **Vitórias:** número de combates/arenas ganhas (opcional)
- **Tier:** categoria por pontuação (ver abaixo)

### 4.2 Tiers (ranking por pontuação)

Pontuação = XP total + (Nível × 100) + (Vitórias × 50), ou fórmula similar.

| Tier       | Pontuação mínima (exemplo) | Cor/tema   |
|------------|----------------------------|------------|
| Bronze     | 0                          | Iniciante  |
| Prata      | 1 000                      | Aprendiz   |
| Ouro       | 5 000                      | Veterano   |
| Platina    | 15 000                     | Expert     |
| Diamante   | 30 000                     | Mestre     |
| Lendário   | 60 000                     | Lenda      |

### 4.3 Uso

- Leaderboard: ordenar por pontuação ou por nível.
- Exibição no personagem: nível, XP, tier atual e número de vitórias (se houver).

---

## 5. Resumo para implementação

- **Personagem:** raça, classe, 6 atributos, PV, PM, nível, XP, vitórias (opcional).
- **Habilidades:** lista por classe com nome, tipo, custo, efeito, nível e atributo.
- **Ranking:** cálculo de pontuação e tier; leaderboard por pontuação ou nível.

Com isso dá para implementar **Opção A** (só documento), **Opção C** (gerador de ficha + ranking) ou **Opção B** (app web) usando esses mesmos conceitos.
