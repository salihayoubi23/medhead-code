# MedHead - Preuve de concept (PoC)

## Objectif
Cette preuve de concept (PoC) a été réalisée pour le **MedHead Consortium** afin de valider un service d’intervention d’urgence permettant :
- de **recommander un hôpital** en fonction d’une spécialité et d’une zone d’origine,
- puis de **réserver un lit** (décrémentation des lits disponibles).

La PoC a été développée avec :
- un **backend Java / Spring Boot**,
- un **frontend React (Vite) + Bootstrap**.

---

## Contenu du dépôt
- `medhead-backend/` : code du backend Spring Boot + tests
- `medhead-frontend/` : code du frontend React
- `performance/` : tests de montée en charge (JMeter)
- `.github/workflows/ci.yml` : pipeline d’intégration continue (tests/build)

---

## Prérequis
- Java 17 (ou supérieur)
- Maven
- Node.js (version 18+ recommandé)
- npm

---

## Lancer le backend
Se placer dans le dossier backend :
```bash
cd medhead-backend
``` 
## Lancer l’application :

```bash
Copier le code
mvn spring-boot:run
Le backend démarre sur :

http://localhost:8080 

```
## Lancer le frontend
Se placer dans le dossier frontend :

```bash
Copier le code
cd medhead-frontend
```

## Installer les dépendances :

```bash
Copier le code
npm install
```
## Lancer le serveur de développement :

```bash
Copier le code
npm run dev
```

## Endpoints principaux
#### Recommandation
* Méthode : POST

URL : http://localhost:8080/recommendations

Exemple de corps JSON :

```json
Copier le code
{
  "speciality": "CARDIOLOGY",
  "originZone": "LONDON"
}
```
#### Réservation
* Méthode : POST

URL : http://localhost:8080/reservations

Exemple de corps JSON :

```json
Copier le code
{
  "hospitalId": "HOSP_001"
}
```

#### Exécuter les tests
* Backend
``` bash
Copier le code
cd medhead-backend
mvn test
```

* Frontend
Le frontend est validé via le build :

```bash
Copier le code
cd medhead-frontend
npm install
npm run build
```

#### Tester et builder la PoC
* Backend (artefact)
```bash
Copier le code
cd medhead-backend
mvn package
```
* Frontend (build)
```bash
Copier le code
cd medhead-frontend
npm install
npm run build
```
## Tests de montée en charge (JMeter)
Les tests de montée en charge sont disponibles dans :

- performance/medhead_test_charge.jmx

Principe :

le backend doit être démarré sur http://localhost:8080

JMeter exécute des appels sur l’endpoint /recommendations

* Commande (mode non graphique) pour générer un rapport :

```bash
Copier le code
jmeter -n -t performance/medhead_test_charge.jmx -l performance/resultats.jtl -e -o performance/rapport
```
## Intégration continue (pipeline)

Un pipeline d’intégration continue est configuré dans :

.github/workflows/ci.yml

À chaque envoi de code sur la branche main, le pipeline exécute :

* les tests et le build du backend,

le build du frontend.

## Workflow Git utilisé
Une branche principale : main

Commits réguliers et traçables

Vérification automatique via le pipeline d’intégration continue