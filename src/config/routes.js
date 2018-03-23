const express = require('express')
const auth = require('./auth')

//para não criar nova instância do servidor,
//cria uma função fazendo referência para a variável.
//desta forma estará utilizando a instância criada em server.js
module.exports = function(server) {
    /*
    //definir URL base para todas as rotas
    const router = express.Router()
    //sempre que a URL começar com api, vai utilizar este router
    server.use('/api', router)

    //Rotas de Ciclo de Pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    //registra todos os web services restful dentro da URL billingCycles
    BillingCycle.register(router,'/billingCycles')
    */

    //ROTAS PROTEGIDAS
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(protectedApi, '/billingCycles')

    //ROTAS ABERTAS
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}