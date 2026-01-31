# Projeto D&D — Personagens, Habilidades e Ranking

Sistema de RPG inspirado em D&D para criar e gerenciar personagens, com **raças**, **classes**, **atributos**, **habilidades** e **ranking** por tiers (Cobre → Champion).

## Conteúdo do repositório

- **`frontend/`** — Aplicação web (React + Vite + TypeScript)
- **`docs/`** — Livro de regras, design do sistema e ficha de personagem

## Como rodar o frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

Para mais detalhes, veja o [README do frontend](frontend/README.md).

## Funcionalidades

- **Criação de personagem** em 3 etapas: Identidade → Atributos (1–50) → Revisão
- **Ficha do personagem:** atributos, PV/PM, XP, vitórias, habilidades da classe, traços da raça
- **Ranking:** pontuação e tiers (Cobre, Bronze, Prata, Ouro, Platina, Esmeralda, Diamante, Champion)
- **Tutorial** na página inicial
- Persistência em **localStorage** (sem backend)

## Tecnologias

- React 18, TypeScript, Vite 5, React Router 6
