web:
	bash generate/web/render_docker.sh
map:
	bash generate/map/grass_docker_run.sh
ts:
	npm install 
	npm run wp
permutations:
	bash generate/generate_permutations.sh
dockerimage:
	docker build -t traines-source/ccc .
all: web map ts permutations dockerimage
