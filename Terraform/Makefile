# Variables 
#################################################
bucket       := desafio-stone-bucket
region       := us-east-2
cluster_name := myapp-cluster

 ### Obs: cluster_name é o mesmo que o modulo do Terraform cria.
 ###     
		  
#################################################

external_ip:
	kubectl describe svc nodejs-app | grep "LoadBalancer Ingress:"

create_bucket:
	aws s3api create-bucket --bucket $(bucket) --region $(region) --create-bucket-configuration LocationConstraint=$(region)

retrive_auth:
	aws sts get-caller-identity
	aws eks --region $(region) update-kubeconfig --name $(cluster_name)

deploy:
	kubectl apply -f ../app/Kubernetes/DB_Deploy/mysql_pv.yaml,../app/Kubernetes/DB_Deploy/mysql_pvc.yaml,../app/Kubernetes/DB_Deploy/mysql_deployment.yaml,../app/Kubernetes/DB_Deploy/secrets.yaml,../app/Kubernetes/DB_Deploy/mysql_service.yaml
	kubectl apply -f ../app/Kubernetes/APP_Deploy/app_deployment.yaml,../app/Kubernetes/APP_Deploy/app_ingress.yaml,../app/Kubernetes/APP_Deploy/app_service.yaml

cluster:
	aws eks describe-cluster --name myapp-cluster --region us-east-2

terraform:
	terraform init 
	terraform plan -out=tfplan
	terraform apply tfplan 

terraform_refresh:
	terraform init
	terraform apply -refresh-only