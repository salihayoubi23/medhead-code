
# MedHead – Frontend (React + Vite)

Frontend de la **preuve de concept (PoC) MedHead**.

Cette application web permet de :
- sélectionner une **spécialité médicale**
- sélectionner une **zone d’origine**
- obtenir une **recommandation d’hôpital**
- **réserver un lit** dans l’hôpital recommandé (simulation PoC)

Le frontend consomme une **API Spring Boot (backend MedHead)**.

---

## 🧭 Objectif du PoC

L’objectif de cette preuve de concept est de démontrer :
- la faisabilité d’une **recommandation d’hôpital**
- une **interaction front / back claire**
- une **expérience utilisateur simple**
- un code **structuré et maintenable**

---

## 🛠️ Stack technique

### Frontend
- React 18
- Vite
- Bootstrap 5
- JavaScript (ES6+)

### Backend (dépendance)
- Spring Boot
- Java 17+
- Données mockées (JSON)

---

## 📁 Structure du projet

```txt
src/
  components/
    Header.jsx
    AlertBox.jsx
    RecommendationForm.jsx
    RecommendationResult.jsx
  services/
    api.jsx
  App.jsx
  App.css
  main.jsx
  index.css
```

## 🧩 Rôles principaux

- **App.jsx** : orchestration globale de l’application
- **components/** : composants UI réutilisables
- **services/api.jsx** : accès à l’API backend
- **Bootstrap** : mise en forme responsive
  
## ⚙️ Prérequis

- **Node.js 18+**
- **npm**
- Backend MedHead lancé sur `http://localhost:8080`

## ▶️ Lancer l’application

### 1) Installer les dépendances
```bash
npm install
```
### 2) Lancer le frontend
```
npm run dev
```
Application accessible sur : http://localhost:5173


##  2️⃣ Lancer le frontend

## 🔌 Configuration API

L’URL du backend est configurable via une variable d’environnement.

Dans `.env` :
```env
VITE_API_BASE_URL=http://localhost:8080
Valeur par défaut si non définie : http://localhost:8080
```
# 🔄 Fonctionnement de l’application

### 1️⃣ Sélection de la demande
- Choix de la **spécialité médicale**
- Choix de la **zone d’origine**

### 2️⃣ Recommandation
Appel backend :

```http
POST /recommendations
```

### Critères appliqués côté backend
- spécialité compatible
- lits disponibles (> 0)
- distance routière simulée
- sélection de l’hôpital le plus rapide

### 3️⃣ Affichage du résultat
- Nom de l’hôpital recommandé
- Nombre de lits disponibles
- Distance (km)
- Durée estimée (minutes)
- Raison de la recommandation

### 4️⃣ Réservation d’un lit (PoC)
Appel backend :

```http
POST /reservations
```
- Mise à jour du nombre de lits affiché
- Confirmation utilisateur

⚠️ La réservation est une **simulation PoC** (pas de persistance réelle).

## 🌐 Endpoints backend utilisés

| Endpoint | Méthode | Description |
|--------|--------|-------------|
| `/specialities` | GET | Liste des spécialités |
| `/recommendations` | POST | Recommandation d’hôpital |
| `/reservations` | POST | Réservation d’un lit (PoC) |

## 🎨 UX & UI

- Interface **responsive** (Bootstrap)
- Feedback utilisateur :
  - chargement
  - messages de succès / erreur
- Bouton **Recommander**
- Bouton **Réserver un lit** désactivé si aucun lit disponible
  
## 🧪 Limitations du PoC

- Données entièrement mockées
- Distances simulées (pas d’API Google / OpenStreetMap)
- Une seule recommandation retournée
- Pas d’authentification
- Pas de base de données
## 🚀 Évolutions possibles

- Top 3 hôpitaux recommandés
- Carte interactive
- Gestion multi-utilisateurs
- Persistance en base de données
- Historique des réservations
- Authentification / rôles
## 👩‍💻 Auteur

**Saliha Youbi**  
Projet OpenClassrooms – Architecte Logiciel  
GitHub : https://github.com/salihayoubi23

## 📄 Licence

Projet pédagogique – Proof of Concept  
Usage académique uniquement
