const express = require('express')

const router= express.Router()

const conn= require('./database/db')


const path = require('path')

const multer = require('multer')

const fs = require('fs')


const storage= multer.diskStorage({
    destination : function (req, file,cb){
        cb(null,'upload/')
    },
    filename: function (req, file, cb){
        
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }

})



const fileFilter =(req, file, cb) => {
  
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
        return cb(new Error('File must be of type JPG, JPEG,webp or PNG and nore more than 2MB in size'))
    }
   
    cb(undefined, true)
  }



  const upload = multer({
    storage: storage,
   
    fileFilter: fileFilter
    
  })


router.get('/adicionar',(req, res)=>{
    res.render('create')
})


// selecionar item

router.get('/', function (req, res){
    conn.query('SELECT * FROM tb_user', (error, result)=>{
        if(error){
            throw error;
        }else{
    //    res.render('index', {resultado: result})

        
           res.send(result)

        //   res.json({
           
        //      result,
            
        //   })
        }
    })
})




// produtos em destaques
router.get('/destaque', function (req, res){

    const destaque="sim"
    
    conn.query('SELECT * FROM tb_user WHERE destaque=? ORDER BY id DESC',[destaque], (error, result)=>{
        if(error){
            throw error;
        }else{
    
           res.send(result)

        }
    })
})


// hamburguer
router.get('/hamburguer', function (req, res){

    const hamburguer="hamburguer"
    
    conn.query('SELECT * FROM tb_user WHERE categoria=? ORDER BY id DESC',[hamburguer], (error, result)=>{
        if(error){
            throw error;
        }else{
    
           res.send(result)

        }
    })
})

// pizza
router.get('/pizza', function (req, res){

    const pizza="pizza"
    
    conn.query('SELECT * FROM tb_user WHERE categoria=? ORDER BY id DESC',[pizza], (error, result)=>{
        if(error){
            throw error;
        }else{
    
           res.send(result)

        }
    })
})

// bebidas
router.get('/bebidas', function (req, res){

    const bebida="bebida"
    
    conn.query('SELECT * FROM tb_user WHERE categoria=? ORDER BY id DESC',[bebida], (error, result)=>{
        if(error){
            throw error;
        }else{
    
           res.send(result)

        }
    })
})

// selecionar 1 item

// router.get('/:id',(req, res)=>{
      
//        const id= req.params.id

//     conn.query('SELECT * FROM tb_user WHERE id=?',[id],(error, result)=>{
      
//         if(error){
//             throw error
//         }else{
//             res.json(result)
           
//         }
//     })

// })

// router.get('*', function(req, res){
//   res.send('pagina não encontrado', 404);
// });



router.get('/item',(req, res)=>{
      
       const q= req.query.q

    conn.query("SELECT * FROM tb_user WHERE nome LIKE '%"+q+"%'",(error, result)=>{
      
        if(error){
            throw error
        }else{

            res.json(result)
    
           
        }
    })

})




// excluir item



router.delete('/delete-action/:id',(req,res)=>{
    const id= req.params.id

    conn.query('SELECT image FROM tb_user WHERE id=?',[id],(error, result)=>{
             const oldImage = result[0].image

             conn.query('DELETE image FROM tb_user WHERE id=?',[id],(error, result)=>{

                fs.unlink('upload/'+oldImage,(err)=>{
                    if(err){
                        console.log(err)
                    }else{
                       conn.query('DELETE FROM tb_user WHERE id=?',[id],(error, result)=>{
        
                    if(error){
                    throw error
                   }else{
                    res.send(result);
                 }
                 })

                    }
                })

             })

           
                 
             })
   
})




// adicionar item

router.post('/add-action', upload.single('upload'),(req, res)=>{
    const file= req.file.filename
    const nome= req.body.nome
    const description= req.body.description
    const preco= req.body.preco
    const categoria= req.body.categoria
    const destaque= req.body.destaque

  conn.query('INSERT INTO tb_user SET?',{ image: file,nome: nome, description: description, preco: preco, categoria: categoria,destaque: destaque },(error, result)=>{
      if(error){
          console.log(error)
      }else{
          res.redirect('/')
      }
  })

  console.log(req.body)
})


// editar item


router.get('/edit-action/:id',(req, res)=>{
      
       const id= req.params.id

    conn.query('SELECT * FROM tb_user WHERE id=?',[id],(error, result)=>{
      
        if(error){
            throw error
        }else{

            res.json(result)
        }
    })

})

router.post('/edit-action/:id', upload.single('upload'), (req, res)=>{
    const id= req.params.id
     //const file= req.file.filename
    const nome= req.body.nome
    const description= req.body.description
    const preco= req.body.preco
    const categoria= req.body.categoria
    const destaque= req.body.destaque



     if(req.file == undefined){
       
        conn.query('SELECT * FROM tb_user WHERE id=?',[id],(error, result)=>{
            const old = result[0].image     
        conn.query('UPDATE tb_user SET? WHERE id = ?',[{image: old,nome: nome, description: description, preco: preco, categoria: categoria,destaque: destaque}, id],(error, result)=>{
            if(error){
                console.log(error)
          }else{
        //    res.redirect('/')
          res.send(result[0])
           // res.send(result)
            
         }
         })
        })

     }else{
         const file= req.file.filename
        conn.query('SELECT image FROM tb_user WHERE id=?',[id],(error, result)=>{
            const oldImage = result[0].image

            conn.query('DELETE image FROM tb_user WHERE id=?',[id],(error, result)=>{

               fs.unlink('upload/'+oldImage,(err)=>{
                   if(err){
                       console.log(err)
                   }else{
                       conn.query('UPDATE tb_user SET? WHERE id = ?',[{image: file,nome: nome, description: description, preco: preco, categoria: categoria,destaque: destaque}, id],(error, result)=>{
                         if(error){
                             console.log(error)
                       }else{
                        // res.redirect('/')
                        res.send(result)
                        console.log("ok")
                      }
                      })
                   }
               })

            })

          
                
            })
     }


})




// fazer compra
router.get('/compra',(req, res)=>{
    res.render('compra')
})

router.post('/teste',(req, res)=>{
    const nome= req.body.nome
console.log(req.body)

conn.query('INSERT INTO tb_teste SET?',{ nome: nome },(error, result)=>{
    if(error){
        console.log(error)
    }else{
        res.json(result)
    }
})
})


router.post('/compra-action/',(req, res)=>{

    //dados do cliente
     const nomeCliente= req.body.nomeCliente
     const cpf= req.body.cpf
     const cep= req.body.cep 
     const rua= req.body.rua
     const cidade= req.body.cidade
     const numero= req.body.numero
     const complemento= req.body.complemento

      //dados do pedido
    const quant= req.body.quant 
    const bebida= req.body.bebida 
    const quantBebida= req.body.quantBebida 
    const pago= req.body.pago 
    const idProduto=req.body.idProduto
     
    console.log(idProduto)
    console.log(req.body)
    const pedido="#" + cpf

      conn.query('SELECT * FROM tb_cliente WHERE cpf=?',[cpf],(error, result)=>{
           

            if(!result[0]){
                conn.query('INSERT INTO tb_cliente SET?',{ nomeCliente: nomeCliente, cpf: cpf, cep:cep, rua:rua,cidade:cidade, numero:numero, complemento:complemento },(error, result)=>{
      if(error){
          console.log(error)
      }else{

      const idCliente=result.insertId
      const data= new Date()
         conn.query('INSERT INTO tb_pedido SET?',{ quant: quant, bebida: bebida,quant_bebida: quantBebida, pago: pago,  data: data, id_cliente: idCliente,id_produto:idProduto,pedido:pedido },(error, result)=>{
      if(error){
          console.log(error)
      }else{
          res.redirect('/')
      }
  })
          
      }
  })

            }else{
                 const oldIdCliente = result[0].id
                 const data=new Date()
                   conn.query('INSERT INTO tb_pedido SET?',{ quant: quant, bebida: bebida, quant_bebida: quantBebida, pago: pago, data:data,id_cliente: oldIdCliente, id_produto:idProduto, pedido:pedido },(error, result)=>{
      if(error){
          console.log(error)
      }else{
          res.redirect('/')
      }
  })

            }
      })
   

  



})

// listar_pedido ativo no painel de control

// lista dos pedidos ativos que não confirmados

router.get('/pedidoandamento', function (req, res){

    const confirmar='off'
    const cancelar='off'

    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente JOIN tb_user ON tb_pedido.id_produto=tb_user.id WHERE tb_pedido.confirmar=? AND tb_pedido.cancelar=? ORDER BY tb_cliente.id DESC',[confirmar,cancelar],(error, result)=>{
        if(error){
            throw error;
        }else{
        //    res.render('pedidoativo', {resultado: result})

        res.json(result)
        }
    })
})

// lista dos pedidos preparado que estão confirmados para preparar só tem pedido confirmados

router.get('/pedidopreparo', function (req, res){

    const confirmar='on'
    const terminar='off'

    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente JOIN tb_user ON tb_pedido.id_produto=tb_user.id WHERE tb_pedido.confirmar=? AND tb_pedido.terminar=?  ORDER BY tb_cliente.id DESC',[confirmar,terminar],(error, result)=>{
        if(error){
            throw error;
        }else{
        //    res.render('pedidoativo', {resultado: result})

        res.json(result)
        }
    })
})



// lista dos pedidos entregado que estão confirmados como entregado só tem pedido preparados

router.get('/pedidoterminar', function (req, res){

    const terminar='on'
    const finalizar='off'
    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente JOIN tb_user ON tb_pedido.id_produto=tb_user.id WHERE tb_pedido.terminar=? AND tb_pedido.finalizar=? ORDER BY tb_cliente.id DESC',[terminar,finalizar],(error, result)=>{
        if(error){
            throw error;
        }else{
        //    res.render('pedidoativo', {resultado: result})

        res.json(result)
        }
    })
})


// lista dos pedidos entregado 

router.get('/pedidofinalizar', function (req, res){

    const finalizar='on'
    const cancelar='on'

    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente JOIN tb_user ON tb_pedido.id_produto=tb_user.id WHERE tb_pedido.finalizar=? OR tb_pedido.cancelar=? ORDER BY tb_cliente.id DESC',[finalizar,cancelar],(error, result)=>{
        if(error){
            throw error;
        }else{
        //    res.render('pedidoativo', {resultado: result})

        res.json(result)
        }
    })
})





// para cliente ver seus pedidos

router.get('/verpedido',(req, res)=>{
    res.render('verpedido')
})

// router.get('/clientes',(req, res)=>{
//     res.render('clientes')
// })


// consultar se o cliente tem pedidos

router.post('/clientes', function (req, res){
    const nome= req.body.nome
    const cpf= req.body.cpf

    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente WHERE cpf=?',[cpf],(error, result)=>{
        if(error){
            throw error;
        }else{
           res.render('clientes', {resultado: result})
        }
    })
})



// confirmar pedido pra ser confirmado

// router.get('/editconfim-action/:id',(req, res)=>{
      
//     const id= req.params.id

   

//  conn.query('SELECT * FROM tb_pedido WHERE id=?',[id],(error, result)=>{
   
//      if(error){
//          throw error
//      }else{

//          res.render('editconfim',{user: result[0]})
        
//      }
//  })

// })


//confirmar pedido

router.post('/editconfim-action/:idPedido',(req, res)=>{
      
    const idPedido= req.params.idPedido
    const pago= 'on'
     const confirmar='on'
   
     const data=new Date()


     conn.query('UPDATE tb_pedido SET? WHERE idPedido = ?',[{ pago: pago, confirmar:confirmar, data: data }, idPedido],(error, result)=>{
        if(error){
            console.log(error)
      }else{
      res.json(result)
   
     }
     })



})

//preparar pedido

router.post('/editpreparar-action/:idPedido',(req, res)=>{
      
    const idPedido= req.params.idPedido
    const pago= 'on'
     const preparar='on'
   
     const data=new Date()


     conn.query('UPDATE tb_pedido SET? WHERE idPedido = ?',[{ pago: pago, preparar:preparar, data: data }, idPedido],(error, result)=>{
        if(error){
            console.log(error)
      }else{
      res.json(result)
   
     }
     })



})


// confirmar pedidos terminar de preparar 
router.post('/editterminar-action/:idPedido',(req, res)=>{
      
    const idPedido= req.params.idPedido
    const pago= 'on'
     const terminar='on'
   
     const data=new Date()


     conn.query('UPDATE tb_pedido SET? WHERE idPedido = ?',[{ pago: pago, terminar:terminar, data: data }, idPedido],(error, result)=>{
        if(error){
            console.log(error)
      }else{
      res.json(result)
   
     }
     })



})


// confirmar para sair para entregar
router.post('/editsair-action/:idPedido',(req, res)=>{
      
    const idPedido= req.params.idPedido
    const pago= 'on'
     const entregar='on'
   
     const data=new Date()


     conn.query('UPDATE tb_pedido SET? WHERE idPedido = ?',[{ pago: pago, entregar:entregar, data: data }, idPedido],(error, result)=>{
        if(error){
            console.log(error)
      }else{
      res.json(result)
   
     }
     })



})


router.post('/editfinalizar-action/:idPedido',(req, res)=>{
      
    const idPedido= req.params.idPedido
    const pago= 'on'
     const finalizar='on'
   
     const data=new Date()


     conn.query('UPDATE tb_pedido SET? WHERE idPedido = ?',[{ pago: pago, finalizar:finalizar, data: data }, idPedido],(error, result)=>{
        if(error){
            console.log(error)
      }else{
      res.json(result)
   
     }
     })



})

router.post('/editcancelar-action/:idPedido',(req, res)=>{
      
    const idPedido= req.params.idPedido
    const pago= 'on'
     const cancelar='on'
   
     const data=new Date()


     conn.query('UPDATE tb_pedido SET? WHERE idPedido = ?',[{ pago: pago, cancelar:cancelar, data: data }, idPedido],(error, result)=>{
        if(error){
            console.log(error)
      }else{
      res.json(result)
   
     }
     })



})

module.exports= router;