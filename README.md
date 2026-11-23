# Gestion des stades

Le projet contient l'application Angular et son backend Spring Boot. Les stades et leurs catégories sont enregistrés dans MySQL.

## Prérequis

- JDK 21
- Maven 3.6.3 ou plus récent
- MySQL en cours d'exécution
- Node.js et npm

## Base de données

Dans `backend/src/main/resources/application.properties`, la configuration utilise l'utilisateur MySQL `root` et un mot de passe vide par défaut. Si votre serveur MySQL utilise un mot de passe, définissez la variable d'environnement `DB_PASSWORD` avant de démarrer le backend.

La base `stade_db` et les tables sont créées automatiquement au premier lancement. Les catégories et les trois stades déjà présents dans la version Angular sont insérés une seule fois dans MySQL afin de retrouver les données de départ.

## Démarrer le backend

Dans un terminal, depuis le dossier `backend` :

```bash
mvn spring-boot:run
```

L'API est disponible à `http://localhost:8081/api`.

## Démarrer Angular

Dans un autre terminal, depuis le dossier racine du projet :

```bash
npm install
npm start
```

Puis ouvrir `http://localhost:4200`.

## API

- `GET/POST /api/stades`
- `GET/PUT/DELETE /api/stades/{id}`
- `GET /api/stades/categorie/{idCat}`
- `GET /api/stades/recherche?nom=...`
- `GET/POST /api/categories`
- `GET/PUT/DELETE /api/categories/{id}`

