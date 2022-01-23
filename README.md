# Stone Challenge
 
 <!--START_SECTION:waka-->
<!--END_SECTION:waka-->

## Para rodar a aplicação localmente em containers Docker:

    * Instale o Docker (linux): https://docs.docker.com/engine/install/ubuntu/

    * Clone o repositorio 

    * Entre no diretório /app    

    * Dentro do diretório, execute:

   ``` $make local ```

    * O nome da imagem está definido na seção Variables do arquivo Makefile
 
      Abra seu navegador e digite: http://127.0.0.1:5000/api/v1/users

    * Para dar Stop no ambiente, execute:

   ``` $make stop-local ```
    
## Para rodar localmente no cluster Kubernetes (Minikube):
    
    * Instale o Minikube no Linux: https://minikube.sigs.k8s.io/docs/start/

    * Dentro do diretório /app, execute:

   ``` $make k8s-local ```
    

## Rotas do app local (Docker)

     Retorna lista de usuários:
```  http://127.0.0.1:5000/api/v1/users ```

     Pesquisa por CPF: 
``` http://127.0.0.1:5000/api/v1/users/<cpf>```

     Inserir usuário: Utilize o Postman ou substitua os dados exemplo abaixo e execute no terminal:

``` curl --location --request POST 'http://localhost:5000/api/v1/users' \--header 'Content-Type: application/json' \--data-raw '{ "name": "InsiraSeuNome", "last_name": "InsiraSeu Sobrenome", "cpf": 122312321321, "email": "ninguemusa@yahoo.com.br", "birthdate": "19/01/1989"}' ```

## Amazon Web Services

    * Certifique-se que AWS Cli e o Terraform estejam instaladaos e configurados

    * Acesse o diretorio /Terraform, execute:
``` $make terraform ```

    * Aguarde alguns minutos até a infra ser criada na AWS. Esse primeiro run do Terraform irá criar toda a infra. Após a criação, edite o arquivo state.tf e descomente todo o bloco do Backend. Isso é necessário pois primeiro deve ser criado o bucket e a tabela do Dynamo.

    * Após a criação da infra, bucket e Dynamo e descomentado o trecho de código, execute novamente:

``` $make terraform_refresh ```

    * Faça um Update no Kubeconfig para acessar o cluster criado:

``` $make retrive_auth ```

    * Agora faça o Deploy nos manisfetos do Kubernetes (Banco e APP) na infra criada:

``` $make deploy ```

    * Podemos verificar nossa infra com os comandos:

 ``` $make cluster ```

    * Para acessar a aplicação, execute o comando abaixo, copie o endereço e cole no navegador (acrescentar a porta no final da url :5000):
 ``` $make external_ip ```

## Monitoramento 

* Grafana e Prometheus ? Implementar Cloud

## Teste de Carga (K6) - Local e Cloud (AWS)

* Para os testes de carga contra a API localmente e na Cloud foi utilizado o K6
* Site [k6.io](K6.io)

*  Vá para o diretório /Load_Test

* Instale o K6 com Grafana e Influxdb (via Docker) clonando o projeto dentro do diretório atual:

``` make k6_grafana_install```

* Teste da API de Retorno de Usuários:

``` make k6_get_teste ```

* Teste da API de Insert de Usuários:

``` make k6_insert_test ```

* Os resultados serão apresentados em um Dashboard do grafana. O link será mostrado no final da execução da instrução.
       
