# Architecture Technique – Plateforme Carte Grise

## 1. Vue d’ensemble
- **Front-end** : Next.js 15 (React) + TypeScript, rendu hybride (SSR/ISR) pour SEO, Tailwind/Chakra pour design system.
- **Back-end** : NestJS (Node.js 20) + TypeScript, micro-services modulaires (auth, tarification, dossiers, notifications), éventuellement monorepo Nx.
- **Base de données** : PostgreSQL 16 (schema multi-tenants simple), chiffrage at-rest, partitionnement tables volumineuses (journal événements, notifications).
- **Stockage fichiers** : Object storage (Azure Blob/OVH Public Cloud) avec chiffrement côté serveur + antivirus (ClamAV). Liens signés temporaires.
- **Infra** : Conteneurs Docker orchestrés (Azure Container Apps/Kubernetes) + IaC (Terraform/Bicep). CDN (Azure Front Door/Cloudflare) pour assets.

## 2. Modules principaux
1. **Gateway / API Public**
   - GraphQL + REST minimal (pour compatibilité) via NestJS.
   - Rate limiting, validation schéma (Zod/class-validator), pagination uniforme.
2. **Auth & Identity**
   - OAuth2.1 / OIDC (Keycloak/Auth0) ou module NestJS Passport.
   - Support Passkeys/WebAuthn + fallback email/password sécurisé.
   - Gestion rôles : `client`, `support`, `admin`.
3. **Tarification & Simulateur**
   - Service dédié consommant barèmes stockés en base.
   - Caching Redis pour résultats répétitifs.
   - Versioning barèmes + historique modifications.
4. **Gestion Dossiers**
   - Agrégation données utilisateur, véhicule, paiement, documents, workflow.
   - Event store (table `dossier_events`) pour audit complet.
5. **Documents & Uploads**
   - Upload direct vers storage via liens présignés.
   - Scan antivirus, classification, métadonnées (type pièce, expiration, hash).
   - Règles de rétention et purge automatisée.
6. **Workflow & Notifications**
   - State machine (XState ou module maison) orchestrant transitions.
   - File de jobs (BullMQ/Redis) pour envoyer emails/SMS et effectuer exports ANTS.
7. **Paiements**
   - Intégration Stripe/Payplug via webhooks sécurisés (signature vérifiée).
   - Stockage tokenisé, pas de données carte en base.
   - Génération factures (service PDF via Puppeteer/WeasyPrint).
8. **Exports ANTS**
   - Génération PDF/ZIP (dossier complet) + feuille route.
   - Checklist interactive et suivi manuel (date dépôt, n° dossier).
9. **Admin / Back-office**
   - Application Next.js protégée (layout admin) ou app séparée (React + Vite) consommant la même API.

## 3. Modèle de données (simplifié)
```
Utilisateur(id, email, nom, rôle, statut, created_at)
Vehicule(id, dossier_id, vin, marque, modele, puissance_fiscale, co2, origine, import_type)
Dossier(id, reference, utilisateur_id, statut, region, montant_total, paiement_statut, ants_reference, created_at, updated_at)
DossierEvenement(id, dossier_id, type, payload_json, auteur_id, horodatage)
Document(id, dossier_id, type, url_chiffree, checksum, statut, uploaded_at)
Paiement(id, dossier_id, provider, intent_id, montant, devise, statut, facture_url, created_at)
Tarif(id, type, region, valeur, date_effet, date_fin)
Notification(id, dossier_id, canal, template, payload_json, statut, tentative, sent_at)
TacheInterne(id, dossier_id, assignee_id, titre, priorité, due_at, statut)
ConfigurationFees(id, type, montant, pourcentage, actif, updated_by)
```

## 4. Sécurité & Conformité
- **Chiffrement** : TLS 1.3, stockage chiffré (KMS). Hash mots de passe Argon2id.
- **Secrets** : Azure Key Vault/Hashicorp Vault, rotation automatique.
- **RGPD** : data minimization, anonymisation sur environnements non-prod, outils de purge/droit à l’effacement.
- **Audit** : journaux immuables (WORM) pour actions admin, exports, consultations docs.
- **Tests sécurité** : SAST (Semgrep), DAST (OWASP ZAP), Pentest externe phase 5.

## 5. Intégrations externes
- **PSP** : Stripe/Payplug (API Payment Intents, Webhooks, refunds).
- **Email/SMS** : Brevo (Sendinblue) + MessageBird/Twilio.
- **Analytics** : Matomo self-hosted pour conformité, events envoyés côté serveur pour suivi conversions.
- **Support** : outil helpdesk (Intercom/Zendesk) connecté via webhook pour afficher statut dossier.

## 6. Observabilité & Ops
- **Logging** : Pino JSON → Loki/Elastic. Corrélation via traceId.
- **Metrics** : Prometheus + Grafana dashboards (latence API, jobs, file BullMQ, succès notifications).
- **Tracing** : OpenTelemetry (OTLP) branché sur Jaeger/Tempo.
- **CI/CD** : GitHub Actions/Azure DevOps pipelines (lint, tests, scans, déploiement infra + app).
- **Backups** : PostgreSQL PITR, snapshots storage, test restauration mensuelle.

## 7. Scalabilité & Résilience
- Front statique cache CDN + edge functions pour simulateur low-latency.
- Services backend horizontaux (auto-scale) + circuit breakers pour dépendances.
- Files BullMQ répliquées, Redis cluster (TLS, auth) + backup RDB/AOF.
- Mode dégradé : simulateur fonctionnel même si services dossier/paiement indisponibles (message info client).

## 8. Roadmap technique
1. Mettre en place monorepo Nx, packages partagés (UI, types, utils).
2. Scaffold Next.js + NestJS + Postgres via Docker Compose pour dev local.
3. Implémenter auth + simulateur (lecture barèmes) en priorité.
4. Ajouter workflow dossiers + upload documents.
5. Intégrer paiements + notifications.
6. Finaliser exports ANTS, back-office complet, observabilité.
