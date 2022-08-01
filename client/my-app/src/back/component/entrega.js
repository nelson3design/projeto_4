
import React,{useEffect,useState} from "react";
import axios from "axios"
import HeaderPedido from "./headerPedido"

import "../styles/links.css"

import Footer from "./footer";
export default function Entrega(){

  
  const [item, setItem] = useState([])
  const url="http://localhost:5000/pedidoterminar"
  const url2="http://localhost:5000/"

  useEffect(()=>{


      listItem()
       
    },[])

    const listItem=()=>{
      axios.get(`${url}`).then((response) => {
          setItem(response.data);
          
      });
    }

const handleEntregar=(idPedido)=>{
      

  axios.post(url2+"editsair-action/"+idPedido).then((response)=>{
        console.log(response)
        listItem()
      })
}


const handleFinalizar=(idPedido)=>{
  axios.post(url2+"editfinalizar-action/"+idPedido).then((response)=>{
    console.log("nelson")
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
          <li><a href="/admin/dashboard/preparo">em preparo</a></li>
          <li className="ativo"><a href="/admin/dashboard/entrega">em entrega</a></li>
          <li><a href="/admin/dashboard/historico">históricos</a></li>
         
        </ul>
        </div>
        {item.length >1? <div>{item.length} Pedidos em entrega</div>:<div>{item.length} Pedido em entrega</div>}
        <section className="baseItens">

{
         
         item && item.map((dados)=>(
         
   <div className="caixa">
       <div className="caixaImg">
           <img src={url2+dados.image} alt={dados.image}/>
       </div>
       <div className="descrip">{dados.description.slice(0,40)+"..."}</div>
       <div className="info">
                <div><span>Pedido:</span> <span>{dados.pedido}</span></div>
                <div><span>Nome:</span> <span>{dados.nome}</span></div>
                <div><span>Valor:</span> <span>R$ {dados.valorTotal}</span></div>
                <div><span>Bebida:</span> <span>{dados.bebida}</span></div>
                <div><span>Cliente:</span> <span>{dados.nomeCliente}</span></div>
           <div>
               <span>Endereço:</span> 
           </div>
           <p className="endereco">{dados.rua.slice(0,15)+"..."}, {dados.cidade}, {dados.numero}, {dados.cep}</p>

       </div>

       <div className="btns">
        {dados.entregar==="off"? <button className="preparar" onClick={()=>handleEntregar(dados.idPedido)}>entregar</button> : <button className="terminar" onClick={()=>handleFinalizar(dados.idPedido)}>finalizar</button>}
           
           
       </div>

   </div>
       ))
         }
</section>


      </div>
        
      {/* <Footer/> */}
        </>
    )
}