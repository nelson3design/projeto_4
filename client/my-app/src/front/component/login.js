import React,{useEffect,useState,useContext} from "react"
import {useNavigate} from 'react-router-dom';
import { FaClipboardCheck, FaTimes, FaBars, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import Footer from "./footer"
import "./style/meusPedidos.css"
import Cart from "./cart";
import HeaderPedido from "./headerPedido"
import { CartContext } from "../context/context"
import axios from 'axios';

export default function Login(){

    const { handleCart, carts } = useContext(CartContext)
    const [cpf, setCpf] = useState("")

    const [nome, setNome]=useState("")

    const [nomeCliente, setNomeCliente] = useState("")
    const [cpfRegister, setCpfRegister] = useState("")
    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const [cidade, setCidade] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")

    const [error, setError]=useState(false)

    const data = {
       

        nomeCliente: nomeCliente,
        cpf: cpfRegister,
        cep: cep,
        rua: rua,
        cidade: cidade,
        numero: numero,
        complemento: complemento,



    }


  


    const handleSubmit = ((e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/register", data).then((res) => {

           try {
            console.log(res.data.msg)
               setError(res.data.msg)
           } catch (error) {
               console.log(error)
            //    setError(true)
           }

        });
       

    })


    // if(cpf==""){
    //     localStorage.removeItem("cpf")
    //   }

    const navigate = useNavigate();

  
    useEffect(()=>{
        if(localStorage.getItem('cpf')){
            navigate('/pedido')
        }

    },[])


    function login(e){
    e.preventDefault()
    let item ={nome, cpf}
   fetch("http://localhost:5000/clientes",{
    method:"post",
    headers:{
        "Content-type":"application/json",
        "Accept":"application/jason"
    },
    body: JSON.stringify(item)
   }).then(result=> result.json())

    .then(result=>{
     
            
            localStorage.setItem("cpf",JSON.stringify(result[0].cpf))
            navigate('/pedido')
         
            console.log(result)
            if(result===400){
                console.log(result)
            }
        
    })  
   

   }

   


    return(
        <>
           <HeaderPedido/>
            <div className="linksBackPedidos">
         <div className="linksLogin">
            <div className="formPedidos">
                <div className="titlePedido">Já sou cadastrado</div>
                <form onSubmit={login}>
                <div className="formItens">
                  <div>
                    <label>nome</label>
                    <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                   </div>
                <div>
                    <label>cpf</label>               
                    <input type="number" value={cpf} onChange={(e)=>setCpf(e.target.value)}/>
                </div>
                </div>
             

                <input className="btnPedido" type="submit" value="login"/>
                </form>
            </div>


                    <div className="formPedidos">
                        <div className="titlePedido">Esta é minha primeira compra</div>
                        {error && <div style={{ color: "red" }}>cliente já tem cadastro</div> }
                        <form onSubmit={handleSubmit}>
                            <div className="formItens">
                                <div>
                                    <label>nome</label>
                                    <input value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} placeholder="nome" required />
                                </div>
                                <div>
                                    <label>cpf</label>
                                    <input type="number" value={cpfRegister} onChange={(e) => setCpfRegister(e.target.value)} />
                                </div>
                            </div>

                            <div className='formInput'>
                                <div className='compraFormContent'>
                                    <label>Cep</label>
                                    <input value={cep} onChange={(e) => setCep(e.target.value)} placeholder="88137624" required />
                                </div>

                                <div className='compraFormContent'>
                                    <label>Rua</label>
                                    <input value={rua} onChange={(e) => setRua(e.target.value)} placeholder="rua jão vitor" required />
                                </div>
                            </div>

                            <div className='formInput'>
                                <div className='compraFormContent'>
                                    <label>Cidade</label>
                                    <input value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="palhoça" required />
                                </div>


                                <div className='formInput'>
                                    <div className='compraFormContent numerInput1'>
                                        <label>Numero</label>
                                        <input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="65" required />
                                    </div>

                                    <div className='compraFormContent numerInput2'>
                                        <label>Complemento</label>
                                        <input value={complemento} onChange={(e) => setComplemento(e.target.value)} placeholder="apto 2" required />
                                    </div>
                                </div>
                            </div>


                            <input className="btnPedido" type="submit" value="cadastre-se" />
                        </form>
                    </div>

         </div>
         </div>
            <Cart />
         <Footer/>
        </>
    )
}