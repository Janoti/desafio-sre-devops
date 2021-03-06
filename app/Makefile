# Variables 
#################################################
min         := 1
max         := 5
namespace   := desafio-ns
image-name  := nodeapp
docker-repo := janotijr/desafio
ecr-repo    := ecr_example_repo
version     := test
#################################################

#DOCKER LOCAL
local: 
	eval $(minikube docker-env)
	docker build ./ -t $(image-name)
	docker-compose up -d

stop_local:
	docker-compose down --volumes


push:
	docker build ./ -t $(image-name)
	docker tag $(image-name) $(docker-repo):$(version)
	docker push $(docker-repo):$(version)

# KUBERNETES LOCAL
service-ip: # returns IP address of Ingress (app)
	kubectl describe ingress -n $(namespace) | grep Address
	
k8s:
	eval $(minikube docker-env)
	docker build ./ -t $(image-name)
	docker tag $(image-name) $(docker-repo):$(version)
	minikube start --extra-config=apiserver.service-node-port-range=2999-3000
	minikube addons enable ingress
	minikube addons enable metrics-server
	eval $(minikube docker-env)

	kubectl create namespace $(namespace)
	kubectl apply -f ./Kubernetes/DB_Deploy/mysql_pv.yaml,./Kubernetes/DB_Deploy/mysql_pvc.yaml,./Kubernetes/DB_Deploy/mysql_deployment.yaml,./Kubernetes/DB_Deploy/secrets.yaml,./Kubernetes/DB_Deploy/mysql_service.yaml --namespace=$(namespace) 
	kubectl apply -f ./Kubernetes/APP_Deploy/app_deployment.yaml,./Kubernetes/APP_Deploy/app_ingress.yaml,./Kubernetes/APP_Deploy/app_service.yaml --namespace=$(namespace) 
	kubectl autoscale deployment/nodejs-app --cpu-percent=50 --min=$(min) --max=$(max) -n $(namespace)
	minikube service nodejs-app --namespace=$(namespace) --url 

del_k8s:
	kubectl delete all --all -n $(namespace)
	kubectl delete namespace $(namespace)

img-update-k8s: # faz o update da versão da imagem utilizada no cluster local. Imagem deve estar publicada no Docker Hub
	kubectl set image deployment/nodejs-app nodejs-app=$(docker-repo):$(version) 
	kubectl rollout status deploy/nodejs-app -n $(namespace)

	
rollback_status:
	kubectl rollout status deploy/nodejs-app 
	kubectl rollout history deploy/nodejs-app

rollback:
	kubectl rollout undo deployment/nodejs-app  -n $(namespace)


