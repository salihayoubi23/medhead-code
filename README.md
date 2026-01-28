📘 MedHead – Preuve de concept (PoC)
🎯 Objectif
Cette preuve de concept (PoC) a été réalisée pour le MedHead Consortium (NHS) afin de valider un service d’intervention d’urgence permettant :

de recommander un hôpital en fonction :

d’une spécialité médicale,

de la disponibilité des lits,

de la distance et durée de trajet réelles (OpenRouteService),

puis de réserver un lit avec mise à jour persistée en base.

La PoC a été développée avec :

un backend Java / Spring Boot (API REST),

un frontend React (Vite) + Bootstrap,

une base PostgreSQL,

un service de routage réel OpenRouteService (ORS).

📁 Contenu du dépôt
medhead-backend/ : backend Spring Boot + PostgreSQL + ORS + tests

medhead-frontend/ : frontend React

performance/ : tests de montée en charge (JMeter + rapports)

.github/workflows/ci.yml : pipeline d’intégration continue

README.md : documentation du projet

🧰 Prérequis
Java 17+ (ou 21)

Maven

Node.js  (18+ recommandé)

npm

Docker Desktop (pour PostgreSQL)

🗄️ Lancer la base de données (PostgreSQL)
Depuis medhead-backend/ :

bash
docker compose up -d
⚙️ Configurer OpenRouteService
Dans :

Code
medhead-backend/src/main/resources/application.properties
Renseigner :

Code
ors.api.key=VOTRE_CLE_ORS
ors.profile=driving-car
🚀 Lancer le backend
bash
cd medhead-backend
mvn spring-boot:run
Backend disponible sur :
👉 http://localhost:8080

💻 Lancer le frontend
bash
cd medhead-frontend
npm install
npm run dev
Frontend disponible sur :
👉 http://localhost:5173

🔌 Endpoints principaux
🏥 Recommandation
POST /recommendations

Exemple de requête :

json
{
  "speciality": "Cardiologie",
  "originZone": "LONDON_CENTRAL"
}
Exemple de réponse :

json
{
  "hospitalId": "HOSP-004",
  "hospitalName": "Hôpital St Mary Emergency",
  "availableBeds": 2,
  "distanceKm": 2.2,
  "durationMin": 7,
  "reason": "Choisi via ORS (distance réelle) + spécialité + lits"
}
🛏️ Réservation
POST /reservations

json
{
  "hospitalId": "HOSP-004"
}
Codes HTTP
Code	Signification
200	Réservation confirmée
404	Hôpital introuvable
409	Aucun lit disponible
🧪 Tests automatisés
Backend
bash
cd medhead-backend
mvn test
Les tests couvrent :

démarrage Spring

logique métier (recommandation, réservation)

endpoints REST

👉 Les appels ORS sont mockés pour garantir reproductibilité et rapidité.

Frontend
bash
cd medhead-frontend
npm install
npm run build
📈 Tests de montée en charge (JMeter)
Scénarios disponibles dans :

Code
performance/medhead_test_charge.jmx
Principe :

backend lancé sur http://localhost:8080

appels répétés sur /recommendations

Génération d’un rapport HTML :

bash
jmeter -n -t performance/medhead_test_charge.jmx \
       -l performance/results.jtl \
       -e -o performance/rapport_html
Les résultats incluent :

temps de réponse

taux d’erreur

throughput

métriques APDEX

⚠️ Les performances incluent la latence ORS réelle (service externe).

🔄 Intégration continue
Pipeline GitHub Actions :

Code
.github/workflows/ci.yml
À chaque push sur main :

build backend

tests backend

build frontend

🌿 Workflow Git
Branche principale : main

Commits fréquents et traçables

Validation automatique par CI

📝 Remarques
L’intégration ORS apporte une variabilité naturelle (latence réseau + quotas).

En industrialisation :

cache ORS

timeouts

circuit breakers

monitoring

👤 Auteur
PoC réalisée dans le cadre du projet MedHead – Architecte Logiciel.