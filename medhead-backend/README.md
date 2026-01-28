
# 📦 MedHead – Backend (Spring Boot) – Proof of Concept

Backend de la preuve de concept (PoC) MedHead.

Ce service fournit une API REST permettant :

• de recommander un hôpital en situation d’urgence  
• de prendre en compte la spécialité médicale  
• de vérifier la disponibilité des lits en base PostgreSQL  
• de calculer la distance et la durée via OpenRouteService (ORS réel)  
• de réserver un lit avec mise à jour en base

----------

## 🎯 Objectif du backend

Valider techniquement :

• une architecture API REST en Java Spring Boot  
• l’intégration d’un service externe de routage réel (ORS)  
• la persistance en base PostgreSQL  
• la robustesse via tests automatisés  
• la performance sous charge

----------

## ⚙️ Prérequis

• Java 17 ou Java 21  
• Maven ou Maven Wrapper (mvnw)  
• PostgreSQL  
• Connexion Internet (pour ORS)

----------

## ▶️ Lancer l’application

Depuis le dossier backend :

Option recommandée (Maven Wrapper) :

./mvnw spring-boot:run

Ou avec Maven installé :

mvn spring-boot:run

L’API démarre sur :

[http://localhost:8080](http://localhost:8080)

----------

## 🗄️ Base de données

La PoC utilise PostgreSQL pour stocker :

• les hôpitaux  
• leurs spécialités  
• les lits disponibles  
• les zones géographiques

La configuration est définie dans :

src/main/resources/application.properties

----------

## 🔗 Endpoints disponibles

### ❤️ Health check

GET /health

Permet de vérifier que l’application fonctionne.

----------

### 📚 Référentiels

GET /specialities  
→ retourne les spécialités disponibles

GET /zones  
→ retourne les zones géographiques

GET /hospitals  
→ retourne les hôpitaux stockés en base

----------

### 📍 Recommandation d’hôpital

POST /recommendations

Recommande un établissement selon :

• spécialité demandée  
• disponibilité des lits  
• distance et durée ORS

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

POST /reservations

Exemple :

{  
"hospitalId": "HOSP-004"  
}

Codes de réponse :

• 200 → réservation confirmée  
• 404 → hôpital introuvable  
• 409 → aucun lit disponible

----------

## 🧪 Tests automatisés

Le backend inclut des tests unitaires et d’intégration couvrant les fonctionnalités critiques.

### Objectifs

• valider la logique métier  
• vérifier les endpoints REST  
• sécuriser la réservation de lits  
• garantir la stabilité des évolutions

----------

### Types de tests

#### Tests de démarrage

• chargement du contexte Spring  
• configuration JPA et base PostgreSQL

----------

#### Tests de services

• logique de recommandation  
• gestion des lits disponibles  
• intégration ORS

----------

#### Tests de contrôleurs

• endpoint /recommendations  
• endpoint /reservations  
• gestion des cas d’erreur

----------

#### Tests avec ORS mocké

• suppression de la dépendance réseau  
• résultats reproductibles  
• rapidité d’exécution en CI

----------

### Lancer les tests

Depuis le dossier backend :

./mvnw test

Résultat attendu :

• tous les tests passent  
• aucune erreur  
• temps compatible CI

----------

## 📈 Performance

Les tests de charge sont réalisés via Apache JMeter (dans le dépôt principal).

Le backend a été validé avec :

• ORS réel intégré  
• PostgreSQL actif  
• 1000 requêtes simulées

Résultats :

• 0 % d’erreurs  
• temps de réponse moyen ~40 ms  
• bonne stabilité sous charge

----------

## 🔄 Intégration continue

Le backend est intégré dans un pipeline GitHub Actions :

• build automatique  
• exécution des tests backend  
• vérification de la qualité

À chaque push sur main.

----------

## 📌 Évolutions possibles

Pour une version industrielle :

• cache ORS pour limiter la latence  
• résilience (timeouts, circuit breaker)  
• sécurité (authentification, autorisation)  
• monitoring et supervision  
• montée en charge horizontale

----------

## ✅ Conclusion

Ce backend démontre :

✔ l’intégration réussie de services externes  
✔ une persistance fiable en base relationnelle  
✔ une architecture REST claire  
✔ une qualité assurée par les tests  
✔ une performance satisfaisante pour une PoC