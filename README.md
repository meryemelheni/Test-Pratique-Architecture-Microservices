# Architecture Microservices E-commerce - Test Pratique

Ce projet implémente une architecture microservices complète pour une plateforme e-commerce simple, développée avec **Spring Boot**, **Docker**, et **React Native**.

## Structure du Projet
- `eureka-server` : Service de découverte (Port 8761).
- `api-gateway` : Passerelle API (Port 8090) gérant le routage et les CORS.
- `produits-service` : Gestion des produits et catégories (Port 8091).
- `avis-service` : Gestion des avis clients (Port 8092).
- `mobile-app` : Frontend React Native (Expo) pour le web.

## Prérequis
- Docker & Docker Compose
- Java 17+
- Node.js & npm

## Lancement du Projet

### 1. Backend (Docker)
Depuis la racine du projet :
```bash
# Compiler les services Java
cd produits-service && ./mvnw clean package -DskipTests && cd ..
cd avis-service && ./mvnw clean package -DskipTests && cd ..
cd eureka-server && ./mvnw clean package -DskipTests && cd ..
cd api-gateway && ./mvnw clean package -DskipTests && cd ..

# Lancer l'infrastructure
docker-compose up -d --build
```

### 2. Frontend (React Native Web)
```bash
cd mobile_app
npm install
npx expo start --web --port 8085
```
Accédez à l'application via `http://localhost:8085`.

## Tests (Branche version2)

### Tests Unitaires et Intégration
Dans `produits-service` :
```bash
./mvnw test
```
- `ProduitServiceTest` : Mockito pour la logique métier.
- `ProduitRepositoryTest` : @DataJpaTest avec base H2.

### Tests E2E (Cypress)
Depuis la racine :
```bash
npm install cypress --save-dev
npx cypress run
```
Les tests Cypress simulent le parcours : **Liste produits -> Détail produit -> Vérification des avis**.

---
*Auteur : Meryem El Heni*
