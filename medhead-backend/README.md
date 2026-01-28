# ⚙️ MedHead – Backend (Spring Boot) – Proof of Concept

Backend de la preuve de concept (PoC) MedHead.

Ce service expose une API REST permettant :

-   de recommander un hôpital en situation d’urgence médicale selon :
    
    -   la spécialité demandée
        
    -   les lits disponibles
        
    -   la distance et durée réelles via OpenRouteService (ORS)
        
-   de réserver un lit en temps réel
    
-   de persister les données via PostgreSQL
    

----------

## 🧱 Architecture technique

-   Java 17
    
-   Spring Boot
    
-   Spring Web (API REST)
    
-   Spring Data JPA
    
-   PostgreSQL (exécution réelle)
    
-   H2 (tests automatisés en CI)
    
-   OpenRouteService (API de routage réel)
    

Découpage logique :

-   Controller : exposition des endpoints REST
    
-   Service : logique métier
    
-   Repository : accès aux données
    

----------

## ⚙️ Prérequis

-   Java 17+
    
-   Maven ou Maven Wrapper
    
-   PostgreSQL en fonctionnement
    

----------

## ▶️ Lancer l’application

Depuis le dossier `medhead-backend` :

### Avec Maven Wrapper (recommandé)

./mvnw spring-boot:run

### Avec Maven installé

mvn spring-boot:run

API disponible sur :

[http://localhost:8080](http://localhost:8080)

----------

## 🗄️ Base de données

La persistance est assurée par PostgreSQL.

Tables principales :

-   hospital
    
-   zone
    
-   hospital_speciality
    

Les données sont chargées au démarrage via scripts SQL.

----------

## 🔗 Endpoints principaux

### 📍 POST /recommendations

Recommande l’hôpital optimal selon :

-   spécialité
    
-   disponibilité des lits
    
-   temps de trajet réel via ORS
    

Exemple :

{  
"speciality": "Cardiologie",  
"originZone": "LONDON_CENTRAL"  
}

----------

### 🛏️ POST /reservations

Réserve un lit dans un hôpital.

Exemple :

{  
"hospitalId": "HOSP-001"  
}

Réponses :

• 200 OK – réservation confirmée  
• 404 – hôpital introuvable  
• 409 – plus de lits disponibles

----------

### ❤️ GET /health

Healthcheck du service.

----------

## 🧪 Tests automatisés

Exécution :

./mvnw test

Types de tests :

-   tests unitaires de services métier
    
-   tests de contrôleurs REST (MockMvc)
    
-   tests avec OpenRouteService mocké
    
-   tests d’intégration avec base H2 (profil test)
    

Objectifs :

✔ valider la logique métier  
✔ garantir la stabilité des endpoints  
✔ assurer la reproductibilité en CI

----------

## 🔄 Intégration continue

Le backend est intégré dans un pipeline GitHub Actions :

-   build Maven
    
-   exécution des tests automatisés
    

Objectif : qualité continue et détection de régressions.

----------

## 🔐 Sécurité (approche PoC)

Dans le périmètre de la PoC :

-   configuration CORS pour autoriser uniquement le frontend
    
-   séparation claire frontend/backend
    
-   secrets gérés via variables d’environnement (clé ORS)
    
-   aucune donnée patient stockée
    

### Sécurité prévue en production

-   HTTPS/TLS
    
-   OAuth2 / OpenID Connect avec JWT
    
-   gestion des rôles utilisateurs
    
-   journalisation sécurisée
    

----------

## 🛡️ RGPD – Privacy by Design

La PoC applique une minimisation des données :

-   aucune donnée personnelle de patient
    
-   uniquement des informations d’infrastructure hospitalière
    

En production :

-   anonymisation
    
-   chiffrement
    
-   politiques de conservation
    
-   droit à l’oubli
    
-   traçabilité des accès
    

----------

## 🚀 Évolutions possibles

-   cache des résultats ORS
    
-   circuit breaker (Resilience4j)
    
-   monitoring et observabilité
    
-   authentification sécurisée
    
-   montée en charge progressive
    

----------

## 👤 Auteur

Saliha Youbi  
Projet OpenClassrooms – Architecte Logiciel