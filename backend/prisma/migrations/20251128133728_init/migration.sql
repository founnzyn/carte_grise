-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'SUPPORT', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIF', 'SUSPENDU', 'SUPPRIME');

-- CreateEnum
CREATE TYPE "DossierStatus" AS ENUM ('NOUVEAU', 'PAIEMENT_CONFIRME', 'PIECES_EN_COURS', 'PIECES_MANQUANTES', 'PREPARATION_ANTS', 'DEPOSE_ANTS', 'ANTS_EN_COURS', 'ANTS_VALIDE', 'LIVRAISON', 'CLOTURE', 'ANNULE');

-- CreateEnum
CREATE TYPE "PaiementStatus" AS ENUM ('EN_ATTENTE', 'VALIDE', 'ECHOUE', 'REMBOURSE');

-- CreateEnum
CREATE TYPE "ImportType" AS ENUM ('NONE', 'UE', 'HORS_UE');

-- CreateEnum
CREATE TYPE "DocStatus" AS ENUM ('EN_ATTENTE', 'VALIDE', 'REFUSE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "statut" "UserStatus" NOT NULL DEFAULT 'ACTIF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dossier" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "statut" "DossierStatus" NOT NULL DEFAULT 'NOUVEAU',
    "region" TEXT NOT NULL,
    "montantTotal" DOUBLE PRECISION,
    "paiementStatut" "PaiementStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "antsReference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dossier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicule" (
    "id" TEXT NOT NULL,
    "dossierId" TEXT NOT NULL,
    "vin" TEXT,
    "marque" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "puissanceFiscale" INTEGER NOT NULL,
    "co2" INTEGER NOT NULL,
    "origine" TEXT NOT NULL DEFAULT 'FR',
    "importType" "ImportType" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vehicule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "dossierId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "urlChiffree" TEXT NOT NULL,
    "checksum" TEXT NOT NULL,
    "statut" "DocStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DossierEvenement" (
    "id" TEXT NOT NULL,
    "dossierId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payloadJson" JSONB NOT NULL,
    "auteurId" TEXT,
    "horodatage" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DossierEvenement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" TEXT NOT NULL,
    "dossierId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "intentId" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "devise" TEXT NOT NULL DEFAULT 'EUR',
    "statut" "PaiementStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "factureUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigurationFees" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "montant" DOUBLE PRECISION,
    "pourcentage" DOUBLE PRECISION,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "updatedBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfigurationFees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dossier_reference_key" ON "Dossier"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicule_dossierId_key" ON "Vehicule"("dossierId");

-- CreateIndex
CREATE UNIQUE INDEX "Paiement_intentId_key" ON "Paiement"("intentId");

-- CreateIndex
CREATE UNIQUE INDEX "ConfigurationFees_type_key" ON "ConfigurationFees"("type");

-- AddForeignKey
ALTER TABLE "Dossier" ADD CONSTRAINT "Dossier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DossierEvenement" ADD CONSTRAINT "DossierEvenement_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_dossierId_fkey" FOREIGN KEY ("dossierId") REFERENCES "Dossier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
