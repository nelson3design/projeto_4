import axios from 'axios';
import { useState,useEffect } from 'react';

import { useParams } from 'react-router-dom';

import HeaderCardapio from "./headerCardapio"

import "./style/compra.css"

export default function Compra(){

   
  

    const [nomeCliente, setNomeCliente] = useState("")
    const [cpf, setCpf] = useState("")
    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const [cidade, setCidade] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")


    const [quant, setQuant] = useState("")
    const [bebida, setBebida] = useState("")
    const [quantBebida, setQuantBebida] = useState("")
 
    
   
  
    const data={
        nomeCliente: nomeCliente,
        cpf: cpf,
        cep: cep,
        rua: rua,
        cidade: cidade,
        numero: numero,
        complemento: complemento,
        quant: quant,
        bebida: bebida,
        quantBebida: quantBebida,
       
      
    }
    
    const {id} =useParams()
    console.log(id)

    const handleSubmit=((e)=>{
        e.preventDefault()
        axios.post("http://localhost:5000/compra-action/"+id, data).then(() => {
           
          });
        
       
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
   

    const [total, setTotal]=useState("")

     const [total2, setTotal2]=useState("")

   
   const handlePlus =(preco)=>{
     
     setTotal((Number(total))+(Number(preco)))

   
   }
  const handleMenos =(preco)=>{
 
     setTotal((Number(total))-(Number(preco)))
console.log(total)
    
   }


   
   const handlePlus2 =(preco)=>{
     
     setTotal2((Number(total2))+(Number(preco)))

   
   }
  const handleMenos2 =(preco)=>{
 
     setTotal2((Number(total2))-(Number(preco)))
console.log(total)
    
   }


   

    return(
        <>
        <HeaderCardapio/>

        <section className='compraBase'>

            <div className='compraContent'>

     
       
        <div className='compraForm'>

      
         <form onSubmit={handleSubmit}>
       <div>
        <label>Nome</label>   
        <input value={nomeCliente} onChange={(e)=>setNomeCliente(e.target.value)} placeholder="nome"/>
       </div>
        
       <div>
       <label>Cpf</label>
        <input value={cpf} onChange={(e)=>setCpf(e.target.value)} placeholder="cpf"/>
       </div>
        
      <div>
        <label>Cep</label>
        <input value={cep} onChange={(e)=>setCep(e.target.value)} placeholder="cep"/>
      </div>
        
       <div>
       <label>Rua</label>
        <input value={rua} onChange={(e)=>setRua(e.target.value)} placeholder="rua"/>
       </div>
       
      <div>
        <label>Cidade</label>
        <input value={cidade} onChange={(e)=>setCidade(e.target.value)} placeholder="cidade"/>
      </div>
       

      <div>
        <label>Numero</label>
        <input value={numero} onChange={(e)=>setNumero(e.target.value)} placeholder="numero"/>
      </div>
       
        <div>
        <label>Complemento</label>
        <input value={complemento} onChange={(e)=>setComplemento(e.target.value)} placeholder="complemento"/>
        </div>
      
        <div>
        <label>Quantidade</label>
        <input value={quant} onChange={(e)=>setQuant(e.target.value)} placeholder="quantidade"/>
        </div>
       
       
       <div className='adicional'>
        <div>Adicional</div>
        <label>Bebidas</label>
      

          
           {
              
              beb && beb.map((dado)=>(
                 <>
                 <img src={url2+dado.image} alt={url2+dado.image}/>
                  <div>{dado.nome}</div>
                  <div>{dado.preco}</div>
                  <div className='plus' onClick={()=>handleMenos2(dado.preco)}>-</div>
                 <div className='plus' onClick={()=>handlePlus2(dado.preco)}>+</div>
                  </>
              ))
              
              }
           
        
          <label>Quantidade</label>

        <select name="bebida" id=""  value={quantBebida}  onChange={(e) => setQuantBebida(e.target.value)}>
           <option value="">selecione...</option>
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>

          </select>
       </div>
        
      
        <input type="submit" className="btnAtion1 btnAtion"/>
        
    </form>

    </div>

    {
              

              item && item.map((dados)=>(
                     
        <div className="cardBase cardCompra">
            <div className="cardImg">
                <img src={url2+dados.image} alt={url2+dados.image}/>
                <h3>{dados.nome}</h3>

            </div>

             <div className="cardText">
               
                 <div className="texts">{dados.description}</div>
                <div className="cardPreco">
                    <div className="preco">R$ {total===""? Number(dados.preco): Number(total.toFixed(2))}</div>
                   
                    
                    {total<=dados.preco? null : <div className='plus' onClick={()=>handleMenos(dados.preco)}>-</div>}
                   
                     <div className='plus' onClick={()=>handlePlus(dados.preco)}>+</div>
                </div>
               
               <div>{total2}</div>

               <div>total: {total2+total}</div>

           
            </div>

           

            {/* <div className='plus'>{total==total? total+total: null}</div> */}
        </div>
             
             ))
            }

    </div>
    </section>
       
        </>
    )
}