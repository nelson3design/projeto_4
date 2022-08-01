import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import HeaderCardapio from "./headerCardapio"

import "./style/compra.css"
import Footer from './footer';

export default function Compra(){


 
  const navigate = useNavigate();
   
  

    const [nomeCliente, setNomeCliente] = useState("")
    const [cpf, setCpf] = useState("")
    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const [cidade, setCidade] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
 

    const [valor, setValor] = useState("")
    const [bebida, setBebida] = useState([])
    const [valorAdicional, setValorAdicional] = useState([])
 

    var valorAddTotal=JSON.parse("[" + valorAdicional + "]")
    
   
    console.log(valorAddTotal)
  

  var soma = 0;    
for(var i = 0; i < valorAddTotal.length; i++) {
    soma += valorAddTotal[i];
}
console.log(soma);

var valorTotal= Number(valor) + Number(soma)

    const data={
        nomeCliente: nomeCliente,
        cpf: cpf,
        cep: cep,
        rua: rua,
        cidade: cidade,
        numero: numero,
        complemento: complemento,
        valor: Number(valor),
        bebida: bebida.join(" / "),
        valorAdicional: soma,
        valorTotal:valorTotal
      
    }
    console.log(data)
    
    const {id} =useParams()
   

    const handleSubmit=((e)=>{
        e.preventDefault()
        axios.post("http://localhost:5000/compra-action/"+id, data).then((res) => {
         
               if(res.status === 200){
                navigate('/obrigado')
               }
           
          });
        console.log(data)
       
    })


    const [item, setItem] = useState([])
    const url="http://localhost:5000/item/"
    const url2="http://localhost:5000/"


     
    useEffect(()=>{
  
        listItem()
        listBebida()


      },[])

      const listItem=()=>{
        axios.get(`${url}${id}`).then((response) => {
            setItem(response.data);
            
        });
      }

     
      
      
      const [beb, setBeb] = useState([])

      const url3="http://localhost:5000/bebidas"
     
  
     
  
        const listBebida=()=>{
          axios.get(`${url3}`).then((response) => {
            setBeb(response.data);
              
          });
        }
  const [count, setCount]=useState(1)
  const [countB, setCountB]=useState(0)

    const [total, setTotal]=useState("")

     const [total2, setTotal2]=useState("")


      



   const handlePlus =(id,title)=>{
     
     setTotal((Number(total))+(Number(id)))
     setValor(title)

    setCount(count + 1)
   
   
   }
  const handleMenos =(preco)=>{
 
     setTotal((Number(total))-(Number(preco)))
    setCount(count - 1)
    
   }



   
   const handlePlus2 =(id,title)=>{
    
     setTotal2((Number(total2))+(Number(id)))
     setBebida(index=>[ ...index,title])
    //  setValorAdicional(id)
      setValorAdicional(index=>[ ...index,id])
   setCountB(countB + 1)

   
   }

   
  const handleMenos2 =(id,title)=>{
 
      setTotal2((Number(total2))-(Number(id)))
     setCountB(countB - 1)
     
      setBebida( index=> index.filter(((_,index)=> index !==0)) )

      setValorAdicional( index=> index.filter(((_,index)=> index !==1 )) )
    
      

     console.log(bebida)
     console.log(valorAdicional)
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
        <input value={nomeCliente} onChange={(e)=>setNomeCliente(e.target.value)} placeholder="nome" required/>
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
              
              beb && beb.map((dado)=>(
                 <>
                <div className='adicinalCard'>

                  <div>{dado.nome}</div>
                  
                   <input type="hidden" value={bebida} onChange={(e)=>setBebida(e.target.value)}/>
                   <input type="hidden" value={valorAdicional} onChange={(e)=>setValorAdicional(e.target.value)}/>
                  <div className='btnPrecoAdicional'>
                  <div className='preco'>R$ {dado.preco}</div>
                  <div className='btnAdicional'>

                  {total2>=dado.preco? <div id={dado.preco} className="plusAdd" onClick={(e)=>handleMenos2(e.target.id)}>-</div>:null}

                {total2>=dado.preco? <div>{countB}</div>:null}
                 <div className="plusAdd" title={dado.nome} id={dado.preco} onClick={(e)=>handlePlus2(e.target.id,e.target.title)}>+</div>

                
                  </div>
                 
                  </div>
                </div>
                  </>
              ))
              
              }
           </div>
        
      

       
       </div>
        <div className='formdados dados2'>

        <input type="submit" className="btnFormCompra" value="Pagar agora"/>
        </div>
      
       
    </form>

    </div>

    <div className='infoCompra'>

      <div className='titleCompra'>RESUMO DO PEDIDO</div>

    {
              

              item && item.map((dados)=>(
                     
        <div className="cardBaseCompra">
            <div className="cardImgCompra">
                <img src={url2+dados.image} alt={url2+dados.image}/>
                <h3>{dados.nome}</h3>

            </div>

             <div className="cardTextCompra">
             <input type="hidden" value={valor} onChange={(e)=>setValor(e.target.value)}/>
                 <div className="texts">{dados.description.slice(0,40)+"..."}</div>
                <div className="cardPrecoCompra">
                    <div className="precoCompra">R$ {Number(Number(total2)+ Number(dados.preco)+total).toFixed(2)}</div>
                   
                    <input type="hidden" value={valor===""? setValor( Number(dados.preco)):null} onChange={(e)=>setValor(e.target.value)}/>

                    {total>=dados.preco? <div className='plus' onClick={()=>handleMenos(dados.preco)}>-</div>:null}
                   {total>=dados.preco? <div>{count}</div>:null}
                     <div className='plus' id={dados.preco} title={   (Number(Number(total2)+ Number(dados.preco*2)+total).toFixed(2)) } onClick={(e)=>handlePlus(e.target.id,e.target.title)}>+</div>
                </div>
               
             
             
            

           
            </div>

           

           
        </div>
             
             ))
            }
            </div>

    </div>
    </section>

    <Footer/>
       
        </>
    )
}