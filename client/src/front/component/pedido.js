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
  //var id = "633ee6e683ddc91e8ec44184"

  useEffect(() => {

    if (localStorage.getItem("token")) {
      navigate('/pedido')
    } else {
      navigate('/login')
    }


  }, [])

  
const handlelogout =()=>{
  const token = localStorage.removeItem("token")
  const id = localStorage.removeItem("id")
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

const url="http://localhost:4000/costumer/"
const url2="http://localhost:4000/"


useEffect(()=>{


   listItem()
 
    
 },[])

 
  const listItem=()=>{
 
     axios.get(`${url}${id}`).then((response) => {
       try {
         setItem(response.data.user);
         setItem2(response.data.user.endereco[0]);
       } catch (error) {
         navigate('/login')
       }
       
       
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


     
</div>
</div>

        <Cart />
<Footer/>

       </>
    )
}