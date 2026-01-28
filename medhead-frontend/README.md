
# 🌐 MedHead – Frontend (React + Vite) – Proof of Concept

Frontend de la preuve de concept (PoC) MedHead.

Cette application web permet de :

• sélectionner une spécialité médicale  
• sélectionner une zone d’origine  
• obtenir une recommandation d’hôpital en temps réel  
• réserver un lit dans l’hôpital recommandé

Le frontend consomme l’API REST fournie par le backend Spring Boot MedHead.

----------

## 🎯 Objectif du frontend

L’objectif de cette interface est de démontrer :

• une interaction fluide entre frontend et backend  
• la faisabilité fonctionnelle de la recommandation d’hôpital  
• une expérience utilisateur simple et claire  
• une architecture frontend propre et maintenable

----------

## 🛠️ Stack technique

### Frontend

• React 18  
• Vite  
• Bootstrap 5  
• JavaScript ES6+

### Backend consommé

• Spring Boot (Java)  
• API REST MedHead  
• PostgreSQL  
• OpenRouteService (ORS réel)

----------

## 📁 Structure du projet

src/  
components/  
 Header.jsx  
 AlertBox.jsx  
 RecommendationForm.jsx  
 RecommendationResult.jsx

services/  
 api.jsx

App.jsx  
main.jsx  
App.css  
index.css

----------

## 🧩 Rôle des principaux fichiers

• App.jsx : orchestration globale de l’application  
• components/ : composants UI réutilisables  
• services/api.jsx : appels HTTP vers l’API backend  
• Bootstrap : mise en forme responsive

----------

## ⚙️ Prérequis

• Node.js 18 ou supérieur  
• npm  
• Backend MedHead lancé sur [http://localhost:8080](http://localhost:8080)

----------

## ▶️ Lancer l’application

### Étape 1 – Installer les dépendances

npm install

----------

### Étape 2 – Lancer le serveur de développement

npm run dev

----------

Application accessible par défaut sur :

[http://localhost:5173](http://localhost:5173)

----------

## 🔌 Configuration de l’API backend

L’URL du backend est configurable via une variable d’environnement.

Dans un fichier .env :

VITE_API_BASE_URL=[http://localhost:8080](http://localhost:8080)

Si non définie, la valeur par défaut est :

[http://localhost:8080](http://localhost:8080)

----------

## 🔄 Fonctionnement de l’application

### 1️⃣ Sélection de la demande

L’utilisateur choisit :

• une spécialité médicale  
• une zone d’origine

----------

### 2️⃣ Recommandation

Le frontend appelle :

POST /recommendations

Le backend applique :

• filtrage par spécialité  
• vérification des lits disponibles  
• calcul distance et durée via ORS réel  
• sélection de l’hôpital le plus pertinent

----------

### 3️⃣ Affichage du résultat

Sont affichés :

• nom de l’hôpital recommandé  
• nombre de lits disponibles  
• distance en kilomètres  
• durée estimée en minutes  
• justification de la recommandation

----------

### 4️⃣ Réservation d’un lit

Le frontend appelle :

POST /reservations

Résultat :

• mise à jour du nombre de lits  
• message de confirmation ou d’erreur

Codes gérés :

• 200 → réservation confirmée  
• 404 → hôpital introuvable  
• 409 → plus de lits disponibles

----------

## 🌐 Endpoints backend utilisés

/specialities → récupération des spécialités  
/zones → récupération des zones  
/recommendations → recommandation d’hôpital  
/reservations → réservation d’un lit

----------

## 🎨 UX & UI

• interface responsive (Bootstrap)  
• messages de chargement  
• alertes de succès et d’erreur  
• bouton de réservation désactivé si aucun lit disponible

----------

## 🧪 Limitations de la PoC

• pas d’authentification utilisateur  
• une seule recommandation retournée  
• pas de cartographie interactive  
• sécurité non implémentée  
• supervision absente

Ces choix sont cohérents avec un périmètre de preuve de concept.

----------

## 🚀 Évolutions possibles

• affichage de plusieurs hôpitaux classés  
• carte géographique interactive  
• mise en cache ORS  
• gestion multi-utilisateurs  
• sécurité et rôles  
• supervision et monitoring

----------

## 👩‍💻 Auteur

Saliha Youbi  
Projet OpenClassrooms – Architecte Logiciel  
GitHub : [https://github.com/salihayoubi23](https://github.com/salihayoubi23)