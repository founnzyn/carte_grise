# Frontend – Carte Grise

Application Next.js (App Router) servant l’interface publique : landing, simulateur, formulaires, espace client.

## Scripts
- `npm run dev` : démarre Next.js sur http://localhost:3000.
- `npm run build` : build production.
- `npm run start` : lancement build.
- `npm run lint` : ESLint (config Next).

## Notes
- TailwindCSS pour le design system (voir `tailwind.config.ts`).
- `SimulatorCard` calcule une estimation fictive. Connecter ultérieurement à l’API `/simulate`.
- Palette et composants alignés sur l’identité “automotive premium”.
