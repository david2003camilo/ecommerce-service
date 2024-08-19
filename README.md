# Ecommerce service
This project was working with Node js v18.15.0 or higher and PostgreSQL are required.

## Environment
Create a enviroment file for development **.env**

```
# CONFIG DATA BASE
POSTGRES_USERNAMEDB=root
POSTGRES_PASSWORD=4c0mm4rc4-s4rv1c4s
POSTGRES_DATABASE=root
POSTGRES_HOST=postgresdb
POSTGRES_PORTDB=5432

#PORT SERVER
NODE_LOCAL_PORT=9090
NODE_DOCKER_PORT=9090


#JWT
JWT_SECRET = QWEHUUIUASAASA/AS/A?ASASA
```

## Development server
Run `npm run dev` for a dev server. The application will automatically reload if you change any of the source files.

## Development data base with docker
Run `docker-compose up` for a dev db. The db will automatically create database and server project

## Destroy data base in docker

Run `docker-compose down` for stop db and server. The db wiil automatically delete container of docker

## Build
Run `npm run build` the project. The build artifacts will be stored in the dist/ directory.
