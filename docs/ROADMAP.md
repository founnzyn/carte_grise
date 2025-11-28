# Roadmap – Plateforme Carte Grise France

## Vision
- Plateforme digitale couvrant simulation, dépôt de dossier, paiement sécurisé et suivi.
- Workflow interne optimisé pour dépôts manuels sur l’ANTS, sans intégration API directe.
- Design automobile premium, conformité légale, RGPD et haute sécurité.

## Phases & Jalons

### Phase 1 – Discovery & Légal (Semaines 1-2)
- Audit réglementaire : taxes Y1-Y5, bonus/malus, exonérations, véhicules import.
- Recensement exigences documentaires (particulier, pro, import).
- Analyse processus ANTS manuel et contraintes d’accès compte pro.
- Personas & parcours (usager, gérant) + cahier des charges fonctionnel.
- Livrables : dossier réglementaire, backlog initial, user journeys validés.

### Phase 2 – UX/UI & Architecture (Semaines 3-4)
- Moodboard & design system “automotive premium”.
- Wireframes high-level (landing, simulateur, formulaire, dashboard client, back-office).
- Architecture technique (Next.js/NestJS/PostgreSQL proposés) + schéma données.
- Prototypage Figma interactif + validation stakeholders.
- Livrables : kit UI, prototypes, ADR architecture, plan tests.

### Phase 3 – Développement Core (Semaines 5-8)
- Front public : landing, simulateur taxes dynamiques, formulaires multi-étapes.
- Auth sécurisée (OAuth2/Passkeys), espace client (suivi, uploads, paiements).
- Back-office : gestion dossiers, frais paramétrables, workflow états.
- Services backend : moteur tarification, documents sécurisés, notifications.
- Livrables : MVP fonctionnel sur environnement de préproduction.

### Phase 4 – Intégrations & Automatisation interne (Semaines 9-10)
- Paiements (Stripe/Payplug), génération factures, webhooks.
- Module export ANTS : génération PDF/ZIP, checklist dépôt, suivi manuel.
- Notifications pro multi-canal (email/SMS) liées aux états workflow.
- Automatisation interne : tâches planifiées, relances, rapports périodiques.
- Livrables : flux paiement bout-en-bout, exports ANTS testés, templates notifications validés.

### Phase 5 – Sécurité, Conformité & Ops (Semaines 11-12)
- Pentest applicatif, audit RGPD (registre, DPA, consentement).
- Mise en place CI/CD, Infrastructure as Code, monitoring (logs, metrics, alertes).
- Documentation légale (CGU, politique confidentialité, mentions légales).
- Bêta fermée, collecte retours, corrections finales.
- Livrables : rapport sécurité, pack compliance, plateforme prête à lancer.

### Phase 6 – Lancement & Améliorations (Post Semaine 12)
- Lancement public progressif, support client structuré.
- Tableaux KPI (conversion, délais dossier, satisfaction) + boucle d’amélioration.
- Backlog évolutif : signature électronique, support import pro, PWA/offline.

## Dépendances clés
- Accès données officielles taxes régionales et barèmes malus.
- Fournisseur paiement + contrat VAD validé.
- Prestataire SMS, service mail transactionnel (ex. Sendinblue/Notify). 
- Solutions de stockage chiffré & hébergement conforme (OVHcloud/Azure/Scaleway).

## Risques & Mitigation
- **Complexité réglementaire** : maintien veille légale, module tarifs paramétrable.
- **Charge manuelle ANTS** : exports automatisés + suivi SLA interne.
- **Sécurité données** : chiffrement bout-en-bout, audits réguliers.
- **Adoption UX** : tests utilisateurs itératifs, analytics intégrés.

## Prochaines étapes
1. Valider backlog Phase 1 et assigner responsables.
2. Démarrer collecte barèmes + exigences documentaires.
3. Planifier ateliers UX/architecture avec stakeholders.
