const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')

//faz o parse para todas as requisições urlencoded e json
server.use(bodyParser.urlencoded({ extended: true}))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

//função para iniciar servidor
server.listen(port, function () {
    console.log(`BACKEND is running on port ${port}.`)
})

//como precisa visualizar o servidor em toda aplicação, exporta a instância aqui criada
module.exports = server