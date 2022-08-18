
# API Kontacts

Você pode importar a collection no seu insominia para testar a api, basta importar para o seu insominia o arquivo Insomnia_2022-08-17.json que está na pasta collection nesse repositório.

Essa API possui uma rotas para login, usuarios e contatos, veja no exemplo abaixo o uso de cada rota.

Para acessa o repositório do front-end [clique aqui](https://github.com/jonathan-lopes/kontacts)

## Documentação da API

### Login
`POST` https://api-kontacts.herokuapp.com/login

Nesse endpoint você pode fazer a autenticação de um usuário existente, para isso você passar no body as propriedades como no exemplo abaixo:

```json
{
  "email": "jonathan.lopes@email.com",
  "passwd": "test1234"
}
```

o retorno de um usuário autenticado segue o exemplo abaixo:

```json
{
  "user": {
    "id": 1,
    "name": "Jonh Lopes",
    "email": "jonh.lopes@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjM0MjQwODIzLCJleHAiOjE2MzQyNjk2MjN9.ZfJW04QQSnMy1YuwHChA5cJF8ppkGBVEmVAHtksPHGM"
}
```

### Usuário
`POST` (aberta) https://api-kontacts.herokuapp.com/usuarios

Nesse endpoint você pode fazer o cadastro de um novo usuário no seu sistema, para cadastrar um usuário você deve enviar o body no seguinte formato:

```json
{
  "name": "Jonathan Lopes"
  "email": "jonathan.lopes@email.com",
  "passwd": "test1234"
}
```

### Contato
`GET` (Autenticada) https://api-kontacts.herokuapp.com/contatos

Esse endpoint irá listar todos os contatos cadastrados, exemplo:

```json
[
	{
		"id": 1,
		"user_id": 1,
		"name": "Peter",
		"email": "peter@email.com",
		"phone": "99999999999"
	},
	{
		"id": 2,
		"user_id": 1,
		"name": "Bruce",
		"email": "bruce@email.com",
		"phone": "99999999999"
	}
]
``` 

`GET` (Autenticada) https://api-kontacts.herokuapp.com/contato/1

Esse endpoint listará apenas um contato (quando ela existir), o retorno inicial será:

```json
{
  "id": 1,
  "user_id": 1,
  "name": "Peter",
  "email": "peter@email.com",
  "phone": "99999999999"
}
``` 

`POST` (Autenticada) https://api-kontacts.herokuapp.com/contatos

Nesse endpoint você pode cadastrar outros contatos, o `body` para o cadastro precisa seguir o seguinte formato:

```json
{
	"name": "Mary",
	"phone":"99999999999",
	"email":"mary@email.com"
}
``` 

`DELETE` (Autenticada) https://api-kontacts.herokuapp.com/contatos/1

Esse endpoint permite fazer a deleção de um contato, ele não possui `body`, só é necessário passarmos o `id` do contato na rota.

`PUT` (Autenticada) https://api-kontacts.herokuapp.com/contatos/1

Esse endpoint permite que você faça a atualização de um contato, para atualizar basta você passar o `id` do contato na rota e enviar o `body` completo, como no exemplo abaixo:

```json
{
	"name": "Mary",
	"phone":"(99)99999-9999",
	"email":"mary@email.com"
}
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT`

`DB_HOST`

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

`DB_PORT`

`JWT_SECRET`

`SALT_ROUNDS`

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:jonathan-lopes/api-kontacts.git
```

Entre no diretório do projeto

```bash
  cd api-kontacts
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

