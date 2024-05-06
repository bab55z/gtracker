# Gozem Package Tracker

A Gozem app to track packages delivery.

Gozem tracker quick docs

## 1) Overview
Gozem tracker allows users, drivers and admin to manage a package tracking system

The project is divided in two part/folders: 
	- `./gtracker-server` : this directory contains the nodejs/express server app
	- `./gtracker-client` : this directory contains the angular client app

## 2) Requirements
- Server app
  - MongoDB : a mongoDb run instance with access credentials
  - NodeJS installed: to server the app
  - npm/yarn package node manager: to install the dependencies

- Client app
  - Angular Cli: to launch and run the angular app

- Docker
  - Docker installed, 
  - Docker desktop (Optional but recommended)
  - Make installed on the system (Optional but recommended: https://www.gnu.org/software/make/#documentation)


## 3) Installing and running the app
You have two options to run the app.
 - ##### .env file (`./gtracker-server`)
  ````markdown
    ENVIRONMENT=dev
    # Absolute path to the server app folder 
    BASE_PATH=/projects/ws/Gozem/gtracker-server
    # Absolute path to the client app folder 
    CLIENT_BASE_PATH=/projects/ws/Gozem/gtracker-client
    # Path to the docker compose file
    COMPOSE_FILE=$BASE_PATH/docker/docker-compose.yml
    # Docker compose project name
    COMPOSE_PROJECT_NAME=package-tracker
    # Path to the server app Dockerfile
    DOCKERFILE_NAME=$BASE_PATH/docker/server.dockerfile
    # Path to the client app Dockerfile
    CLIENT_DOCKERFILE_NAME=$BASE_PATH/docker/client.dockerfile

    # Mongo DB credentials
    DB_USER=gtracker
    DB_HOST=127.0.0.1
    DB_PASSWORD=gtracker
    DB_NAME=gtracker
    DB_LOCAL_PORT=7017 # exposed port when using docker
    DB_PORT=27017
    # Mongo DB storage docker container folder
    DB_STORAGE=$BASE_PATH/docker/data/db

    # Server app exposed port from the docker container
    NODE_DOCKER_EXPOSE_PORT=3000
    # Server app port and server app docker container internal port
    NODE_APP_PORT=3000
    # Server app folder
    APP_FOLDER=$BASE_PATH/
    # Client app exposed port from the docker container
    ANGULAR_DOCKER_EXPOSE_PORT=4200
    # Client app folder
    ANGULAR_APP_FOLDER=$CLIENT_BASE_PATH/
  ````
 - ##### Run directly
    - Run your MongoDb instance and create the credentials for the server app
    - Set configs (.env file)
        - server · db credentials
        - server · port
        - client · *delivery service*, *package service* and *websocket service* api url port replace the **serverPort** environment variable `./gtracker-client/src/environments/environment.ts`
    - install the server dependencies: go to the server folder (./gtracker-server) and run `yarn install`
    - install the client dependencies: got to the client folder (./gtracker-client) and run `yarn install`
    - start the server: go to the server folder (./gtracker-server) and run `yarn dev` or `yarn start`, the app will be running on the port configured previously
    - start the client app: go to the client folder (./gtracker-client) and run `ng serve`, the app will be runnning on the default port http://localhost:4200

 - ##### Run using Docker (compose)
    *Before going ahead, if you updated the server port in the client app folder*  `./gtracker-client/src/environments/environment.ts` *you need to set it back to **3000**, during the build, the **3000** is replaced with the correct server port from env file.*
    #####
    Configs and files related to docker are located in the server folder `(./gtracker-server)` and `(./gtracker-server/docker)` thus the following commands need to be run from that folder `(./gtracker-server)`
    - Set configs
    	- go to the server folder (./gtracker-server) and edit the .env file using following instruction
    - start docker or launch docker desktop
      - #### If you have Make:
          you can run the following commands to manage the app

          ##### DOCKER COMPOSE COMMANDS
          - `make compose_up` to spin up a full environment composed of the db, the server and the client.
          - `make compose_down` to down the environment

          ##### SERVER DOCKER COMMANDS
          - `build_image` to build the server image
          - `run_container` to run the server container
          - `stop_container` to stop the server container
          - `remove_container` to remove the server container
          - `rerun_container` to remove and run a new server container
          - `build_run` to build the server image and run a new container

          ##### CLIENT DOCKER COMMANDS
          - `build_client_image` to build the client image
          - `run_client_container` to run the client container
          - `stop_client_container` to stop the client container
          - `remove_client_container` to remove the client container
          - `rerun_client_container` to remove and run a new client container
          - `build_client_run` to build the client image and run a new container

      - #### If you don't have Make: 
          go to the server folder (./gtracker-server) run `docker-compose --env-file .env up -d`
          #####
          Here are other useful docker commands, you'll need to replace the placeholder `${XXX}` with the corresponding 
          
          ##### SERVER DOCKER COMMANDS
          - `docker build --tag ${IMAGE_NAME} . -f ./docker/server.dockerfile` to build the server image
          - `docker run --name '${CONTAINER_NAME}' -p ${NODE_DOCKER_EXPOSE_PORT}:${NODE_APP_PORT} -d ${IMAGE_NAME}` to run the server container
          - `docker stop ${CONTAINER_NAME}` to stop the server container
          - `docker rm ${CONTAINER_NAME}` to remove the server container

          ##### CLIENT DOCKER COMMANDS
          - `docker build --tag ${IMAGE_NAME_CLIENT} ${CLIENT_BASE_PATH} -f ./docker/client.dockerfile --build-arg NODE_APP_PORT=${NODE_APP_PORT}` to build the client image
          - `docker run --name '${CONTAINER_NAME_CLIENT}' -p ${ANGULAR_DOCKER_EXPOSE_PORT}:4200 -d ${IMAGE_NAME_CLIENT}` to run the client container
          - `docker stop ${CONTAINER_NAME_CLIENT}` to stop the client container
          - `docker rm ${CONTAINER_NAME_CLIENT}` to remove the client container

## 4) Usage
Open your browser and go to the app, typically http://localhost:4200 and Use the app accordingly to the business case specification

## 5) Troubleshooting
If you encounter some errors with docker,
- restarting docker or docker desktop may help fixing errors and flush docker caches.
- make sure that you have enough disk space left
- make sure to have a stable internet connection
- If you encounter any other errors ,you may reach out to me for assistance.

## 5) how to make the app better
- improve errors handling
- add authentication and authorization to separate which part of the app is available for the logged in user
- clean up unused codes
- clean up logged information to avoid sensitive information leaks
- add auto complete address (from and to) while retrieving the corresponding the related lat/lng point
- some minor fix on the ui
- setup some ci/cd pipeline
- properly setup .gitignore and other .*ignore files

## 6) Author
My name is Williem Babalola. A software engineer with more than 10 years of experience.
Skilled in Full Stack development, problem-solving, and software architecture with a focus on creating innovative solutions.
yo@williems.com 
Thanks

## BONUS 🙃 App Preview
### docker compose
![compose](./gtracker-server/assets/gozem.compose.gif)
### create package/delivery
![create](./gtracker-server/assets/gozem.create.gif)
### preview
![preview](./gtracker-server/assets/gozem.preview.gif)
### track package
![track](./gtracker-server/assets/gozem.track.gif)
### live status update
![update](./gtracker-server/assets/gozem.update.gif)