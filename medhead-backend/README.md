# ⚙️ MedHead – Backend (Spring Boot) – Proof of Concept

Backend de la preuve de concept (PoC) MedHead.

Ce service expose une API REST sécurisée permettant :

• de recommander un hôpital en situation d’urgence selon :

-   la spécialité demandée
    
-   les lits disponibles
    
-   la distance et durée réelles via OpenRouteService (ORS)
    

• de réserver un lit en temps réel

• d’authentifier les utilisateurs via JWT

• de persister les données dans PostgreSQL avec chiffrement des données sensibles

----------

## 🧱 Architecture technique

Technologies :

Java 17  
Spring Boot  
Spring Web (API REST)  
Spring Data JPA  
Spring Security + JWT  
PostgreSQL (exécution réelle)  
H2 (tests automatisés en CI)  
OpenRouteService (API de routage réel)

Découpage logique :

Controller → exposition des endpoints REST  
Service → logique métier  
Repository → accès aux données

----------

## ⚙️ Prérequis

Java 17+  
Maven ou Maven Wrapper  
PostgreSQL en fonctionnement

----------

## ▶️ Lancer l’application

Depuis le dossier medhead-backend :

Avec Maven Wrapper (recommandé) :

./mvnw spring-boot:run

Avec Maven installé :

mvn spring-boot:run

API disponible sur :

[http://localhost:8080](http://localhost:8080)

----------

## 🗄️ Base de données

La persistance est assurée par PostgreSQL.

Tables principales :

hospital  
zone  
hospital_speciality  
users

Les données sont chargées au démarrage via scripts SQL et seed applicatif.

----------

## 🔗 Endpoints principaux

### 📍 POST /recommendations

Recommande l’hôpital optimal selon :

• spécialité  
• disponibilité des lits  
• temps de trajet réel via ORS

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

### 🔐 POST /auth/login

Authentification utilisateur.

Exemple :

{  
"email": "admin@medhead.local",  
"password": "Admin123!"  
}

Réponse :

{  
"token": "JWT_TOKEN"  
}

➡️ Les endpoints métier sont protégés par :

Authorization: Bearer JWT_TOKEN

----------

### ❤️ GET /health

Healthcheck du service.

----------

## 🧪 Tests automatisés

Exécution :

./mvnw test

Types de tests :

• tests unitaires des services métier  
• tests de contrôleurs REST (MockMvc)  
• tests avec OpenRouteService mocké  
• tests d’intégration avec base H2  
• tests de sécurité (auth + endpoints protégés)

Objectifs :

✔ valider la logique métier  
✔ sécuriser les accès  
✔ garantir la stabilité  
✔ assurer la reproductibilité en CI

----------

## 🔄 Intégration continue

Pipeline GitHub Actions :

• build Maven  
• exécution des tests backend  
• vérification automatique à chaque push

Objectif : qualité continue et détection de régressions.

----------

## 🔐 Sécurité implémentée (PoC)

### Authentification & accès

• Spring Security  
• JWT Bearer Token  
• endpoints protégés  
• rôles utilisateurs

### Protection des données en base (Data at Rest)

• mot de passe stocké hashé (BCrypt)  
• email utilisateur stocké chiffré (AES-GCM)  
• colonne email_hash (SHA-256) pour recherche sécurisée au login

➡️ Les données sensibles ne sont jamais stockées en clair dans PostgreSQL.

### Gestion des secrets

Via variables d’environnement (.env en développement) :

• JWT_SECRET  
• ORS_API_KEY  
• MEDHEAD_CRYPTO_KEY

----------

## 🛡️ RGPD – Privacy by Design

Dans la PoC :

✔ minimisation des données (aucune donnée patient)  
✔ chiffrement des données sensibles utilisateur  
✔ mots de passe jamais en clair  
✔ accès sécurisé par authentification

Principes appliqués :

• sécurité dès la conception  
• protection des données au repos  
• contrôle des accès

----------

## 🚀 Évolutions possibles

• HTTPS/TLS  
• OAuth2 / OpenID Connect  
• rotation des clés de chiffrement  
• cache ORS  
• circuit breaker (Resilience4j)  
• monitoring & observabilité

----------

## 👤 Auteur

Saliha Youbi  
Projet OpenClassrooms – Architecte Logiciel