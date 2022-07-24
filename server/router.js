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


// selecionar 1 item

// router.get('/:id',(req, res)=>{
      
//        const id= req.params.id

//     conn.query('SELECT * FROM tb_user WHERE id=?',[id],(error, result)=>{
      
//         if(error){
//             throw error
//         }else{
//             res.send(result[0]);
//             // res.render('index', {resultado: result})
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
})


// editar item


router.get('/edit-action/:id',(req, res)=>{
      
       const id= req.params.id

    conn.query('SELECT * FROM tb_user WHERE id=?',[id],(error, result)=>{
      
        if(error){
            throw error
        }else{

            // res.render('edit',{user: result[0]})
            // res.send(result[0])

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


router.post('/compra-action',(req, res)=>{
    const nome= req.body.nome
    const cpf= req.body.cpf
     const nomep= req.body.nomep 
     const preco= req.body.preco
     const comment= req.body.comment
     const quant= req.body.quant
     const pago= req.body.pago

      conn.query('SELECT * FROM tb_cliente WHERE cpf=?',[cpf],(error, result)=>{
           

            if(!result[0]){
                conn.query('INSERT INTO tb_cliente SET?',{ nome: nome, cpf: cpf },(error, result)=>{
      if(error){
          console.log(error)
      }else{

      const idCliente=result.insertId
      const data= new Date()
         conn.query('INSERT INTO tb_pedido SET?',{ nomep: nomep, preco: preco,comment: comment, quant: quant, pago: pago, data: data, id_cliente: idCliente },(error, result)=>{
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
                   conn.query('INSERT INTO tb_pedido SET?',{ nomep: nomep, preco: preco, comment: comment, quant: quant, pago: pago, data:data,id_cliente: oldIdCliente },(error, result)=>{
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

router.get('/pedidosativos', function (req, res){
    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente ORDER BY tb_cliente.id DESC', (error, result)=>{
        if(error){
            throw error;
        }else{
           res.render('pedidoativo', {resultado: result})
        }
    })
})

// lista dos pedidos preparado que estão confirmados para preparar só tem pedido confirmados

router.get('/pedidospreparados', function (req, res){
    const confim='on'
    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente WHERE confim=?',[confim], (error, result)=>{
        if(error){
            throw error;
        }else{
           res.render('pedidopreparo', {resultado: result})
        }
    })
})


// lista dos pedidos entregado que estão confirmados como entregado só tem pedido preparados

router.get('/pedidosentregados', function (req, res){
    const confim='on'
    conn.query('SELECT * FROM tb_cliente JOIN tb_pedido ON tb_cliente.id=tb_pedido.id_cliente WHERE preparo=?',[confim], (error, result)=>{
        if(error){
            throw error;
        }else{
           res.render('pedidopreparo', {resultado: result})
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

router.get('/editconfim-action/:id',(req, res)=>{
      
    const id= req.params.id

   

 conn.query('SELECT * FROM tb_pedido WHERE id=?',[id],(error, result)=>{
   
     if(error){
         throw error
     }else{

         res.render('editconfim',{user: result[0]})
        
     }
 })

})

router.post('/editconfim-action/',(req, res)=>{
      
    const id= req.body.id
     const nomep= req.body.nomep 
     const preco= req.body.preco
     const comment= req.body.comment
     const quant= req.body.quant
     const pago= req.body.pago
     const confim='on'
    //  const cancelar='on'
    //  const preparo='on'
    //  const entrega='on'
     const data=new Date()

   

     conn.query('UPDATE tb_pedido SET? WHERE id = ?',[{nomep: nomep, preco: preco,comment: comment, quant: quant,confim:confim, pago: pago, data: data }, id],(error, result)=>{
        if(error){
            console.log(error)
      }else{
      res.redirect('/pedidosativos')
   
     }
     })



})


// confirmar pedidos preparados 



router.get('/editpreparo-action/:id',(req, res)=>{
      
    const id= req.params.id

   

 conn.query('SELECT * FROM tb_pedido WHERE id=?',[id],(error, result)=>{
   
     if(error){
         throw error
     }else{

         res.render('editpreparo',{user: result[0]})
        
     }
 })

})

router.post('/editpreparo-action/',(req, res)=>{
      
    const id= req.body.id
     const nomep= req.body.nomep 
     const preco= req.body.preco
     const comment= req.body.comment
     const quant= req.body.quant
     const pago= req.body.pago
     const preparo='on'
    //  const cancelar='on'
    //  const preparo='on'
    //  const entrega='on'
     const data=new Date()

   

     conn.query('UPDATE tb_pedido SET? WHERE id = ?',[{nomep: nomep, preco: preco,comment: comment, quant: quant,preparo:preparo, pago: pago, data: data }, id],(error, result)=>{
        if(error){
            console.log(error)
      }else{
      res.redirect('/pedidospreparados')
   
     }
     })



})

module.exports= router;