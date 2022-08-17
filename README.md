
# API Kontacts

Uma breve descrição sobre o que esse projeto faz e para quem ele é


## Documentação da API

### Login
```http
  POST /api/login
```
Nesse endpoint você pode fazer a autenticação de um usuário existente, para isso você passar no body as propriedades como no exemplo abaixo:

```js
{
  "email": "jonh.lopes@email.com",
  "senha": "123456"
}
```

o retorno de um usuário autenticado segue o exemplo abaixo:

```js
{
  "usuario": {
    "id": 1,
    "nome": "Jonh Lopes",
    "email": "jonh.lopes@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjM0MjQwODIzLCJleHAiOjE2MzQyNjk2MjN9.ZfJW04QQSnMy1YuwHChA5cJF8ppkGBVEmVAHtksPHGM"
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
