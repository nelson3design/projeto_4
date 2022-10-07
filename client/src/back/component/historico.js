import React,{useEffect,useState} from "react";
import axios from "axios"
import HeaderPedido from "./headerPedido"
import "../styles/links.css"


export default function Historico(){

  
  const [item, setItem] = useState([])
  const url="http://localhost:5000/pedidofinalizar/"
  const url2="http://localhost:5000/"

  var cpfstring= localStorage.getItem("senha")

  var senha= cpfstring.slice(1,-1)


  useEffect(()=>{


      listItem()
       
    },[])

    const listItem=()=>{
      axios.get(`${url}${senha}`).then((response) => {
          setItem(response.data);
          
      });
    }
//     const handleRemove=(idPedido)=>{
//       console.log(idPedido)
//       if(window.confirm('tem certeza de excluir esse pedido')){
//           axios.delete(`${url2}delete-pedido/${idPedido}`).then((response) => {
             
//               listItem()
             
//           });
//       }
//  }



    return(
        <>
        <HeaderPedido/>
        <div className="baseContent">
        <div className="links">
        <ul className="linkContent">
          <li><a href="/admin/dashboard/andamento">em aberto</a></li>
          <li><a href="/admin/dashboard/preparo">em preparo</a></li>
          <li><a href="/admin/dashboard/entrega">em entrega</a></li>
          <li className="ativo"><a href="/admin/dashboard/historico">históricos</a></li>
         
        </ul>
      </div>
      <section className="baseItens">

{
         
         item && item.map((dados)=>(
         
   <div className="caixa" key={dados.id}>
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
        {dados.finalizar==="on"? <button className="entregado">conluido</button> : null}
        {dados.cancelar==="on"? <button className="entregado">cancelado</button> : null}

        {/* <button className="terminar" onClick={()=>handleRemove(dados.idPedido)}>excluir</button>  */}
           
           
       </div>

   </div>
       ))
         }
</section>



      </div>
    
        </>
    )
}