const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

// aqui defição dos serviços WEB (Express)
BillingCycle.methods(['get', 'post', 'put', 'delete'])
// 1.o parâmetro: sempre retornar o objeto com valores atualizados
// 2.o parâmetro: fazer as mesmas validações do insert no update
BillingCycle.updateOptions({ new: true, runValidators: true})
BillingCycle.after('post', errorHandler).after('put', errorHandler)

//A rota já será registrada por causa do arquivo routes.js, que registra tudo que está 
//aqui dentro
BillingCycle.route('count', (req, res, next) => {
    //consulta no mongo a quantidade de elementos da tabela BillingCycle
    //função callback, primeiro recebe erro e depois valor
    BillingCycle.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        }else {
            res.json({value})
        }
    })
})

// 1a linha: soma valores de credito e debitos
// 2a linha: faz agrupamento sem especificar campo, somatória total
// 3a linha: elimina o id nulo e exibe total de credito e debito
// resultado da callback: pode ser um array de erro, ou retorna o primeiro
// registro do resultado, visto que deverá por ser uma somatória retorna somente
// um registro. No caso de não retornar nada, devolve um objeto com crédito e 
// débito zerados
BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate({
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
    }, {
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, {
        $project: {_id:0, credit: 1, debt: 1}
    }, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || {credit: 0, debt:0})
        }
    })

})

module.exports = BillingCycle