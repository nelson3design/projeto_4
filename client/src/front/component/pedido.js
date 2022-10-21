import React,{useEffect,useState} from "react";
import axios from "axios";
import HeaderPedido from "./headerPedido"
import { MdDone } from "react-icons/md";
import Footer from "./footer";
import { ThreeDots } from  'react-loader-spinner'
import "./style/pedido.css"
import { FaUserCircle,FaCaretDown } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import Cart from "./cart";



export default function Pedido(){

  const navigate = useNavigate();

  var idString= localStorage.getItem("id")

  var id = JSON.parse(idString)
  

  useEffect(() => {

    if (localStorage.getItem("token")) {
      navigate('/pedido')
    } else {
      navigate('/login')
    }


  }, [])

  
const handlelogout =()=>{
  localStorage.removeItem("token")
 localStorage.removeItem("id")
  localStorage.removeItem("emailCliente")
 localStorage.removeItem("idCliente")
 // window.location.reload();
  navigate('/login')
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
const [item2, setItem2] = useState("")

const url="http://localhost:4000/costumer"
const url2="http://localhost:4000/"


useEffect(()=>{


   listItem()
  orders()
    
 },[])

 const data={
  id:id
 }

 
  const listItem=()=>{
  

    axios.post("http://localhost:4000/costumer",data).then((response) => {
        try {
          setItem(response.data.user);
          setItem2(response.data.user.endereco[0]);
          navigate('/pedido')
        } catch (error) {
          navigate('/login')
        }
        
      });
    
  }
 

  
// lista pedidos
  const [order, setorder] = useState([])
  const [order2, setorder2] = useState([])

  const orders = () => {
  
    axios.get("http://localhost:4000/costumer/order/" + id).then((response) => {
      try {
        setorder(response.data.order);
         console.log(response.data.order)
       
      } catch (error) {
        
      }
    });

  }
//console.log(order)



const handleCancel=(idPedido)=>{

 axios.post(url2+"editcancelar-action/"+idPedido).then((response)=>{
    
  
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
     
       
                <div>

                <div className="profile">
                  <div className="avatar"><FaUserCircle className="iconProfile" /> <span>{item.nome}</span></div> <FaCaretDown onClick={handleShow} style={{cursor: "pointer"}}/>
                </div>

               
              
                 
                 <div className={className}>

                
                  <div className="profileItem"><div>Nome: </div><span>{item.nome}</span></div>
                  <div className="profileItem"><div>Email: </div><span>{item.email}</span></div>
                  <div className="profileItem"><div>Cpf: </div><span>{item.cpf}</span></div>
                  <div className="profileItem"><div>Cep: </div><span>{item2.cep}</span></div>
                  <div className="profileItem"><div>Rua: </div><span>{item2.rua}</span></div>
                  <div className="profileItem"><div>Numero: </div><span> {item2.numero}</span></div>
                  <div className="profileItem"><div>Bairro: </div><span>{item2.bairro}</span></div>
                  <div className="profileItem"><div>Cidade: </div><span>{item2.cidade}</span></div>
                  <div className="profileItem"><div>Estado: </div><span>{item2.estado}</span></div>
                  <div className="profileItem"><div>Complemneto: </div><span>{item2.complemento}</span></div>
                   <div onClick={handlelogout} className="sair">Sair</div>
                 </div>
              

                 </div>
       
          
       </div>



            <div>
              {order.map((order, index) => (
                <>
                  <div>Status: {order.status}</div>
                  <div>Confirmado: {order.confirmar}</div>
                  <div>Cancelado: {order.cancelar}</div>
                  <div>Preparado: {order.preparar}</div>
                  <div>Terminado: {order.terminar}</div>
                  <div>Entregado: {order.entregar}</div>
                  <div>Finalizado: {order.finalizar}</div>
                 
                  { order.pedido.map((pedido, index) => (
                      pedido.itemComprado.map((cart) => (
                  <>
                    <img src={url2 + cart.file} alt={url2 + cart.file} />
                    <div>Nome: {cart.nome}</div>
                    <div>Categoria: {cart.categoria}</div>
                    <div>Description: {cart.description}</div>
                    <div>Quantidade: {cart.qty}</div>
                    <div>Preço: {cart.preco}</div>
                  </>
                  ))

                  ))} 

                  {order.pedido.map((pedido, index) => (
                    pedido.bebidas.map((cart) => (
                      <>
                        <img src={url2 + cart.file} alt={url2 + cart.file} />
                        <div>Nome: {cart.nome}</div>
                        <div>Categoria: {cart.categoria}</div>
                        <div>Description: {cart.description}</div>
                        <div>Quantidade: {cart.qty}</div>
                        <div>Preço: {cart.preco}</div>

                      </>
                    ))

                  ))} 

                  {order.pedido.map((pedido, index) => (
                    pedido.entrega.map((cart) => (
                      <>
                        <div>Rua: {cart.rua}</div>
                        <div>CEP: {cart.cep}</div>
                        <div>Numero: {cart.numero}</div>
                        <div>Complemento: {cart.complemento}</div>
                        <div>Bairro: {cart.bairro}</div>
                        <div>Cidade: {cart.cidade}</div>
                        <div>Estado: {cart.estado}</div>

                      </>
                    ))

                  ))} 

                  {order.pedido.map((pedido, index) => (
                       
                  <div>Valor Total: {pedido.valorTotal}</div>
                  ))} 
                </>

              ))}
            </div>

     
</div>
</div>

        <Cart />
<Footer/>

       </>
    )
}