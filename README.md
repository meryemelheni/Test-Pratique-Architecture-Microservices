# Projet Boutique - Architecture Microservices

Ce projet est une démonstration d'une architecture microservices utilisant Spring Boot 4, Spring Cloud (Eureka, Gateway, Feign), Docker Compose, et une application mobile Flutter.

## Structure du Projet

- `eureka-server`: Serveur d'enregistrement (Port 8761)
- `api-gateway`: Passerelle API (Port 8090)
- `produits-service`: Gestion des produits et catégories (Port 8091)
- `avis-service`: Gestion des avis clients (Port 8092)
- `mobile_app`: Application mobile Flutter
- `docker-compose.yml`: Orchestration des conteneurs

## Prérequis

- Docker et Docker Compose
- Maven 3.9+
- JDK 25

## Lancement du projet

1. **Compiler les microservices** :
   ```bash
   mvn clean package -DskipTests -f eureka-server/pom.xml
   mvn clean package -DskipTests -f api-gateway/pom.xml
   mvn clean package -DskipTests -f produits-service/pom.xml
   mvn clean package -DskipTests -f avis-service/pom.xml
   ```

2. **Démarrer avec Docker Compose** :
   ```bash
   docker-compose up --build
   ```

## Accès aux services

- **API Gateway** : `http://localhost:8090`
- **Eureka Dashboard** : `http://localhost:8761`
- **Swagger Produits** : `http://localhost:8091/swagger-ui.html`
- **Swagger Avis** : `http://localhost:8092/swagger-ui.html`

## Tests

### Tests Unitaires et Intégration (Spring Boot)
```bash
mvn test -f produits-service/pom.xml
```

### Tests E2E (Cypress)
1. Installer Cypress : `npm install cypress --save-dev`
2. Lancer les tests : `npx cypress run`

## Branches Git
- `version1`: Parties 1 à 4 (Infrastructure et Services)
- `version2`: Parties 5 et 6 (Mobile et Tests)
