# Variables 
#################################################
min         := 1
max         := 5
namespace   := desafio-ns
image-name  := nodeapp
docker-repo := janotijr/desafio
ecr-repo    := ecr_example_repo
version     := v2
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
	kubectl describe ingress -n $(namespace) |grep Address
	
k8s-local:
	minikube start
	minikube addons enable ingress
	eval $(minikube docker-env)
	kubectl create namespace $(namespace)
	kubectl apply -f ./Kubernetes/DB_Deploy/mysql_pv.yaml,./Kubernetes/DB_Deploy/mysql_pvc.yaml,./Kubernetes/DB_Deploy/mysql_deployment.yaml,./Kubernetes/DB_Deploy/secrets.yaml,./Kubernetes/DB_Deploy/mysql_service.yaml --namespace=$(namespace) 
	kubectl apply -f ./Kubernetes/APP_Deploy/app_deployment.yaml,./Kubernetes/APP_Deploy/app_ingress.yaml,./Kubernetes/APP_Deploy/app_service.yaml --namespace=$(namespace) 
	kubectl autoscale deployment/nodejs-app --cpu-percent=50 --min=$(min) --max=$(max) -n $(namespace)
	minikube service nodejs-app --namespace=$(namespace) --url

del_k8s:
	kubectl delete all --all -n $(namespace)
	kubectl delete namespace $(namespace)

push_ecr:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 723595992567.dkr.ecr.us-east-1.amazonaws.com
	docker build -t ecr_example_repo .
	docker tag ecr_example_repo:latest 723595992567.dkr.ecr.us-east-1.amazonaws.com/ecr_example_repo:latest
	docker push 723595992567.dkr.ecr.us-east-1.amazonaws.com/ecr_example_repo:latest