# Carte Grise - Plateforme de Gestion en France

Plateforme web complète pour la gestion de cartes grises en France. Service en ligne agréé pour toutes vos démarches d'immatriculation.

## 🚗 Fonctionnalités

- **Simulateur de taxes** : Calcul précis du coût de votre carte grise basé sur les taux régionaux officiels
- **Formulaire multi-étapes** : Demande guidée et intuitive pour toutes les démarches
- **Authentification JWT** : Système sécurisé avec refresh tokens
- **Gestion de dossiers** : Suivi en temps réel de vos demandes
- **Notifications professionnelles** : Alertes pour les pros sur l'état des dossiers
- **Conformité RGPD** : Export de données, droit à l'oubli, consentement explicite

## 🛠️ Stack Technique

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling avec design premium automobile
- **React** - Composants fonctionnels avec hooks

### Backend
- **NestJS** - Framework Node.js modulaire
- **Prisma** - ORM moderne pour PostgreSQL
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification sécurisée
- **Swagger** - Documentation API

## 📁 Structure du Projet

```
carte_grise/
├── frontend/                # Application Next.js 14
│   ├── src/
│   │   ├── app/            # Routes App Router
│   │   │   ├── page.tsx    # Page d'accueil
│   │   │   ├── simulateur/ # Simulateur de taxes
│   │   │   ├── demarches/  # Formulaire multi-étapes
│   │   │   ├── connexion/  # Page de connexion
│   │   │   └── inscription/# Page d'inscription
│   │   └── components/     # Composants réutilisables
│   │       ├── layout/     # Header, Footer
│   │       └── simulator/  # Simulateur de taxes
│   └── tailwind.config.ts  # Configuration Tailwind
│
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/           # Authentification JWT
│   │   ├── users/          # Gestion utilisateurs
│   │   ├── dossiers/       # Gestion des dossiers
│   │   ├── tax-calculator/ # Calcul des taxes
│   │   ├── notifications/  # Notifications
│   │   └── prisma/         # Service Prisma
│   └── prisma/
│       └── schema.prisma   # Schéma de base de données
│
└── README.md
```

## 🚀 Installation

### Prérequis
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Backend

```bash
cd backend

# Installation des dépendances
npm install

# Configuration de l'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# Génération du client Prisma
npx prisma generate

# Migration de la base de données
npx prisma migrate dev

# Lancement en développement
npm run start:dev
```

### Frontend

```bash
cd frontend

# Installation des dépendances
npm install

# Configuration de l'environnement
echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api" > .env.local

# Lancement en développement
npm run dev
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/refresh` - Rafraîchir le token
- `POST /api/auth/logout` - Déconnexion

### Tax Calculator
- `POST /api/tax-calculator/calculate` - Calculer le prix d'une carte grise
- `GET /api/tax-calculator/departments` - Liste des départements
- `GET /api/tax-calculator/eco-malus` - Barème du malus écologique

### Dossiers
- `POST /api/dossiers` - Créer un dossier
- `GET /api/dossiers` - Liste des dossiers
- `GET /api/dossiers/:id` - Détails d'un dossier
- `PUT /api/dossiers/:id` - Modifier un dossier
- `POST /api/dossiers/:id/submit` - Soumettre un dossier
- `POST /api/dossiers/:id/ants` - Soumettre à l'ANTS (workflow interne)

### Users
- `GET /api/users/profile` - Mon profil
- `PUT /api/users/profile` - Modifier mon profil
- `GET /api/users/export` - Exporter mes données (RGPD)
- `DELETE /api/users/account` - Supprimer mon compte (RGPD)

### Notifications
- `GET /api/notifications` - Mes notifications
- `POST /api/notifications/:id/read` - Marquer comme lue
- `POST /api/notifications/read-all` - Tout marquer comme lu

## 🔐 Sécurité

- Authentification JWT avec refresh tokens
- Hachage des mots de passe avec bcrypt (12 rounds)
- Validation des entrées avec class-validator
- Protection CORS configurée
- Conformité RGPD intégrée

## 🎨 Design

Le design suit une charte graphique "automotive premium" avec :
- Palette de couleurs professionnelle (bleu primaire #0056e6)
- Composants Cards avec ombres et transitions fluides
- Formulaires ergonomiques multi-étapes
- Responsive design mobile-first
- Animations CSS subtiles

## 📝 Workflow ANTS

Le système utilise un workflow interne pour les dépôts manuels ANTS :
1. Le client soumet son dossier en ligne
2. L'équipe vérifie les documents
3. Le dossier est marqué "APPROVED"
4. Un professionnel effectue la soumission manuelle sur le portail ANTS
5. Le statut passe à "ANTS_SUBMITTED" avec la référence ANTS
6. Une fois traité, le statut devient "COMPLETED"

## 📄 License

Ce projet est sous licence privée. Tous droits réservés.