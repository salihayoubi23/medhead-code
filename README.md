# MedHead – Proof of Concept (PoC)

## 📌 Contexte

Le projet **MedHead** est une preuve de concept (PoC) réalisée pour un consortium médical (inspiré du NHS britannique) visant à valider une plateforme d’aide à la décision pour les interventions d’urgence.

L’objectif est de permettre :

- la **recommandation d’un hôpital** en fonction :
  - de la spécialité médicale,
  - de la disponibilité des lits,
  - de la distance et durée de trajet réelles,
- puis la **réservation d’un lit** en temps réel.

Cette PoC valide les choix d’architecture et les performances avant une industrialisation.

---

## 🏗️ Architecture technique

### Backend
- Java 17+  
- Spring Boot  
- Spring Data JPA  
- PostgreSQL  
- Intégration réelle de **OpenRouteService (ORS)** pour le routage  

### Frontend
- React (Vite)
- Bootstrap

### Qualité & Industrialisation
- Tests unitaires et d’intégration (JUnit, MockMvc)
- Tests de charge Apache JMeter
- Pipeline CI GitHub Actions

---

## 📁 Structure du dépôt

medhead-code/
│
├── medhead-backend/ # Backend Spring Boot + tests
├── medhead-frontend/ # Frontend React
├── performance/ # Tests de charge JMeter + rapports
├── .github/workflows/ # Pipeline CI
└── README.md

yaml
Copier le code

---

## ⚙️ Prérequis

- Java 17 ou supérieur  
- Maven  
- Node.js 18+  
- npm  
- PostgreSQL (via docker-compose ou local)

---

## 🚀 Lancer l’application

### ▶️ Backend

```bash
cd medhead-backend
mvn spring-boot:run
Backend disponible sur :

arduino
Copier le code
http://localhost:8080
▶️ Frontend
bash
Copier le code
cd medhead-frontend
npm install
npm run dev
Frontend disponible sur :

arduino
Copier le code
http://localhost:5173
🔗 Endpoints principaux
📍 Recommandation d’hôpital
POST /recommendations

json
Copier le code
{
  "speciality": "Cardiologie",
  "originZone": "LONDON_CENTRAL"
}
Réponse :

json
Copier le code
{
  "hospitalId": "HOSP-004",
  "hospitalName": "Hôpital St Mary Emergency",
  "availableBeds": 2,
  "distanceKm": 2.2,
  "durationMin": 7,
  "reason": "Choisi via ORS (distance réelle) + spécialité + lits"
}
🛏️ Réservation de lit
POST /reservations

json
Copier le code
{
  "hospitalId": "HOSP-004"
}
Réponse possible :

200 OK → réservation confirmée

404 → hôpital introuvable

409 → plus de lits disponibles

🧪 Tests automatisés
Backend
bash
Copier le code
cd medhead-backend
mvn test
Types de tests :

tests de démarrage Spring

tests de logique métier

tests des contrôleurs REST

tests de réservation

tests avec ORS mocké pour reproductibilité

📈 Tests de performance (JMeter)
Plan de test :

bash
Copier le code
performance/medhead_test_charge.jmx
Génération du rapport HTML :
bash
Copier le code
jmeter -n \
 -t performance/medhead_test_charge.jmx \
 -l performance/results_postgres_ors.jtl \
 -e \
 -o performance/rapport_html
Le rapport est ensuite disponible dans :

bash
Copier le code
performance/rapport_html/index.html
Caractéristiques des tests :
appels répétés sur /recommendations

ORS réel intégré

base PostgreSQL active

1000 requêtes simulées

🔄 Intégration continue (CI)
Pipeline GitHub Actions :

bash
Copier le code
.github/workflows/ci.yml
À chaque push :

✅ build backend
✅ tests backend
✅ build frontend

Objectif :

garantir la qualité

détecter les régressions

assurer la reproductibilité

📦 Livrables
Ce dépôt contient :

✔️ le code backend + frontend
✔️ les tests automatisés
✔️ les tests de charge JMeter
✔️ le pipeline CI

Le reporting d’architecture et de performance est disponible dans le dépôt dédié medhead_architecture.

📊 Résumé des technologies
Domaine	Technologies
Backend	Java, Spring Boot, JPA
Base de données	PostgreSQL
Routage	OpenRouteService
Frontend	React, Vite
Tests	JUnit, MockMvc
Performance	Apache JMeter
CI	GitHub Actions

📌 Objectif de la PoC
Valider l’architecture microservices

Tester l’intégration de services externes

Mesurer les performances

Préparer l’industrialisation