# D&D — Frontend

Aplicação web para criar e gerenciar personagens do sistema D&D (personagens, habilidades e ranking).

## Tecnologias

- **React 18** + **TypeScript**
- **Vite 5**
- **React Router 6**
- Persistência em **localStorage** (sem backend)

## Como rodar

```bash
cd frontend
npm install
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

Saída em `dist/`. Para preview: `npm run preview`.

## Funcionalidades

- **Início:** lista de personagens e ranking (por pontuação)
- **Novo personagem:** nome, raça, classe, atributos (rolagem ou array padrão)
- **Ficha do personagem:** atributos, PV/PM, XP, vitórias, pontuação, tier, habilidades da classe
- **Ranking:** tiers Bronze → Prata → Ouro → Platina → Diamante → Lendário
- Tema visual inspirado em fantasia (parchment, tipografia Cinzel/Crimson Text)

## Estrutura

- `src/data/` — raças, classes, habilidades, tiers, XP/PM
- `src/hooks/useCharacters.ts` — CRUD e ranking (localStorage)
- `src/pages/` — Home, CreateCharacter, CharacterDetail
- `src/utils/characterCreate.ts` — cálculo de PV/PM e bônus de raça
