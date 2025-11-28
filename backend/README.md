# Backend – Carte Grise API

API NestJS exposant les premières routes :
- `GET /health` : état basique.
- `POST /simulate` : estimation provisoire (mêmes règles que le simulateur front).

## Scripts
- `npm run start:dev` : mode développement (watch).
- `npm run build` : compilation TypeScript → dist.
- `npm run lint` : ESLint strict.
- `npm run test` : Jest.

## TODO
- Connecter base de données PostgreSQL.
- Ajouter authentification et workflow dossiers.
- Brancher moteur de tarification depuis sources officielles.
