
# MedHead – Frontend (React + Vite) – PoC

Frontend de la preuve de concept (PoC) **MedHead Consortium**.

Cette application web permet :

-   de sélectionner une spécialité médicale (référentiel NHS exposé par le backend) ;
    
-   de sélectionner une zone d’origine ;
    
-   d’obtenir une recommandation d’hôpital (distance/durée calculées via ORS) ;
    
-   de réserver un lit dans l’hôpital recommandé (mise à jour des lits côté backend).
    

Le frontend consomme une API Spring Boot (backend MedHead).

----------

## Objectif de la PoC

L’objectif est de démontrer :

-   un parcours fonctionnel “end-to-end” (recommandation → réservation),
    
-   une intégration front/back simple et claire,
    
-   une UI minimale mais opérationnelle,
    
-   une base saine pour évoluer vers une solution industrialisée.
    

----------

## Stack technique

Frontend :

-   React
    
-   Vite
    
-   Bootstrap
    
-   JavaScript (ES6+)
    

Dépendance backend :

-   Spring Boot (API REST)
    
-   PostgreSQL (persistance des hôpitaux / zones / lits)
    
-   OpenRouteService (ORS) pour distance/durée “route réelle”
    

----------

## Prérequis

-   Node.js 18+ (recommandé)
    
-   npm
    
-   Backend MedHead démarré (par défaut sur `http://localhost:8080`)
    

----------

## Installation et lancement

1.  Installer les dépendances :
    

-   npm install
    

2.  Lancer le serveur de dev :
    

-   npm run dev
    

L’application est disponible sur :

-   [http://localhost:5173](http://localhost:5173)
    

----------

## Configuration de l’URL Backend

L’URL du backend est configurable via variable d’environnement.

Dans un fichier `.env` à la racine du frontend (optionnel) :

-   VITE_API_BASE_URL=[http://localhost:8080](http://localhost:8080)
    

Si non défini, l’application utilise :

-   [http://localhost:8080](http://localhost:8080)
    

----------

## Fonctionnement de l’application

1.  Sélection de la demande
    

-   Choix de la spécialité
    
-   Choix de la zone d’origine
    

2.  Recommandation
    

-   Appel : POST /recommendations
    
-   Le backend filtre les hôpitaux (spécialité + lits disponibles)
    
-   Le backend calcule distance/durée via ORS
    
-   Le backend retourne l’hôpital minimisant la durée (critère principal)
    

3.  Affichage du résultat
    

-   Hôpital recommandé
    
-   Lits disponibles
    
-   Distance (km)
    
-   Durée (minutes)
    
-   Message “reason” expliquant la décision
    

4.  Réservation d’un lit
    

-   Appel : POST /reservations
    
-   Le frontend affiche une confirmation
    
-   Le nombre de lits est mis à jour selon la réponse du backend
    

Remarque : la réservation est gérée côté backend avec codes HTTP explicites :

-   200 : réservation confirmée
    
-   404 : hôpital introuvable
    
-   409 : plus de lits disponibles
    

----------

## Endpoints backend utilisés

-   GET /specialities : liste des spécialités
    
-   GET /zones : liste des zones
    
-   POST /recommendations : recommandation d’hôpital
    
-   POST /reservations : réservation d’un lit
    
-   GET /health : healthcheck
    

----------

## UX / UI

-   Interface responsive (Bootstrap)
    
-   Feedback utilisateur :
    
    -   état de chargement
        
    -   message succès / erreur
        
-   Bouton “Réserver” désactivé si aucune recommandation ou si plus de lits
    

----------

## Limitations de la PoC

-   Pas d’authentification / autorisation
    
-   Pas de gestion “patient”
    
-   Dépendance ORS (latence réseau / quotas / disponibilité)
    
-   UI volontairement simple (objectif : démonstration et validation)
    

----------

## Évolutions possibles

-   Cache côté backend des résultats ORS (couples zone/hôpital)
    
-   Résilience : timeouts, circuit breaker, fallback
    
-   Recommandations multiples (Top 3)
    
-   Monitoring/observabilité (metrics, dashboards)
    
-   Sécurité (AuthN/AuthZ, chiffrement, audit)
    
-   Gouvernance des référentiels (zones, spécialités)
    

----------

## Auteur

Saliha Youbi  
Projet OpenClassrooms – Architecte Logiciel

----------

## Licence

Projet pédagogique (Proof of Concept) – usage académique uniquement