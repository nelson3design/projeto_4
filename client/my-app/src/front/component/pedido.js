import React,{useEffect,useState} from "react";
import axios from "axios";
import HeaderPedido from "./headerPedido"
import { MdDone } from "react-icons/md";

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

       {
              
              item && item.slice(-1).map((dados)=>(
           
                 <>
                  <div>Nome: {dados.nomeCliente}</div>
                   <div>Cpf: {dados.cpf}</div>
                   <div>Cep: {dados.cep}</div>
                   <div>Rua: {dados.rua}</div>
                   <div>Cidade: {dados.cidade}</div>
                   <div>Numero: {dados.numero}</div>
                   <div>Complemento: {dados.complemneto}</div>
                 
                 </>
       
            ))
              }

      
       {
              
              item && item.map((dados)=>(
             <>

                   <div>Pedido: {dados.pedido}</div>
                   <div>Confirmado: {dados.confirmar==="on"?   <MdDone style={{color:"green"}}/>: <MdDone style={{color:"#B2B2B2"}}/> }</div>
              

                   {dados.preparar==="on" && dados.terminar==="off"?  <div className="preparando">Preparando: {dados.preparar==="on" && dados.terminar==="off"?     <ThreeDots
          height="10"
          width="40"
          color='green'
          ariaLabel='loading'
        />: <MdDone/>}</div> : <div>Preparado: {dados.terminar==="on"?   <MdDone style={{color:"green"}}/>: <MdDone style={{color:"#B2B2B2"}}/> }</div>}
                   
       
                   <div>Sair pra entregar: {dados.entregar==="on"?   <MdDone style={{color:"green"}}/>: <MdDone style={{color:"#B2B2B2"}}/> }</div>
                   <div>Entregado: {dados.finalizar==="on"?   <MdDone style={{color:"green"}}/>: <MdDone style={{color:"#B2B2B2"}}/> }</div>
                   <div>Data: {dados.data.slice(0,10)} / {dados.data.slice(11,19)}</div>
                   {/* <div>Data: {dados.data}</div> */}

                 
                 

                  <div className="cardBase">
               
            <div className="cardImg">
                <img src={url2+dados.image} alt={url2+dados.image}/>
                <h3>{dados.nome}</h3>

            </div>

             <div className="cardText">
            
                 <div className="texts">{dados.description}</div>
                <div className="cardPreco">
                    <div className="preco">R$ {dados.preco}</div>
                   
                    <div className="btn"><span>comprar</span></div>
                </div>
                
            </div>

        </div>


{/*    
          <ThreeDots
          height="200"
          width="100"
          color='red'
          ariaLabel='loading'
        /> */}
     
   
             
             </>
               
       
            ))
              }


       </>
    )
}