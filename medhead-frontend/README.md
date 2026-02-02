# 🖥️ MedHead – Frontend (React + Vite) – Proof of Concept

Frontend de la preuve de concept (PoC) **MedHead Consortium**.

Cette application web permet de démontrer un parcours complet sécurisé :

• authentification utilisateur via JWT  
• sélection d’une spécialité médicale  
• sélection d’une zone d’origine  
• recommandation d’un hôpital en fonction du temps de trajet réel (ORS)  
• réservation d’un lit en temps réel

Le frontend consomme une API REST Spring Boot sécurisée.

----------

## 🎯 Objectifs de la PoC

• démontrer une intégration front/back sécurisée et fonctionnelle  
• proposer une interface simple et opérationnelle  
• valider les échanges API en temps réel  
• illustrer une architecture moderne prête à évoluer

----------

## 🧱 Stack technique

Frontend :

React  
Vite  
Bootstrap  
JavaScript ES6+

Backend associé :

Spring Boot (API REST sécurisée)  
PostgreSQL (persistance)  
OpenRouteService (distance et durée réelles)

----------

## ⚙️ Prérequis

Node.js 18+  
npm  
Backend MedHead démarré sur [http://localhost:8080](http://localhost:8080)

----------

## ▶️ Installation et lancement

Dans le dossier :

cd medhead-frontend

Installer :

npm install

Lancer :

npm run dev

Application disponible sur :

[http://localhost:5173](http://localhost:5173)

----------

## 🔧 Configuration API

Possibilité de configurer l’URL du backend via `.env` :

VITE_API_BASE_URL=[http://localhost:8080](http://localhost:8080)

(Sinon valeur par défaut)

----------

## 🔄 Fonctionnement de l’application

### 🔐 1️⃣ Authentification

Page de login sécurisée.

L’utilisateur s’authentifie via :

POST /auth/login

➡️ Réception d’un token JWT stocké côté navigateur.

Les routes sensibles sont protégées (React Router).

----------

### 2️⃣ Sélection de la demande

• choix de la spécialité médicale  
• choix de la zone d’origine

----------

### 3️⃣ Recommandation

Appel :

POST /recommendations

Le backend :

• filtre par spécialité et lits disponibles  
• calcule distance/durée via ORS réel  
• retourne l’hôpital optimal

----------

### 4️⃣ Affichage du résultat

• hôpital recommandé  
• lits disponibles  
• distance (km)  
• durée (minutes)  
• justification métier

----------

### 5️⃣ Réservation

Appel :

POST /reservations

Retour utilisateur :

• confirmation de réservation  
• mise à jour des lits

Codes gérés :

200 → succès  
404 → introuvable  
409 → complet

----------

## 🎨 UX / UI

• interface responsive (Bootstrap)  
• gestion des états de chargement  
• feedback succès / erreurs  
• bouton réservation désactivé si indisponible  
• page 404 stylisée  
• bouton logout

----------

## 🔐 Sécurité implémentée (PoC)

• authentification JWT côté frontend  
• stockage du token JWT (localStorage)  
• ajout automatique du header Authorization dans les appels API  
• routes protégées avec React Router  
• aucune donnée sensible stockée côté frontend

----------

## 🛡️ RGPD

• aucune donnée patient manipulée  
• uniquement données techniques hospitalières  
• respect de la minimisation des données  
• accès sécurisé aux ressources

----------

## 🚀 Évolutions possibles

• affichage cartographique des hôpitaux  
• recommandations multiples  
• amélioration UX  
• rafraîchissement automatique JWT  
• monitoring frontend

----------

## 👤 Auteur

Saliha Youbi  
Projet OpenClassrooms – Architecte Logiciel