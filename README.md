
# 📘 MedHead – Proof of Concept (PoC)

Cette preuve de concept a été réalisée pour le consortium **MedHead** afin de valider une plateforme d’aide à la décision pour les interventions médicales d’urgence.

Elle permet :

• de recommander un hôpital en fonction d’une spécialité, d’une zone d’origine et du temps de trajet réel  
• de réserver un lit en temps réel  
• de mesurer les performances sous charge  
• de valider une architecture orientée microservices avec intégration continue

----------

## 🧱 Architecture générale

La PoC repose sur les composants suivants :

Backend : Java / Spring Boot (API REST)  
Base de données : PostgreSQL  
Routage : OpenRouteService (ORS – distance et durée réelles)  
Frontend : React + Vite + Bootstrap  
Tests : JUnit, MockMvc, H2 pour CI  
Performance : Apache JMeter  
CI/CD : GitHub Actions

----------

## 📂 Contenu du dépôt

medhead-backend/  
→ Backend Spring Boot + persistance PostgreSQL + tests automatisés

medhead-frontend/  
→ Application web React connectée à l’API

performance/  
→ Scénarios JMeter + rapports HTML de performance

.github/workflows/ci.yml  
→ Pipeline d’intégration continue

----------

## ⚙️ Prérequis

• Java 17+  
• Maven  
• Node.js 18+  
• npm  
• PostgreSQL  
• Apache JMeter (optionnel – pour tests de charge)

----------

## ▶️ Lancer le backend

Se placer dans le dossier :

cd medhead-backend

Puis :

mvn spring-boot:run

Backend disponible sur :  
[http://localhost:8080](http://localhost:8080)

----------

## ▶️ Lancer le frontend

Se placer dans :

cd medhead-frontend

Installer :

npm install

Lancer :

npm run dev

Frontend disponible sur :  
[http://localhost:5173](http://localhost:5173)

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
"reason": "Choisi via ORS (distance réelle) + spécialité + lits disponibles"  
}

----------

### 🛏️ Réservation de lit

POST /reservations

Exemple :

{  
"hospitalId": "HOSP-001"  
}

Codes :

• 200 → réservation confirmée  
• 404 → hôpital introuvable  
• 409 → plus de lits disponibles

----------

## 🧪 Tests automatisés

Backend :

cd medhead-backend  
mvn test

Types de tests :

• tests de services métier  
• tests de contrôleurs REST  
• tests avec ORS mocké  
• tests d’intégration avec base H2 (CI)

----------

## 📈 Tests de performance

Scénario JMeter :

performance/medhead_test_charge.jmx

Génération rapport :

jmeter -n  
-t performance/medhead_test_charge.jmx  
-l performance/results.jtl  
-e  
-o performance/rapport_html

----------

## 🔄 Intégration continue (CI/CD)

Pipeline GitHub Actions exécuté à chaque push :

✔ build backend  
✔ tests automatisés backend  
✔ build frontend

Objectifs :

• qualité continue  
• détection de régression  
• reproductibilité

----------

## 🔐 Sécurité (approche PoC)

Dans la PoC :

• configuration CORS pour limiter les origines autorisées  
• séparation front/back via API REST  
• utilisation de variables d’environnement pour les secrets (clé ORS)  
• aucune donnée patient stockée

### Sécurité prévue en production

• HTTPS/TLS  
• OAuth2 / OpenID Connect (JWT)  
• gestion des rôles utilisateurs  
• audit des accès

----------

## 🛡️ RGPD – Privacy by Design

La PoC applique la minimisation des données :

• pas de données personnelles patient  
• uniquement hôpitaux, zones et lits

Évolutions prévues :

• anonymisation  
• chiffrement  
• politiques de suppression  
• traçabilité

----------

## 🚀 Évolutions possibles

• cache ORS  
• circuit breaker (Resilience4j)  
• monitoring  
• authentification sécurisée  
• recommandations multiples

----------

## 🎯 Objectifs atteints

✔ architecture microservices  
✔ intégration service externe réel  
✔ persistance PostgreSQL  
✔ tests automatisés  
✔ performance sous charge  
✔ CI/CD opérationnelle

----------

## 👤 Auteur

Saliha Youbi  
Projet OpenClassrooms – Architecte Logiciel

----------