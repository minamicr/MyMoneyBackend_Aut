//por padrão lodash é atribuído a _
const _ = require('lodash')

module.exports = (req, res, next) => {
    // noderest retorna lista de erros no bundle
    const bundle = res.locals.bundle

    if(bundle.errors){
        //ecmascript {errors} refere-se a variável que foi criada acima
        const errors = parseErrors(bundle.errors)
        res.status(500).json({errors})
    } else {
        //precisa chamar next pois é um middleware, senão aplicação para aqui
        next()
    }
}

const parseErrors = (nodeRestfulErrors) => {
    //é constante a referência do array e não os elementos
    const errors = []
    //sintaxe do lodash
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    return errors
}