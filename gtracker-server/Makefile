include .env

CONTAINER_NAME=gozem-tracker
IMAGE_NAME=gozem/tracker
CONTAINER_NAME_CLIENT=gozem-tracker-client
IMAGE_NAME_CLIENT=gozem/tracker-client

# SERVER COMMANDS
build_image:
	docker build --tag ${IMAGE_NAME} . -f ./docker/server.dockerfile
run_container:
	docker run --name '${CONTAINER_NAME}' -p ${NODE_DOCKER_EXPOSE_PORT}:${NODE_APP_PORT} -d ${IMAGE_NAME}
stop_container:
	docker stop ${CONTAINER_NAME}
remove_container:
	docker rm ${CONTAINER_NAME}
rerun_container: stop_container remove_container run_container
build_run: build_image stop_container remove_container run_container

# CLIENTS COMMANDS
build_client_image:
	docker build --tag ${IMAGE_NAME_CLIENT} ${CLIENT_BASE_PATH} -f ./docker/client.dockerfile --build-arg NODE_APP_PORT=${NODE_APP_PORT} 
run_client_container:
	docker run --name '${CONTAINER_NAME_CLIENT}' -p ${ANGULAR_DOCKER_EXPOSE_PORT}:4200 -d ${IMAGE_NAME_CLIENT}
stop_client_container:
	docker stop ${CONTAINER_NAME_CLIENT}
remove_client_container:
	docker rm ${CONTAINER_NAME_CLIENT}
rerun_client_container: stop_client_container remove_client_container run_client_container
build_client_run: build_client_image stop_client_container remove_client_container run_client_container

# DOCKER COMPOSE COMMANDS
compose_up:
	docker-compose --env-file .env up -d
compose_down:
	docker-compose --env-file .env down
