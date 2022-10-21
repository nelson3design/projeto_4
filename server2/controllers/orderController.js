

const Order = require('../models/orderModel')



module.exports = {

    // criar product


    async order(req, res) {
       

      

        const { idCliente, status, itemComprado,bebidas,valorTotal, rua, cep,numero,bairro,cidade,estado,complemento } = req.body

       
        const entrega = [{
            "rua": rua,
            "cep": cep,
            "numero": numero,
            "complemento": complemento,
            "bairro": bairro,
            "cidade": cidade,
            "estado": estado
        }]
        const pedido = { itemComprado, entrega, bebidas, valorTotal }
      
        try {
           
   
            await Order.create({ idCliente, status, pedido })
            res.status(200).json({ msg: 'Product registrado com sucesso' })

         

        } catch (error) {
            res.status(400).send(error);

        }

    },
    async customerOrder(req, res) {
        const idCliente = req.params.idCliente


     

        const order = await Order.find({ idCliente: idCliente })


        if (!order) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' })
        }


        res.status(200).json({ order })
    }
    
}




