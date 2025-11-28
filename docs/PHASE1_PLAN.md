# Phase 1 – Discovery & Légal (Semaines 1-2)

## Objectifs
- Sécuriser l’assise réglementaire et documentaire du service carte grise (France + import).
- Comprendre en détail le parcours ANTS manuel et définir un SLA interne réaliste.
- Formaliser les besoins fonctionnels (users stories) et préparer les livrables de design/tech des phases suivantes.

## Organisation & Rôles
| Rôle | Responsable | Livrables |
| --- | --- | --- |
| Chef de projet | Vous (gérant) | Validation scope, arbitrage priorités |
| Expert légal / conformité | Consultant externe ou support interne | Dossier réglementaire, registre traitements |
| UX lead | Designer | Personas, parcours, wireframes low-fi |
| Tech lead | Architecte | ADR préliminaire, inventaire techno |
| Ops/Support | Collaborateur interne | Process ANTS manuel, matrices SLA |

## Planning détaillé
### Semaine 1
1. **Kick-off & cadrage**
   - Réunion lancement (objectifs, contraintes, planning global).
   - Création backlog Jira/Linear + conventions de suivi.
2. **Audit réglementaire**
   - Collecte barèmes officiels (taxe régionale, CO₂, malus, heuristiques import).
   - Identification des exonérations par région/catégorie (véhicules propres, handicap, etc.).
   - Synthèse droits/devoirs opérateur carte grise (obligations d’information, documents à archiver).
3. **Process ANTS manuel**
   - Interview interne : étapes actuelles, délais, outils utilisés.
   - Cartographie BPMN du processus “de dépôt à validation”.
   - Définition des points de contrôle qualité et des données à stocker.
4. **Personas & scénarios**
   - Persona “Particulier achat neuf/occasion”, “Importateur perso”, “Gérant interne”.
   - User journeys high-level (simulateur, dépôt, suivi, traitement interne).

### Semaine 2
1. **User stories & critères d’acceptation**
   - Rédaction backlog fonctionnel priorisé (MoSCoW) couvrant front, back, admin.
   - Définition KPI & objectifs (temps dossier, taux conversion simulateur → dépôt).
2. **Exigences légales & RGPD**
   - Registre des traitements : données collectées, base légale, durée conservation.
   - Analyse risques CNIL, plan consentement cookies, modalités droit d’accès/suppression.
3. **Livrables design préliminaires**
   - Moodboard + palette.
   - Wireframes low-fi landing/simulateur/formulaire/dashboard.
   - Feedback initial stakeholders.
4. **Pré-architecture**
   - Liste contraintes techniques (volume, scalabilité, intégrations futures).
   - Ébauche data model haute niveau.
   - Liste dépendances externes (paiement, SMS, stockage).
5. **Clôture Phase 1**
   - Réunion validation livrables.
   - Go/No-Go Phase 2 + plan d’action correctifs éventuels.

## Livrables attendus
- Dossier réglementaire consolidé (PDF/Notion) + tableur barèmes.
- Processus ANTS détaillé (diagramme + checklists).
- Personas, user journeys, wireframes low-fi.
- Backlog user stories priorisé avec critères d’acceptation.
- Registre traitements RGPD initial.
- Note d’architecture préliminaire (contraintes, pistes techno).

## Indicateurs de succès
- 100 % des barèmes et documents requis identifiés et validés.
- Process ANTS manuel modélisé avec SLA cibles approuvés.
- Backlog Phase 2 alimenté (≥ 80 % user stories majeures documentées).
- Risques réglementaires listés avec plans de mitigation.
- Stakeholders alignés sur parcours cible et design direction.
