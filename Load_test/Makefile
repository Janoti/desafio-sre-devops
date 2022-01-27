#### K6 Docker Install ####

# When using the `k6` docker image, you can't just give the script name since
# the script file will not be available to the container as it runs. Instead
# you must tell k6 to read `stdin` by passing the file name as `-`. Then you
# pipe the actual file into the container with `<` or equivalent. This will
# cause the file to be redirected into the container and be read by k6.

k6_install :
	docker-compose up -d influxdb grafana 

k6_get_test	:
	docker-compose run k6 run /scripts/get_script_Docker_Local.js 
	echo "Resultados no Dashboard -> http://localhost:3000/d/k6/k6-load-testing-results"

k6_insert_test:
	docker-compose run k6 run /scripts/insert_script_Docker_Local.js 
	echo "Resultados no Dashboard -> http://localhost:3000/d/k6/k6-load-testing-results"

k6_search_test:
	docker-compose run k6 run   /scripts/search_script_Docker_Local.js 
	echo "Resultados no Dashboard -> http://localhost:3000/d/k6/k6-load-testing-results"

k6_cloud:
#	cd ./K6 && docker-compose up -d influxdb grafana
#    url := 	kubectl describe svc nodejs-app | grep "LoadBalancer Ingress:"

#	cd ./K6/scripts/ && sed -i 's/teste/test222/g' ./search_script_Docker_Local2.js
#	cd ./K6 && docker-compose run k6 run /scripts/search_script_Docker_Local.js 
#	echo "Resultados no Dashboard -> http://localhost:3000/d/k6/k6-load-testing-results"

clean:
	docker-compose down --volumes

