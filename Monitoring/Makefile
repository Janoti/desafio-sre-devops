####################
#
# Kubernetes Dashboard on Amazon EKS cluster with CPU and memory metrics
#
####################

deploy:
	docker pull kubernetesui/dashboard:v2.0.5
	kubectl apply -f kubernetes-Dashboard.yaml
	kubectl apply -f eks-admin-service-account.yaml

get_token:
	kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep eks-admin | awk '{print $1}')

expose:
	kubectl proxy

destroy:
	kubectl delete -f  kubernetes-Dashboard.yaml
	kubectl delete -f  eks-admin-service-account.yaml
