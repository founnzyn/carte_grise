# Plateforme Carte Grise – Monorepo

Ce dépôt contient :
- `frontend/` : application Next.js orientée utilisateurs (simulateur, dépôt dossiers).
- `backend/` : API NestJS gérant workflow et calculs.

## Prérequis
- Node.js 20+
- npm 10+

## Installation
```powershell
npm install
```

## Base de données
Le projet utilise PostgreSQL et Prisma ORM.

**Options pour PostgreSQL :**
- Installation locale : PostgreSQL 16+ (téléchargeable depuis postgresql.org)
- Cloud gratuit : Supabase, Neon.tech, ou ElephantSQL

**Configuration :**

1. Copier `.env.example` vers `.env` dans `/backend`.

2. Mettre à jour `DATABASE_URL` avec vos identifiants :
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/carte_grise?schema=public"
```

3. Générer le client Prisma et appliquer les migrations :
```powershell
cd backend
npm run prisma:generate
npm run prisma:migrate
```

4. (Optionnel) Ouvrir Prisma Studio pour explorer la base :
```powershell
npm run prisma:studio
```

## Commandes utiles
- `npm run dev:frontend` : lance l’application Next.js en mode développement.
- `npm run dev:backend` : démarre l’API NestJS en mode watch.
- `npm run dev` : lance front + back en parallèle (nécessite `concurrently`).

## Structure
```
frontend/
  app/
  components/
  styles/
backend/
  src/
  test/
```

Chaque sous-projet dispose de son propre `README` détaillant les commandes spécifiques et la configuration.
