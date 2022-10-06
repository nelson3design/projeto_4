import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CartContext } from "../context/context"
import HeaderCardapio from "./headerCardapio"

import "./style/compra.css"
import Footer from './footer';
import { MdDownloadDone } from 'react-icons/md';
import Cart from "./cart";
export default function Compra(){

  const { carts, handleDelete, handleAdd, total } = useContext(CartContext)
 
  const navigate = useNavigate();
   
  
    const [email, setEmail] = useState("")
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const [numero, setNumero] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [complemento, setComplemento] = useState("")
 

    const [valor, setValor] = useState("")
    const [bebidas, setBebidas] = useState([])
   
  

  
    
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const [total2, setTotal2] = useState("")
   
   
  



  const valorTotal = Number(total + total2).toFixed(2)


  const quantAdd = bebidas.reduce((a, b) => a + b.qty, 0)
  const bebidasData = bebidas.reduce((a, b) => a + ", " + `${b.qty} ` + b.nome, quantAdd)


  const cartQuant = carts.reduce((a, b) => a + b.qty, 0)
  const cart = carts.reduce((a, b) => a + ", " + `${b.qty} ` + b.nome, cartQuant)



  console.log(bebidasData)
  

    const data={
        cart:cart,
        bebida: bebidasData,
        valorTotal: valorTotal,
        email:email,
        nome: nome,
        cpf: cpf,
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,

        
    }
  
    
    const {id} =useParams()
   

    const handleSubmit=((e)=>{
        e.preventDefault()
        axios.post("http://localhost:4000/compra-action/", data).then((res) => {
         
               if(res.status === 200){
                navigate('/obrigado')
               }
           
          });
      console.log(data)
       
    })


    const [item, setItem] = useState([])
    const url="http://localhost:5000/product/"
    const url2="http://localhost:4000/"


     
    useEffect(()=>{
  
        listItem()
        listBebida()


      },[])

      const listItem=()=>{
        axios.get(`${url}${id}`).then((response) => {
            // setItem(response.data);
            
        });

      }

 
      
      
      const [beb, setBeb] = useState([])

      const url3="http://localhost:4000/bebidas"
     
  
     
  
        const listBebida=()=>{
          axios.get(`${url3}`).then((response) => {
            setBeb(response.data);
              
          });
        }


 

 
 
   const handlePlus2 =(dado)=>{
     setCount2(dado.quantItem++)
     setCount(count+1)
    
     setTotal2( Number(total2) + (Number(dado.preco)))
    
     const exist = bebidas.find((x) => x.id === dado.id)
     if (exist) {

       setBebidas(
         bebidas.map((x) =>
           x.id === dado.id ? { ...exist, qty: exist.qty + 1 } : x
         )
       )

     } else {
       setBebidas([...bebidas, { ...dado, qty: 1 }])
     }
     
    
   }

 

 
  const handleMenos2 =(dado)=>{
    setCount(count - 1)
    setCount2(dado.quantItem--)
    setTotal2(total2-(Number(dado.preco)))
    
   }

  

 
    return(
        <>
        <HeaderCardapio/>

        <section className='compraBase'>

            <div className='compraContent'>

    
       
        <div className='compraForm'>

      
         <form onSubmit={handleSubmit} className="formabase1">
          <div className='formdados'>

      <div className='formInput'>
      <div className='compraFormContent'>
        <label>Nome</label>   
        <input value={nome} onChange={(e)=>setNome(e.target.value)} placeholder="nome" required/>
       </div>
        
       <div className='compraFormContent'>
       <label>Cpf</label>
        <input value={cpf} onChange={(e)=>setCpf(e.target.value)} placeholder="70093395642" required/>
       </div>

      </div>
        
     <div className='formInput'>
     <div className='compraFormContent'>
        <label>Cep</label>
        <input value={cep} onChange={(e)=>setCep(e.target.value)} placeholder="88137624" required/>
      </div>
        
       <div className='compraFormContent'>
       <label>Rua</label>
        <input value={rua} onChange={(e)=>setRua(e.target.value)} placeholder="rua jão vitor" required/>
       </div>
     </div>
       
     <div className='formInput'>
     <div className='compraFormContent'>
        <label>Cidade</label>
        <input value={cidade} onChange={(e)=>setCidade(e.target.value)} placeholder="palhoça" required/>
      </div>
       

      <div  className='formInput'>
      <div className='compraFormContent numerInput1'>
        <label>Numero</label>
        <input value={numero} onChange={(e)=>setNumero(e.target.value)} placeholder="65" required/>
      </div>
       
        <div className='compraFormContent numerInput2'>
        <label>Complemento</label>
        <input value={complemento} onChange={(e)=>setComplemento(e.target.value)} placeholder="apto 2" required/>
        </div>
      </div>
     </div>

     {/* card-cartao */}
     <div className='pagamento'>
      <div className='titlePagamento'>pagamento</div>
      <div className='aviso'>Preencha os dados do seu Cartão</div>

      <div className='pagamentoInput'>
        <label>Número do Cartão</label>
        <input type="text"/>
      </div>

      <div className='pagamentoInput'>
        <label>Nome do Titular do Cartão</label>
        <input type="text"/>
      </div>

      <div className='pagamentoInput2'>
      <div className='pagamentoInput'>
        <label>Vencimento</label>
        <input type="text"/>
      </div>
      <div className='pagamentoInput'>
        <label>Código de segurança</label>
        <input type="text"/>
      </div>

      </div>

     </div>
      
     </div> 
       
       <div className='adicional'>
        <div className='adicionalTitle'>Adicional</div>
       
      
        <div className='adicionalContent'>
          
           {
              
                      beb.map((dado)=>(
                 
                <div className='adicinalCard' key={dado.id}>
                 <div>{dado.nome}</div>
                  
                  
                  <div className='btnPrecoAdicional'>
                  <div className='preco'>R$ {dado.preco}</div>
                  <div className='btnAdicional'>

               

                

                     {dado.quantItem-1 > 0 && <div id={dado.preco-1} className="plusAdd" onClick={(e) => handleMenos2(dado)}> - </div>}
                     
                       {dado.quantItem-1 > 0 ? <div>{dado.quantItem-1}</div> : null}

                   <div className="plusAdd" onClick={(e)=>handlePlus2(dado)}> + </div>

                
                  </div>
                 
                  </div> 

                 

                  
                </div>
                 
              ))
              
              }
           </div>
        
      

       
       </div>
        <div className='formdados dados2'>

        <input type="submit" className="btnFormCompra" value="Pagar agora"/>
        </div>
      
       
    </form>

    </div>

    <div className=''>

      <div className='titleCompra'>RESUMO DO PEDIDO</div>

    <div className="infoCompra">
                <div className='infoCompraItems'>
                  {


                    carts && carts.map((dados) => (

                      <div className="cardBaseCompra">
                        <div className="cardImgCompra" key={dados.idPedido}>
                          <img src={url2 + dados.file} alt={url2 + dados.file} />
                          <h3>{dados.nome}</h3>

                        </div>

                        <div className="cardTextCompra">
                          <input type="hidden" value={valor} onChange={(e) => setValor(e.target.value)} />
                          <div className="texts">{dados.description.slice(0, 40) + "..."}</div>
                          <div className="cardPrecoCompra">
                          

                            <input type="hidden" value={valor === "" ? setValor(Number(dados.preco)) : null} onChange={(e) => setValor(e.target.value)} />

                            <div className="precoCompra">{dados.qty} <span className="por"> x </span> R$ {dados.preco}</div>
                            <div><button onClick={(e) => handleDelete(dados)}>-</button> <button onClick={(e) => handleAdd(dados)}>+</button></div>
                          </div>




                        

                        </div>



                      
                      </div>

                    ))
                  }
                </div>
                {carts.length > 0 ? <div className="precoCompra">Subtotal: R$ {Number(total + total2).toFixed(2)}</div> : null}

    </div>
            </div>

    </div>
    </section>
        <Cart />
    <Footer/>
       
        </>
    )
}