import React,{useEffect,useState} from "react";
import axios from "axios";
import HeaderPedido from "./headerPedido"
import { MdDone } from "react-icons/md";
import Footer from "./footer";
import { ThreeDots } from  'react-loader-spinner'
import "./style/pedido.css"
import { FaUserCircle,FaCaretDown } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';

export default function Pedido(){


  const navigate = useNavigate();

  var cpfstring= localStorage.getItem("cpf")

  var cpf1= cpfstring.slice(1,-1)

  var cpf = Number(cpf1)

const [logout, setLogout]= useState(false)

if(cpf===""){
  localStorage.removeItem("cpf")
}

if(logout){
  localStorage.removeItem("cpf")
  navigate('/meus-pedidos')
}

const handlelogout =()=>{
  setLogout(true)
}

   
  const [profile , setProfile]= useState(false)

  let className='profileContent'

  if(!profile){
      className = "hideProfileContent"
  }


  const handleShow = ()=>{
    setProfile(!profile)
  }


    const [item, setItem] = useState([])
    const url="http://localhost:5000/clientes/"
    const url2="http://localhost:5000/"

    
  
  
 
    
     useEffect(()=>{
    

        listItem()
         
      },[])

      const listItem=()=>{
        axios.get(`${url}${cpf}`).then((response) => {
            setItem(response.data);
         
        });
      }

      const handleCancel=(idPedido)=>{
   
        axios.post(url2+"editcancelar-action/"+idPedido).then((response)=>{
           
            console.log(idPedido)
            listItem()
          })
    }


    const handleRemove=(idPedido)=>{
      console.log(idPedido)
      if(window.confirm('tem certeza de excluir esse pedido')){
          axios.delete(`${url2}delete-pedido/${idPedido}`).then((response) => {
             
              listItem()
             
          });
      }
 }

     


    return(

       <>
    

        <HeaderPedido/>

       <div className="baseContent">

        <div className="links pedidoBase1">



       <div className="infoCliente">
     
       {
              
              item && item.slice(-1).map((dados)=>(
                <div>

                <div className="profile">
                <div className="avatar"><FaUserCircle className="iconProfile"/> <span>{dados.nomeCliente}</span></div> <FaCaretDown onClick={handleShow} style={{cursor: "pointer"}}/>
                </div>

               
              
                 
                 <div className={className}>
           
                  <div className="profileItem"><div>Nome: </div><span>{dados.nomeCliente}</span></div>
                   <div className="profileItem"><div>Cpf: </div><span>{dados.cpf}</span></div>
                   <div className="profileItem"><div>Cep: </div><span>{dados.cep}</span></div>
                   <div className="profileItem"><div>Rua: </div><span>{dados.rua}</span></div>
                   <div className="profileItem"><div>Cidade: </div><span>{dados.cidade}</span></div>
                   <div className="profileItem"><div>Numero: </div><span> {dados.numero}</span></div>
                   <div className="profileItem"><div>Complemneto: </div><span>{dados.complemneto}</span></div>
                   <div onClick={handlelogout} className="sair">Sair</div>
                 </div>
              

                 </div>
       
            ))
              }
       </div>


      <div className="cardBasePedido">
       {
              
              item && item.map((dados)=>(

                <>
               
             <div className="cardCliente cardClienteMobile">

              <div className="dadoPedido">

                   <div className="nuPedido">Numero do pedido: <span>{dados.pedido}</span></div>
                  <div className="barra2"></div>
          {
           dados.finalizar==="off"?
              <>
                  {dados.cancelar==="on"?  <div>Cancelado:   <MdDone style={{color:"green",marginTop:5}}/></div> :  <div>Confirmado: {dados.confirmar==="on"?   <MdDone style={{color:"green",marginTop:5}}/>: <MdDone style={{color:"#B2B2B2"}}/> }</div>}
              

                   {dados.preparar==="on" && dados.terminar==="off"?  <div className="preparando">Preparando: {dados.preparar==="on" && dados.terminar==="off"?     <ThreeDots
          height="10"
          width="40"
          color='green'
          ariaLabel='loading'
        />: <MdDone style={{color:"green",marginTop:5}}/>}</div> : <div>Preparado: {dados.terminar==="on"?   <MdDone style={{color:"green",marginTop:5}}/>: <MdDone style={{color:"#B2B2B2",marginTop:5}}/> }</div>}
                   
       {dados.entregar==="on" && dados.finalizar==="off"?
                   <div>Pedido a caminho: {dados.entregar==="on"?  <ThreeDots
          height="10"
          width="40"
          color='green'
          ariaLabel='loading'
        />: null}</div> : null}
  </>
     :null
       }
                   <div>Pedido concluido: {dados.finalizar==="on"?   <MdDone style={{color:"green",marginTop:5}}/>: <MdDone style={{color:"#B2B2B2",marginTop:5}}/> }</div>
                   <div>Data: <span>{dados.data.slice(0,10)} / {dados.data.slice(11,19)}</span></div>
                    <div className="">Bebida: <span>{dados.bebida}</span></div>

                    <div className="valorTotal">Total: <span>R${dados.valorTotal}</span></div>
                   {dados.finalizar==="off"?
                   <>
                    {dados.confirmar==="on" || dados.cancelar==="on"? <button className="btnPedidoCancelar colorZinca">cancelar</button> : <button className="btnPedidoCancelar"  onClick={()=>handleCancel(dados.idPedido)}>cancelar</button> }
                    </>
                    :null}
                 <button className="btnPedidoCancelar terminar" onClick={()=>handleRemove(dados.idPedido)}>excluir</button> 
                 </div>


                 {/* fim */}

                  <div className="cardBase">
               
            <div className="cardImg">
                <img src={url2+dados.image} alt={url2+dados.image}/>
                <h3>{dados.nome}</h3>

            </div>

             <div className="cardText">
            
                 <div className="texts">{dados.description}</div>
               
                
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