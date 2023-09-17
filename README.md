# Ecommerce service
This project was working with Node js v18.15.0 or higher and PostgreSQL are required.

## Environment
Create a enviroment file for development **.env**

```
#Port of project
PORT = 

#COFIG DATABASE
TYPE = postgres
HOST = 
USERNAMEDB =
PASSWORD = 
DATABASE = 
PORTDB = 

#JWT
SECRET = 
```

## Development server
Run `npm run dev` for a dev server. The application will automatically reload if you change any of the source files.

## Development data base with docker
Run `docker-compose up` for a dev db. The db will automatically create database and tables

## Destroy data base in docker

Run `docker-compose down` for stop db. The db wiil automatically delete container of docker

## Build
Run `npm run build` the project. The build artifacts will be stored in the dist/ directory.
