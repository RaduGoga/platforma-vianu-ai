# Vianu AI, platformă de resurse

Clubul de inteligență artificială de la Colegiul Național Tudor Vianu și
programa lui: module cu lecții complete și o bibliotecă de resurse. Deschisă
oricui se pregătește pentru olimpiada de AI.

Live: https://vianu-ai.ro

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Fonturi: Montserrat (titluri/UI), Schibsted Grotesk (corp), JetBrains Mono
  (cod/etichete). Variabilele next/font stau pe `<html>`, nu pe `<body>`.
  Altfel aliasurile `--font-*` din `globals.css` nu se rezolvă.
- Deploy: Vercel

## Rulare locală

```bash
npm install
npm run dev
```

Se deschide pe http://localhost:3000.

```bash
npm run build   # build de producție
npm run lint    # verificare eslint
```

## Structură

```
src/
  app/
    page.tsx                 # acasă
    programa/                # cuprinsul, pe trei părți
      [slug]/                # pagina fiecărui modul, cu lecția completă
    resurse/                 # biblioteca de resurse, pe colecții, cu căutare
    despre/
  components/                # nav, footer, bara de module, carduri
  data/
    curriculum.ts            # modulele, semestrele, etapele
    lessons.ts               # lecțiile complete, pe modul (generat)
    resources.ts             # resursele
  lib/
    progress.ts              # reține ultima lecție deschisă, în localStorage
public/
  brand/                     # marca, wordmark-ul, imaginea OG
```

Conținutul stă ca date pure în `src/data`, ca să poată fi mutat într-o bază de
date (Supabase) în faza 2, când se adaugă conturi.

## Faza 2 (planificat)

Conturi pentru elevi, ca „continuă unde ai rămas" să meargă de pe orice
dispozitiv, nu doar din browserul curent.

## Surse pentru conținut

- Olimpiada Națională de IA (ONIA / RoAI): https://olimpiada-ai.ro/
- Programa oficială: https://olimpiada-ai.github.io/programa/
- MLCompete: https://platform.olimpiada-ai.ro/ro
- Nitro NLP: https://nitro-ai.org/nitro-nlp/2025/

Programa de pregătire e adaptată după programa clubului Vianu AI.
