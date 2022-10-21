const mongoose = require('mongoose')

const Pedido = mongoose.model('Pedido', {
    idCliente: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    pedido: {
        type: Array,
        default: []
    }

})

module.exports = Pedido