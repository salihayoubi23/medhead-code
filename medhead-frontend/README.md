# 🖥️ MedHead – Frontend (React + Vite) – Proof of Concept

Frontend de la preuve de concept (PoC) **MedHead Consortium**.

Cette application web permet de démontrer un parcours fonctionnel complet :

-   sélection d’une spécialité médicale
    
-   sélection d’une zone d’origine
    
-   recommandation d’un hôpital en fonction du temps de trajet réel (ORS)
    
-   réservation d’un lit en temps réel
    

Le frontend consomme une API REST Spring Boot.

----------

## 🎯 Objectifs de la PoC

-   démontrer une intégration front/back fonctionnelle
    
-   proposer une interface simple et opérationnelle
    
-   valider les échanges API en temps réel
    
-   offrir une base évolutive vers une solution industrialisée
    

----------

## 🧱 Stack technique

-   React
    
-   Vite
    
-   Bootstrap
    
-   JavaScript ES6+
    

Backend associé :

-   Spring Boot (API REST)
    
-   PostgreSQL (persistance)
    
-   OpenRouteService (distance et durée réelles)
    

----------

## ⚙️ Prérequis

-   Node.js 18+
    
-   npm
    
-   Backend MedHead démarré sur [http://localhost:8080](http://localhost:8080)
    

----------

## ▶️ Installation et lancement

Se placer dans le dossier :

cd medhead-frontend

Installer les dépendances :

npm install

Lancer l’application :

npm run dev

Application disponible sur :

[http://localhost:5173](http://localhost:5173)

----------

## 🔧 Configuration de l’API Backend

L’URL du backend peut être configurée via variable d’environnement.

Créer un fichier `.env` (optionnel) :

VITE_API_BASE_URL=[http://localhost:8080](http://localhost:8080)

Si non défini, l’URL par défaut est utilisée.

----------

## 🔄 Fonctionnement de l’application

### 1️⃣ Sélection de la demande

-   choix de la spécialité médicale
    
-   choix de la zone d’origine
    

----------

### 2️⃣ Recommandation

Appel :

POST /recommendations

Le backend :

-   filtre les hôpitaux par spécialité et lits disponibles
    
-   calcule distance et durée via ORS réel
    
-   retourne l’hôpital optimal (durée minimale)
    

----------

### 3️⃣ Affichage du résultat

-   hôpital recommandé
    
-   lits disponibles
    
-   distance (km)
    
-   durée (minutes)
    
-   message expliquant la décision
    

----------

### 4️⃣ Réservation

Appel :

POST /reservations

Retour utilisateur :

-   confirmation de réservation
    
-   mise à jour du nombre de lits
    

Codes gérés :

• 200 → succès  
• 404 → hôpital introuvable  
• 409 → plus de lits

----------

## 🎨 UX / UI

-   interface responsive (Bootstrap)
    
-   messages de chargement
    
-   feedback succès / erreur
    
-   bouton réservation désactivé si non disponible
    

----------

## 🔐 Sécurité (approche PoC)

-   échanges via API REST
    
-   configuration CORS côté backend
    
-   aucun stockage de données sensibles côté frontend
    

### Évolutions prévues

-   authentification sécurisée (OAuth2 / JWT)
    
-   gestion des rôles utilisateurs
    
-   protection des routes sensibles
    

----------

## 🛡️ RGPD

-   aucune donnée patient stockée côté frontend
    
-   affichage uniquement de données techniques (hôpitaux, distances, lits)
    
-   respect du principe de minimisation
    

----------

## 🚀 Évolutions possibles

-   recommandations multiples (Top 3)
    
-   affichage cartographique
    
-   cache des résultats
    
-   monitoring UX
    
-   amélioration UI
    

----------

## 👤 Auteur

Saliha Youbi  
Projet OpenClassrooms – Architecte Logiciel