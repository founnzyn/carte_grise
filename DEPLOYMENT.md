# 🚀 Guide de Déploiement - Carte Grise

## 📦 Prérequis

- Compte GitHub (gratuit)
- Compte Vercel (gratuit)
- Compte Railway ou Render (gratuit)
- Base de données Supabase (déjà configurée)

---

## 🎯 Déploiement Rapide

### 1️⃣ **Backend sur Railway**

#### Méthode 1 : Via le site web (Recommandé)

1. Allez sur [railway.app](https://railway.app)
2. Connectez-vous avec GitHub
3. Cliquez sur "New Project" → "Deploy from GitHub repo"
4. Sélectionnez votre repo `carte_grise`
5. Cliquez sur "Add variables" et ajoutez :
   ```
   DATABASE_URL=postgresql://postgres.txewysjxmesijfowczmv:BfDuK2BIpsen@aws-1-eu-west-3.pooler.supabase.com:5432/postgres
   DIRECT_URL=postgresql://postgres.txewysjxmesijfowczmv:BfDuK2BIpsen@aws-1-eu-west-3.pooler.supabase.com:5432/postgres
   JWT_SECRET=votre_secret_jwt_super_securise_production_2024
   PORT=4000
   ```
6. Dans "Settings" → "Root Directory", mettez `backend`
7. Déployez !

#### Méthode 2 : Via CLI

```bash
# Installer Railway CLI
npm i -g @railway/cli

# Se connecter
railway login

# Depuis le dossier backend
cd backend
railway init
railway add

# Ajouter les variables d'environnement
railway variables set DATABASE_URL="votre_url_supabase"
railway variables set JWT_SECRET="votre_secret"

# Déployer
railway up
```

**Votre API sera accessible sur** : `https://[votre-projet].railway.app`

---

### 2️⃣ **Frontend sur Vercel**

#### Méthode 1 : Via le site web (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Cliquez sur "Add New" → "Project"
4. Sélectionnez votre repo `carte_grise`
5. Dans "Framework Preset", sélectionnez "Next.js"
6. Dans "Root Directory", cliquez sur "Edit" et sélectionnez `frontend`
7. Ajoutez la variable d'environnement :
   ```
   NEXT_PUBLIC_API_URL=https://[votre-backend].railway.app
   ```
8. Cliquez sur "Deploy"

#### Méthode 2 : Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Depuis le dossier frontend
cd frontend
vercel

# Suivre les instructions
# Lors du déploiement, ajoutez la variable :
vercel env add NEXT_PUBLIC_API_URL
# Entrez : https://[votre-backend].railway.app
```

**Votre site sera accessible sur** : `https://[votre-projet].vercel.app`

---

## 🔧 Configuration du CORS (Important!)

Une fois le frontend déployé, ajoutez son URL au backend.

Éditez `backend/src/main.ts` :

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://votre-frontend.vercel.app',  // ← Ajoutez votre URL Vercel
  ],
  credentials: true,
});
```

Puis redéployez le backend :
```bash
cd backend
railway up  # ou git push si auto-deploy activé
```

---

## 🌐 Option Alternative : Netlify + Render

### Backend sur Render

1. Allez sur [render.com](https://render.com)
2. "New +" → "Web Service"
3. Connectez GitHub et sélectionnez votre repo
4. Configuration :
   - **Name** : `carte-grise-api`
   - **Root Directory** : `backend`
   - **Runtime** : Node
   - **Build Command** : `npm install && npx prisma generate && npm run build`
   - **Start Command** : `npx prisma migrate deploy && npm start`
   - **Plan** : Free

5. Environment Variables :
   ```
   DATABASE_URL=votre_url_supabase
   DIRECT_URL=votre_url_supabase
   JWT_SECRET=votre_secret
   ```

### Frontend sur Netlify

1. Allez sur [netlify.com](https://netlify.com)
2. "Add new site" → "Import an existing project"
3. Connectez GitHub
4. Configuration :
   - **Base directory** : `frontend`
   - **Build command** : `npm run build`
   - **Publish directory** : `frontend/.next`
   - **Environment variables** :
     ```
     NEXT_PUBLIC_API_URL=https://votre-backend.onrender.com
     ```

---

## 🔒 Sécurité pour la Production

1. **Changez le JWT_SECRET** :
   ```bash
   # Générer un secret fort
   openssl rand -base64 32
   ```

2. **Activez HTTPS** : Automatique sur Vercel/Railway/Render

3. **Limitez le CORS** : N'autorisez que vos domaines

4. **Variables d'environnement** : Ne jamais commit les fichiers `.env`

---

## 📱 Domaine Personnalisé (Optionnel)

### Sur Vercel
1. "Settings" → "Domains"
2. Ajoutez votre domaine
3. Configurez les DNS chez votre registrar

### Sur Railway
1. "Settings" → "Domains"
2. "Custom Domain" → Ajoutez votre domaine
3. Configurez les DNS

---

## 🎉 Récapitulatif

✅ **Backend** : Railway ou Render (gratuit)
✅ **Frontend** : Vercel ou Netlify (gratuit)
✅ **Base de données** : Supabase (déjà configurée)
✅ **Domaine** : Gratuit (.vercel.app) ou personnalisé

**Coût total** : **0€/mois** avec les plans gratuits !

---

## 🆘 Problèmes Courants

### Erreur de connexion DB
- Vérifiez que `DATABASE_URL` est bien configurée
- Assurez-vous que Supabase autorise les connexions depuis Railway/Render

### Erreur CORS
- Ajoutez l'URL Vercel dans le CORS du backend
- Redéployez le backend

### Build qui échoue
- Vérifiez les logs sur Railway/Vercel
- Assurez-vous que `prisma generate` s'exécute avant le build

---

## 📞 Support

En cas de problème, vérifiez :
- Les logs sur Railway/Vercel
- Les variables d'environnement
- La connexion à Supabase

Bon déploiement ! 🚀
