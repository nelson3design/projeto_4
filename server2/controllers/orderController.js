

const Product = require('../models/orderModel')


module.exports = {

    // criar product


    async order(req, res) {
       

       

        const { idCliente, status, itemComprado, rua, cep,numero,bairro,cidade,estado,complemento } = req.body

        const pedido = itemComprado
        var entrega = {
            "rua": rua,
            "cep": cep,
            "numero": numero,
            "complemento": complemento,
            "bairro": bairro,
            "cidade": cidade,
            "estado": estado
        }
        try {
           
   
            await Product.create({ idCliente, status, pedido, entrega })
            res.status(200).json({ msg: 'Product registrado com sucesso' })

            res.redirect('/')

        } catch (error) {
            res.status(400).send(error);

        }

    },
    
}




