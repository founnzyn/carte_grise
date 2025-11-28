FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm ci

# Générer le client Prisma
RUN npx prisma generate

# Copier le code source
COPY . .

# Build l'application
RUN npm run build

# Exposer le port
EXPOSE 4000

# Commande de démarrage
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
