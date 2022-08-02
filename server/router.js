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
    conn.query('SELECT * FROM tb_user ORDER BY id DESC', (error, result)=>{
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

router.get('/item/:id',(req, res)=>{
      
       const id= req.params.id

    conn.query('SELECT * FROM tb_user WHERE id=?',[id],(error, result)=>{
      
        if(error){
            throw error
        }else{
            res.json(result)
           
        }
    })

})


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

             conn.query('DELETE FROM tb_user WHERE id=?',[id],(error, result)=>{

                fs.unlink('upload/'+oldImage,(err)=>{
                    if(error){
                        throw error
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
        throw error
      }else{
          res.redirect('/')
      }
  })

  console.log(req.body.file)
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
                throw error
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
                            throw error
                       }else{
                        // res.redirect('/')
                        res.send(result)
                       
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




router.post('/compra-action/:idProduto',(req, res)=>{

    //dados do cliente
     const nomeCliente= req.body.nomeCliente
     const cpf= req.body.cpf
     const cep= req.body.cep 
     const rua= req.body.rua
     const cidade= req.body.cidade
     const numero= req.body.numero
     const complemento= req.body.complemento

      //dados do pedido
    const valor= req.body.valor
    const bebida= req.body.bebida 
    const valorAdicional= req.body.valorAdicional 
    const valorTotal= req.body.valorTotal 
    const pago= "on"
    const idProduto=req.params.idProduto


    const min= new Date().getMinutes()

    const stringCpf=cpf.toString()
    const num=stringCpf.slice(-4)
    const pedido="#" + min +num

      conn.query('SELECT * FROM tb_cliente WHERE cpf=?',[cpf],(error, result)=>{
           

            if(!result[0]){
                conn.query('INSERT INTO tb_cliente SET?',{ nomeCliente: nomeCliente, cpf: cpf, cep:cep, rua:rua,cidade:cidade, numero:numero, complemento:complemento },(error, result)=>{
      if(error){
        throw error
      }else{

      const idCliente=result.insertId
      const data= new Date()
         conn.query('INSERT INTO tb_pedido SET?',{ valor: valor, bebida: bebida,valorAdicional: valorAdicional, valorTotal: valorTotal, pago: pago,  data: data, id_cliente: idCliente,id_produto:idProduto,pedido:pedido },(error, result)=>{
      if(error){
        throw error
      }else{
          res.redirect('/')
      }
  })
          
      }
  })

            }else{
                 const oldIdCliente = result[0].id
                 const data=new Date()
                   conn.query('INSERT INTO tb_pedido SET?',{ valor: valor, bebida: bebida,valorAdicional: valorAdicional, valorTotal: valorTotal, pago: pago, data:data,id_cliente: oldIdCliente, id_produto:idProduto, pedido:pedido },(error, result)=>{
      if(error){
        throw error
      }else{
          res.redirect('/')
      }
  })

            }
      })
   

  



})

// listar_pedido ativo no painel de control

// lista dos pedidos ativos que não confirmados

router.get('/pedidoandamento/:id', function (req, res){

const senha= req.params.id

    const confirmar='off'
    const cancelar='off'

    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente JOIN tb_user ON tb_pedido.id_produto=tb_user.id JOIN tb_user_server ON tb_user.senha= tb_user_server.senha WHERE tb_pedido.confirmar=? AND tb_pedido.cancelar=? AND tb_user_server.senha=? ORDER BY tb_pedido.idPedido DESC',[confirmar,cancelar,senha],(error, result)=>{
        if(error){
            throw error;
        }else{
        //    res.render('pedidoativo', {resultado: result})

        res.json(result)
        }
    })
})

// lista dos pedidos preparado que estão confirmados para preparar só tem pedido confirmados

router.get('/pedidopreparo/:id', function (req, res){
    const senha= req.params.id
    const confirmar='on'
    const terminar='off'

    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente JOIN tb_user ON tb_pedido.id_produto=tb_user.id JOIN tb_user_server ON tb_user.senha= tb_user_server.senha WHERE tb_pedido.confirmar=? AND tb_pedido.terminar=? AND tb_user_server.senha=? ORDER BY tb_pedido.idPedido DESC',[confirmar,terminar,senha],(error, result)=>{
        if(error){
            throw error;
        }else{
        //    res.render('pedidoativo', {resultado: result})

        res.json(result)
        }
    })
})



// lista dos pedidos entregado que estão confirmados como entregado só tem pedido preparados

router.get('/pedidoterminar/:id', function (req, res){
    const senha= req.params.id
    const terminar='on'
    const finalizar='off'
    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente JOIN tb_user ON tb_pedido.id_produto=tb_user.id JOIN tb_user_server ON tb_user.senha= tb_user_server.senha WHERE tb_pedido.terminar=? AND tb_pedido.finalizar=? AND tb_user_server.senha=? ORDER BY tb_pedido.idPedido DESC',[terminar,finalizar,senha],(error, result)=>{
        if(error){
            throw error;
        }else{
        //    res.render('pedidoativo', {resultado: result})

        res.json(result)
        }
    })
})


// lista dos pedidos entregado 

router.get('/pedidofinalizar/:id', function (req, res){
    const senha= req.params.id
    const finalizar='on'
    const cancelar='on'

    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente JOIN tb_user ON tb_pedido.id_produto=tb_user.id JOIN tb_user_server ON tb_user.senha= tb_user_server.senha WHERE tb_pedido.finalizar=? OR tb_pedido.cancelar=? AND tb_user_server.senha=? ORDER BY tb_pedido.idPedido DESC',[finalizar,cancelar,senha],(error, result)=>{
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



// consultar se o cliente tem pedidos

router.post('/clientes', function (req, res){
   
    const cpf=req.body.cpf

   

    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente  JOIN tb_user ON tb_pedido.id_produto=tb_user.id WHERE cpf=? ',[cpf],(error, result)=>{
        if(error){
            throw error;
        }else{
       
            res.json(result)
        
        }
    })
})


router.get('/clientes/:id', function (req, res){
   
    const cpf=req.params.id

   
    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente  JOIN tb_user ON tb_pedido.id_produto=tb_user.id WHERE cpf=? ORDER BY tb_pedido.idPedido DESC',[cpf],(error, result)=>{
        if(error){
            throw error;
            
        }else{
       
           
            res.json(result)
           
        }

        
    })
})


// para entrar no painel administrativo

router.post('/login', function (req, res){

   
   
    const senha=req.body.senha


   

    conn.query('SELECT * FROM tb_user_server WHERE senha=? ',[senha],(error, result)=>{
        if(error){
            throw error;
        }else{
       
            res.json(result)
            // res.send(result[0])
        }
    })
})

router.get('/login/:id', function (req, res){
    const senha=req.params.id
    conn.query('SELECT * FROM tb_user JOIN tb_user_server ON tb_user.senha=tb_user_server.senha WHERE tb_user_server.senha=? ORDER BY tb_user.id DESC',[senha],(error, result)=>{
        if(error){
            throw error;
        }else{
   
           res.send(result)


        }
    })
})






//confirmar pedido

router.post('/editconfim-action/:idPedido',(req, res)=>{
      
    const idPedido= req.params.idPedido
    const pago= 'on'
     const confirmar='on'
   
     const data=new Date()


     conn.query('UPDATE tb_pedido SET? WHERE idPedido = ?',[{ pago: pago, confirmar:confirmar, data: data }, idPedido],(error, result)=>{
        if(error){
            throw error
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
            throw error
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
            throw error
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
            throw error
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
            throw error
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
            throw error
      }else{
      res.json(result)
   
     }
     })



})

router.delete('/delete-pedido/:id',(req,res)=>{
    const id= req.params.id

    conn.query('DELETE FROM tb_pedido WHERE idPedido=?',[id],(error, result)=>{
        
        if(error){
        throw error
       }else{
        res.send(result);
     }
     })
   
})



module.exports= router;