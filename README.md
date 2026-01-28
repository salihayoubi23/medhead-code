# 📘 MedHead – Proof of Concept (PoC)

Cette preuve de concept a été réalisée pour le consortium **MedHead** afin de valider une plateforme d’aide à la décision pour les interventions d’urgence médicale.

Elle permet :

• de recommander un hôpital en fonction d’une spécialité médicale, d’une zone d’origine et du temps de trajet  
• de réserver un lit en temps réel  
• de tester la performance et la robustesse de l’architecture

----------

## 🧱 Architecture générale

La PoC repose sur les composants suivants :

Backend : Java / Spring Boot (API REST)  
Base de données : PostgreSQL  
Service de routage : OpenRouteService (ORS)  
Frontend : React + Vite + Bootstrap  
Tests : JUnit, MockMvc  
Performance : Apache JMeter  
CI : GitHub Actions

----------

## 📂 Contenu du dépôt

medhead-backend/  
→ Backend Spring Boot + tests automatisés

medhead-frontend/  
→ Frontend React

performance/  
→ Scénarios JMeter + rapports de performance

.github/workflows/ci.yml  
→ Pipeline d’intégration continue

----------

## ⚙️ Prérequis

• Java 17 ou supérieur  
• Maven  
• Node.js 18+  
• npm  
• PostgreSQL  
• Apache JMeter (pour les tests de charge)

----------

## ▶️ Lancer le backend

Se placer dans le dossier backend :

cd medhead-backend

Lancer l’application :

mvn spring-boot:run

Backend accessible sur :  
[http://localhost:8080](http://localhost:8080)

----------

## ▶️ Lancer le frontend

Se placer dans le dossier frontend :

cd medhead-frontend

Installer les dépendances :

npm install

Lancer l’application :

npm run dev

Frontend accessible sur :  
[http://localhost:5173](http://localhost:5173)

----------

## 🔗 API principales

### 📍 Recommandation d’hôpital

Méthode : POST  
Endpoint : /recommendations

Exemple de requête :

{  
"speciality": "Cardiologie",  
"originZone": "LONDON_CENTRAL"  
}

Exemple de réponse :

{  
"hospitalId": "HOSP-004",  
"hospitalName": "Hôpital St Mary Emergency",  
"availableBeds": 2,  
"distanceKm": 2.2,  
"durationMin": 7,  
"reason": "Choisi via ORS (distance réelle) + spécialité + lits"  
}

----------

### 🛏️ Réservation de lit

Méthode : POST  
Endpoint : /reservations

Exemple de requête :

{  
"hospitalId": "HOSP-004"  
}

Codes de réponse :

• 200 OK → réservation confirmée  
• 404 → hôpital introuvable  
• 409 → plus de lits disponibles

----------

## 🧪 Tests automatisés

Exécution des tests backend :

cd medhead-backend  
mvn test

Types de tests réalisés :

• tests de démarrage Spring  
• tests de logique métier (services)  
• tests des contrôleurs REST  
• tests de réservation de lits  
• tests avec ORS mocké pour reproductibilité

----------

## 📈 Tests de performance (Apache JMeter)

Plan de test :

performance/medhead_test_charge.jmx

Génération du rapport HTML :

jmeter -n  
-t performance/medhead_test_charge.jmx  
-l performance/results_postgres_ors.jtl  
-e  
-o performance/rapport_html

Rapport consultable ici :

performance/rapport_html/index.html

Caractéristiques des tests :

• 1000 requêtes simulées  
• appels répétés sur /recommendations  
• ORS réel intégré  
• base PostgreSQL active

----------

## 🔄 Intégration continue (CI)

Pipeline GitHub Actions :

.github/workflows/ci.yml

À chaque push sur la branche main :

✔ build du backend  
✔ exécution des tests backend  
✔ build du frontend

Objectifs :

• garantir la qualité du code  
• détecter rapidement les régressions  
• assurer la reproductibilité

----------

## 📦 Livrables

Ce dépôt contient :

✔ le code backend et frontend  
✔ les tests automatisés  
✔ les tests de performance JMeter  
✔ le pipeline CI

Le document de reporting d’architecture et de performance est disponible dans le dépôt :

medhead_architecture

----------

## 📊 Technologies utilisées

Backend → Java, Spring Boot, JPA  
Base de données → PostgreSQL  
Routage → OpenRouteService  
Frontend → React, Vite  
Tests → JUnit, MockMvc  
Performance → Apache JMeter  
CI → GitHub Actions

----------

## 🎯 Objectifs de la PoC

• Valider une architecture orientée microservices  
• Intégrer des services externes réels  
• Mettre en place une persistance des données  
• Mesurer les performances sous charge  
• Préparer une industrialisation future

----------

### ✅ Conclusion

Cette preuve de concept démontre la faisabilité technique et architecturale d’un système de recommandation hospitalière en temps réel, intégrant :

-   une logique métier robuste
    
-   des services externes de routage
    
-   une base de données relationnelle
    
-   des tests automatisés
    
-   une validation de performance
    

Elle constitue une base solide pour une évolution vers une solution industrielle à grande échelle.