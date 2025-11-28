#!/bin/bash

echo "🚀 Déploiement de Carte Grise"
echo ""

# Vérifier si Git est configuré
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Aucun remote Git configuré"
    echo "📝 Configurez d'abord votre repo GitHub :"
    echo "   git remote add origin https://github.com/votre-username/carte_grise.git"
    exit 1
fi

# Commit et push
echo "📦 Commit des changements..."
git add .
git commit -m "🚀 Préparation pour le déploiement" || echo "Aucun changement à commiter"

echo "⬆️  Push vers GitHub..."
git push origin main

echo ""
echo "✅ Code poussé sur GitHub !"
echo ""
echo "📋 Prochaines étapes :"
echo ""
echo "1️⃣  BACKEND (Railway) :"
echo "   → Allez sur https://railway.app"
echo "   → New Project → Deploy from GitHub repo"
echo "   → Sélectionnez votre repo"
echo "   → Root Directory: backend"
echo "   → Ajoutez les variables d'environnement (DATABASE_URL, JWT_SECRET)"
echo ""
echo "2️⃣  FRONTEND (Vercel) :"
echo "   → Allez sur https://vercel.com"
echo "   → Add New Project"
echo "   → Importez votre repo"
echo "   → Root Directory: frontend"
echo "   → Ajoutez NEXT_PUBLIC_API_URL=https://[votre-backend].railway.app"
echo ""
echo "📖 Consultez DEPLOYMENT.md pour plus de détails"
echo ""
