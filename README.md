# ERP REST API

## Passos para execução do projeto:

1 - Execute `yarn` ou `npm install`
2 - Execute `docker-compose build`
3 - Execute `docker-compose up`

**Obs**: Caso aconteça algum erro ao rodar o comando `docker-compose up`, tente executar novamente, o problema pode acontecer devido as configurações de push DB do ORM serem para ambinete de homologação.

Ao executar esses comandos será realizado a modelagem inicial na base de dados, criando alguns dados por padrão para poder testar o sistema. Os dados se encontram na pasta Prisma/seeds.ts. Para agilizar o teste segue abaixo um usuário por perfil, criados ao inicializar:

`Administrador`
  `email: administrador@erp.com.br`
  `senha: 12345`

`Vendedor`
  `email: vendedor1@erp.com.br`
  `senha: 12345`

`Almoxarifado`
  `email: almoxarifado@erp.com.br`
  `senha: 12345`

 `Financeiro`
  `email: financeiro@erp.com.br`
  `senha: 12345`

## Documentação

Toda documentação foi escrita usando [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) gerando um documento de facil leitura e testes. O mesmo se encontra na rota `/docs` da API, ou acessando pela url abaixo com o sistema ativo.
[API Documentation](http://localhost:3003/docs/)

## Testes Automatizados

Para executar os testes basta executar o comando abaixo:

    Execyte `yarn test` ou `npm test`
