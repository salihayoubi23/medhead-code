
# 📘 MedHead – Proof of Concept (PoC)

Cette preuve de concept a été réalisée pour le consortium **MedHead** afin de valider une plateforme d’aide à la décision pour les interventions médicales d’urgence.

Elle permet :

• de recommander un hôpital selon une spécialité, une zone d’origine et un temps de trajet réel (OpenRouteService)  
• de réserver un lit en temps réel  
• de sécuriser l’accès via authentification JWT  
• de protéger les données sensibles en base (chiffrement)  
• de valider une architecture moderne avec tests et CI/CD

----------

## 🧱 Architecture générale

La PoC repose sur :

Backend : Java / Spring Boot (API REST sécurisée)  
Base de données : PostgreSQL (production) + H2 (tests CI)  
Routage : OpenRouteService (distance et durée réelles)  
Frontend : React + Vite + Bootstrap  
Tests : JUnit, MockMvc, H2  
Performance : Apache JMeter  
CI/CD : GitHub Actions

----------

## 📂 Contenu du dépôt

medhead-backend/  
→ API Spring Boot sécurisée + persistance PostgreSQL + tests automatisés

medhead-frontend/  
→ Application React connectée à l’API sécurisée

performance/  
→ Scénarios JMeter + rapports HTML

.github/workflows/ci.yml  
→ Pipeline CI

----------

## ⚙️ Prérequis backend

• Java 17+  
• Maven  
• PostgreSQL

----------

## ▶️ Lancer le backend

Dans :

cd medhead-backend

Puis :

mvn spring-boot:run

API disponible sur :  
[http://localhost:8080](http://localhost:8080)

----------

## 🔗 API principales

### 📍 Recommandation d’hôpital

POST /recommendations

Exemple :

{  
"speciality": "Cardiologie",  
"originZone": "LONDON_CENTRAL"  
}

Réponse :

{  
"hospitalId": "HOSP-001",  
"hospitalName": "St Mary Hospital",  
"availableBeds": 3,  
"distanceKm": 2.2,  
"durationMin": 7,  
"reason": "Choisi via ORS + spécialité + lits disponibles"  
}

----------

### 🛏️ Réservation de lit

POST /reservations

Exemple :

{  
"hospitalId": "HOSP-001"  
}

Codes :

200 → réservation confirmée  
404 → hôpital introuvable  
409 → plus de lits disponibles

----------

### 🔐 Authentification

POST /auth/login

Exemple :

{  
"email": "admin@medhead.local",  
"password": "Admin123!"  
}

Réponse :

{  
"token": "JWT_TOKEN"  
}

➡️ Le token JWT doit être envoyé ensuite dans les requêtes protégées :

Authorization: Bearer JWT_TOKEN

----------

## 🧪 Tests automatisés backend

Dans :

cd medhead-backend  
mvn test

Tests implémentés :

• tests unitaires des services métier  
• tests des contrôleurs REST (MockMvc)  
• tests avec OpenRouteService mocké  
• tests d’intégration avec base H2  
• tests sécurité (authentification + endpoints protégés)

----------

## 📈 Tests de performance

Scénario JMeter :

performance/medhead_test_charge.jmx

Rapport HTML :

jmeter -n  
-t performance/medhead_test_charge.jmx  
-l performance/results.jtl  
-e  
-o performance/rapport_html

----------

## 🔄 Intégration continue (CI/CD)

Pipeline GitHub Actions :

✔ build backend  
✔ exécution des tests backend  
✔ build frontend

Objectifs :

• qualité continue  
• détection de régressions  
• déploiement reproductible

----------

## 🔐 Sécurité implémentée (PoC)

### Authentification

• Spring Security  
• JWT (Bearer Token)  
• endpoints protégés  
• rôles utilisateurs

### Protection des données en base (Data at Rest)

• mot de passe utilisateur stocké hashé (BCrypt)  
• email utilisateur stocké chiffré (AES-GCM)  
• colonne email_hash (SHA-256) utilisée pour la recherche au login

➡️ Les données sensibles ne sont jamais stockées en clair dans PostgreSQL.

### Gestion des secrets

• variables d’environnement via fichier .env (dev)  
• JWT_SECRET  
• ORS_API_KEY  
• MEDHEAD_CRYPTO_KEY

----------

## 🛡️ RGPD – Privacy by Design (réellement appliqué)

Dans la PoC :

✔ minimisation des données (pas de données patient)  
✔ chiffrement des données sensibles utilisateur  
✔ mots de passe jamais en clair  
✔ séparation front/back sécurisée  
✔ accès contrôlé via JWT

Principes RGPD respectés :

• protection des données au repos  
• sécurité dès la conception  
• limitation des accès

----------

## 🚀 Évolutions possibles

• OAuth2 / OpenID Connect  
• HTTPS/TLS  
• rotation des clés de chiffrement  
• gestion multi-utilisateurs avancée  
• monitoring & observabilité  
• cache ORS

----------

## 🎯 Objectifs atteints

✔ API REST sécurisée  
✔ intégration service externe réel (ORS)  
✔ persistance PostgreSQL  
✔ chiffrement données sensibles  
✔ authentification JWT  
✔ tests automatisés complets  
✔ tests de charge  
✔ CI/CD fonctionnelle

----------

## 👤 Auteur

Saliha Youbi  
Projet OpenClassrooms – Architecte Logiciel