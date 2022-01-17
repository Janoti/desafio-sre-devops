# Stone Challenge
 
 
## Para rodar a aplicação localmente em containers Docker:

    * Instale o Docker (linux): https://docs.docker.com/engine/install/ubuntu/

    * Clone o repositorio 

    * Entre no diretório /app    

    * Dentro do diretório, execute:

   ``` $make local ```

    * O nome da imagem está definido na seção Variables do arquivo Makefile
 
    -- Abra seu navegador e digite: http://127.0.0.1:3000/api/v1/users

    * Para dar Stop no ambiente, execute:

   ``` $make stop-local ```
    
## Para rodar localmente no cluster Kubernetes (Minikube):
    
    * Instale o Minikube no Linux: https://minikube.sigs.k8s.io/docs/start/

    * Dentro do diretório /app, execute:

   ``` $make k8s-local ```
    

## Rotas do app local (Docker)

    * No Kubernetes (minikube), verificar a porta gerada pelo tunel


     Retorna lista de usuários:  http://127.0.0.1:3000/api/v1/users 

     Pesquisa por CPF: http://127.0.0.1:3000/api/v1/users/<cpf> # retorna um json

     Inserir usuário: Utilize o Postman ou substitua os dados exemplo abaixo e execute no terminal:

     ``` curl --location --request POST 'http://localhost:3000/api/v1/users' \--header 'Content-Type: application/json' \--data-raw '{ "name": "InsiraSeuNome", "last_name": "InsiraSeu Sobrenome", "cpf": 122312321321, "email": "ninguemusa@yahoo.com.br", "birthdate": "19/01/1989"}' ```

## Amazon Web Services

    * Acesse o diretorio /Terraform, execute:
``` $make terraform ```

    * Aguarde alguns minutos até a infra ser criada na AWS. Esse primeiro run do Terraform irá criar toda a infra. Após a criação, edite o arquivo state.tf e descomente todo o bloco do Backend. Isso é necessário pois primeiro deve ser criado o bucket e a tabela do Dynamo.

    * Após a criação da infra, bucket e Dynamo e descomentado o trecho de código, execute novamente:

``` $make terraform ```

    * Faça um Update no Kubeconfig para acessar o cluster criado:

``` $make retrive_auth ```

    * Agora faça o Deploy nos manisfetos do Kubernetes (Banco e APP) na infra criada:

``` $make deploy ```

    * Podemos verificar nossa infra com os comandos:
     - Verificar Cluster: 
 ``` $make cluster ```

    * Acessar a aplicação, execute o comando, copie o endereço e cole no navegador:
 ``` $make external_ip ```

## Acesso pelo GCP - Google

    * Retorna a lista de usuários

    -- http://34.67.24.110/users

    * Retorna o usuário pesquisando pelo cpf

    -- http://34.67.24.110/users/<cpf>
 
    * Para inserir um novo usuário, substitua os dados do usuário na estrutura abaixo:

       ``` curl --location --request POST 'http://34.67.24.110/users' \--header 'Content-Type: application/json' \--data-raw '{
         "nome": "InsiraSeuNome",
         "sobrenome": "InsiraSeu Sobrenome",
         "cpf": 122312321321,
         "email": "ninguemusa@yahoo.com.br",
         "data_nasc": "19/01/1989"}' ```

## Monitoramento 

* Principais gráficos de monitoramento do Cluster Kubernetes em Grafana com GKE CLuster Monitoring Plugin
``` http://34.71.211.208:3000/d/Z1HlU5FMa/gke-cluster-monitoring?orgId=1&from=1605647426677&to=1605651026679&var-datasource=Google%20Cloud%20Monitoring&var-project= ```

``` Login: stone ```
``` Senha : stone ```     

* Principais gráficos de Monitoramento das VMs

``` http://34.71.211.208:3000/d/4ZIrp9DMa/gce-vm-instance-monitoring?orgId=1&from=1605652821670&to=1605656421670&var-datasource=Google%20Cloud%20Monitoring&var-project= ```

## Teste de Carga

* Para os testes de carga contra a API no GKE, foi utilizado o Locust

* Para instalação local executar:

    * Ir para a pasta load 
    * Executar ``` make local ```
    * Abra seu navegador em 127.0.0.1:8089
    
 * O seguinte teste de carga foi executado:

 * Report Locust: <link> https://github.com/Janoti/stone-challenge-janoti/blob/master/load/Test%20Report.pdf </link>
 
    * Inserção de 10000 usuários com 100 inserções por segundo
    * A app começou a degradar o Response Time, chegando em 36000ms quando se tinha inserido mais de 8000 usuários e o Rquests per Second chegava a mais de 720.
    * Nesse momento a app começou a falhar, recusando conexões.
    * Como se trata de um app que usa persistência em memória, segere-se um aumento de memória nas instâncias no GCP.
     
## TERRAFORM 

-- Para gerar toda a infra no GKE, executar dentro da pasta terraform-gke

    -- terraform init
    -- terraform apply
    -- Após o término do Terraform criar a infra, execute:
    -- make build # vai pegar as credenciais do gke para o gcloud e rodar kubectl apply no deployment.yaml, criando o serviço e o deploy no gke. A imagem Docker está registrada em gcr.io/stone-challenge-janoti/challenge-stone
    
    
    

## Acesso pelo PAAS Heroku: 

* Retorna a lista de usuários

    ``` https://stone-challenge-janoti.herokuapp.com/users ```

* Retorna o usuário pesquisando pelo cpf

   ``` https://stone-challenge-janoti.herokuapp.com/users/ ```

* Para inserir um novo usuário, substitua os dados do usuário na estrutura abaixo:

   ``` curl --location --request POST 'https://stone-challenge-janoti.herokuapp.com/users' \--header 'Content-Type: application/json' \--data-raw '{
     "nocme": "InsiraSeuNome",
     "sobrenome": "InsiraSeu Sobrenome",
     "cpf": 122312321321,
     "email": "ninguemusa@yahoo.com.br",
     "data_nasc": "19/01/1989"}' ```
                
