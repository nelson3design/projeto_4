import React,{useEffect,useState} from "react";
import axios from "axios";
import HeaderPedido from "./headerPedido"
import { MdDone } from "react-icons/md";
import Footer from "./footer";
import { Audio,ThreeDots } from  'react-loader-spinner'
import "./style/pedido.css"

export default function Pedido(){

   



    const [item, setItem] = useState([])
    const url="http://localhost:5000/clientes"
    const url2="http://localhost:5000/"

    
     useEffect(()=>{
  

        listItem()
         
      },[])

      const listItem=()=>{
        axios.get(`${url}`).then((response) => {
            setItem(response.data);
            console.log(item)
        });
      }


    return(

       <>

       <HeaderPedido/>

       <div className="baseContent">

        <div className="links pedidoBase1">



       <div className="infoCliente">

       {
              
              item && item.slice(-1).map((dados)=>(
           
                 <>
                  <div>Nome: <span>{dados.nomeCliente}</span></div>
                   <div>Cpf: <span>{dados.cpf}</span></div>
                   <div>Cep: <span>{dados.cep}</span></div>
                   <div>Rua: <span>{dados.rua}</span></div>
                   <div>Cidade: <span>{dados.cidade}</span></div>
                   <div>Numero: <span> {dados.numero}</span></div>
                   <div>Complemento: <span>{dados.complemneto}</span></div>
                 
                 </>
       
            ))
              }
       </div>


      <div className="cardBasePedido">
       {
              
              item && item.map((dados)=>(

                <>
               
             <div className="cardCliente">

              <div className="dadoPedido">

                   <div className="nuPedido">Numero do pedido: <span>{dados.pedido}</span></div>
                  <div className="barra2"></div>
                   <div>Confirmado: {dados.confirmar==="on"?   <MdDone style={{color:"green",marginTop:5}}/>: <MdDone style={{color:"#B2B2B2"}}/> }</div>
              

                   {dados.preparar==="on" && dados.terminar==="off"?  <div className="preparando">Preparando: {dados.preparar==="on" && dados.terminar==="off"?     <ThreeDots
          height="10"
          width="40"
          color='green'
          ariaLabel='loading'
        />: <MdDone style={{color:"green",marginTop:5}}/>}</div> : <div>Preparado: {dados.terminar==="on"?   <MdDone style={{color:"green",marginTop:5}}/>: <MdDone style={{color:"#B2B2B2",marginTop:5}}/> }</div>}
                   
       
                   <div>Sair pra entregar: {dados.entregar==="on"?   <MdDone style={{color:"green"}}/>: <MdDone style={{color:"#B2B2B2",marginTop:5}}/> }</div>
                   <div>Entregado: {dados.finalizar==="on"?   <MdDone style={{color:"green",marginTop:5}}/>: <MdDone style={{color:"#B2B2B2",marginTop:5}}/> }</div>
                   <div>Data: <span>{dados.data.slice(0,10)} / {dados.data.slice(11,19)}</span></div>
                    <div className="">Bebida: <span>{dados.bebida}</span></div>

                    <div className="valorTotal">Total: <span>R${dados.valorTotal}</span></div>

                    {dados.confirmar==="on"? <button className="btnPedidoCancelar colorZinca">cancelar</button> : <button className="btnPedidoCancelar">cancelar</button> }
                    
                 </div>

                 {/* fim */}

                  <div className="cardBase">
               
            <div className="cardImg">
                <img src={url2+dados.image} alt={url2+dados.image}/>
                <h3>{dados.nome}</h3>

            </div>

             <div className="cardText">
            
                 <div className="texts">{dados.description}</div>
                <div className="cardPreco">
                    {/* <div className="preco">R$ {dados.preco}</div> */}
                   
                    {/* <div className="btn"><span>comprar</span></div> */}
                </div>
                
            </div>

        </div>


     
   </div>

             
             </>
               
       
            ))
              }

              </div>

</div>
</div>

<Footer/>
       </>
    )
}