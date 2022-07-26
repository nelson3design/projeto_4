import React,{useEffect,useState} from "react";
import axios from "axios"

import HeaderPedido from "./headerPedido"
import "../styles/links.css"
import "../styles/ativos.css"

export default function Preparo(){

  const [item, setItem] = useState([])
  const url="http://localhost:5000/pedidopreparo"
  const url2="http://localhost:5000/"

  useEffect(()=>{


      listItem()
       
    },[])

    const listItem=()=>{
      axios.get(`${url}`).then((response) => {
          setItem(response.data);
          
      });
    }

    const handlePreparar=(idPedido)=>{
      

      axios.post(url2+"editpreparar-action/"+idPedido).then((response)=>{
        console.log(response)
        listItem()
      })
    }
const handleTerminar=(idPedido)=>{
  axios.post(url2+"editterminar-action/"+idPedido).then((response)=>{
    console.log(idPedido)
    listItem()
  })
}



    return(
        <>
        <HeaderPedido/>
        <div className="baseContent">
        <div className="links">
        <ul className="linkContent">
          <li><a href="/admin/dashboard/andamento">em aberto</a></li>
          <li className="ativo"><a href="/admin/dashboard/preparo">em preparo</a></li>
          <li><a href="/admin/dashboard/entrega">em entrega</a></li>
          <li><a href="/admin/dashboard/historico">históricos</a></li>
         
        </ul>
      </div>
        

      <section className="baseItens">

{
         
         item && item.map((dados)=>(
         
   <div className="caixa">
       <div className="caixaImg">
           <img src={url2+dados.image} alt={dados.image}/>
       </div>
       <div className="descrip">{dados.description}</div>
       <div className="info">
           <div><span>Cliente:</span> <span>{dados.nomeCliente}</span></div>
           <div><span>Valor:</span> <span>R$ {dados.preco}</span></div>
           <div><span>Pedido:</span> <span>{dados.pedido}</span></div>
           <div><span>Quant:</span> <span>{dados.quant}</span></div>
           <div><span>Pago:</span> <span>{dados.pago==="on"? "sim" : "não" }</span></div>
           <div>
               <span>Endereço:</span> 
           </div>
           <p className="endereco">{dados.rua}, {dados.cidade}, {dados.numero}, {dados.cep}</p>

       </div>

       <div className="btns">
        {dados.preparar==="off"? <button className="preparar" onClick={()=>handlePreparar(dados.idPedido)}>preparar</button>:<button className="terminar" onClick={()=>handleTerminar(dados.idPedido)}>terminar</button>}
           
           
       </div>

   </div>
       ))
         }
</section>
</div>
        </>
    )
}