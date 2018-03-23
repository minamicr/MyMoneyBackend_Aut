const server = require('./config/server')
require('./config/database')
//routes precisa do parâmetro server, por isto na primeira referência
//faz a atribuição para uma variável
require('./config/routes')(server)