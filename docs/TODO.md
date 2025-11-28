# TODO – Plateforme Carte Grise

## 1. Légal & Produit
- [ ] Collecter barèmes officiels (taxe régionale, CO₂, malus, exonérations) et planifier mise à jour trimestrielle.
- [ ] Lister pièces obligatoires par typologie (neuf, occasion, import UE/hors UE, pro) + justificatifs acceptés.
- [ ] Documenter workflow manuel ANTS (acteurs, délais, points de friction) et définir SLA internes.
- [ ] Rédiger user stories principales (simulateur, dépôt dossier, paiement, suivi, admin) avec critères d’acceptation.
- [ ] Préparer mentions légales, CGU, politique confidentialité, politique cookies.

## 2. UX/UI
- [ ] Créer moodboard et palette “automotive premium” (tons sombres, accents rouge/orange, textures métal/carbone).
- [ ] Définir design system (typo, composants formulaires, boutons, cartes, graphiques) + guidelines accessibilité.
- [ ] Produire wireframes low/high fidelity : landing, simulateur, inscription, formulaire multi-étapes, dashboard client, back-office.
- [ ] Tester prototypes auprès d’un panel (clients finaux + équipe interne) et intégrer feedbacks.

## 3. Front-end Public
- [ ] Développer landing page responsive avec storytelling, CTA simulateur et FAQ réglementaire.
- [ ] Implémenter simulateur interactif (puissance fiscale, région, CO₂, import) avec résultats détaillés et frais paramétrables.
- [ ] Construire formulaires dossier (multi-step, sauvegarde auto, upload sécurisé, validation en temps réel).
- [ ] Créer espace client : suivi d’état, checklist pièces, historique paiements, centre de notification.
- [ ] Intégrer analytics (Matomo/GA4) avec respect RGPD (consentement, anonymisation).

## 4. Back-end & Services
- [ ] Mettre en place API auth (OAuth2/Passkeys) avec rôles (client, support, admin) et MFA optionnel.
- [ ] Concevoir moteur de tarification paramétrable (barèmes en base + overrides admin) avec cache et versioning.
- [ ] Développer gestion documents : stockage chiffré, antivirus, expiration, métadonnées.
- [ ] Implémenter workflow dossiers (états, transitions, commentaires internes, horodatage) + triggers notifications.
- [ ] Créer module export ANTS : génération PDF/ZIP, checklist, numéro dossier, journaux d’actions.
- [ ] Exposer API internes pour paiement, notifications, rapports.

## 5. Paiement & Facturation
- [ ] Choisir PSP (Stripe/Payplug) et configurer modes (CB, virement, éventuel 3x) + conformité SCA.
- [ ] Implémenter parcours paiement (intent, confirmation, webhooks) et gestion des statuts.
- [ ] Générer factures PDF, intégration TVA, numérotation légale, espace téléchargement client.
- [ ] Prévoir remboursements/avoirs (annulation dossier) et rapprochement comptable.

## 6. Notifications & Communication
- [ ] Définir templates email/SMS par état (création, paiement, pièces manquantes, dépôt ANTS, validation, expédition, relances).
- [ ] Intégrer service email transactionnel (Sendinblue, Mailjet, AWS SES) et SMS (OVH SMS, Twilio, MessageBird).
- [ ] Construire centre de notifications admin (historique, statut d’envoi, renvoi manuel, personnalisation message).
- [ ] Ajouter préférences utilisateurs (opt-in SMS, horaires communications) et conformité CNIL.

## 7. Back-office & Ops
- [ ] Développer tableau de bord support : file dossiers, filtres, actions rapides, ajout notes internes.
- [ ] Interface configuration frais (valeur fixe, pourcentage, promos ponctuelles) avec prévisualisation simulateur.
- [ ] Mise en place KPIs (volume dossiers, délais moyen, taux relances) + graphiques.
- [ ] Générer exports compta (CSV/Excel) et journaux actions pour audit.
- [ ] Créer système de tâches internes (assignations, deadlines, rappels) lié au workflow.

## 8. Sécurité & Conformité
- [ ] Forcer HTTPS, CSP stricte, HSTS, protection CSRF, rate limiting.
- [ ] Chiffrement au repos (Base de données + stockage documents) via KMS/HSM.
- [ ] Gestion secrets (Vault/Azure Key Vault) et rotation régulière.
- [ ] Politique RGPD : registres traitements, consentement, droit d’accès/suppression, bannières cookies.
- [ ] Plan sauvegardes chiffrées, PRA/PCA, tests de restauration.
- [ ] Plan de tests sécurité (lint, SAST, DAST, pentest externe) et revue code.

## 9. Infrastructure & Qualité
- [ ] Configurer repo Git, conventions commits, protection branches.
- [ ] CI/CD (lint, tests unitaires, tests E2E Cypress/Playwright, scans sécurité) + déploiement infra as code.
- [ ] Mettre en place environnements dev/staging/prod séparés avec données anonymisées.
- [ ] Observabilité : logging structuré, traces, metrics (Prometheus/Grafana), alertes (PagerDuty).
- [ ] Préparer documentation ops + runbooks incidents.

## 10. Lancement & Post-Lancement
- [ ] Organiser bêta fermée, recueillir feedbacks, prioriser correctifs.
- [ ] Former support interne (scripts réponse, procédures ANTS, FAQ client).
- [ ] Mettre en place support multicanal (chat, email, téléphone) + SLA réponse.
- [ ] Créer contenu marketing (guides carte grise, blog, newsletter) optimisé SEO.
- [ ] Planifier roadmap V2 (signature électronique, intégration préfectures, PWA, offres pros).
