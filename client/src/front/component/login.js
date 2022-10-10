import React,{useEffect,useState,useContext} from "react"
import {useNavigate} from 'react-router-dom';
import { FaClipboardCheck, FaTimes, FaBars, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import Footer from "./footer"
import "./style/meusPedidos.css"
import Cart from "./cart";
import HeaderPedido from "./headerPedido"
import { CartContext } from "../context/context"
import axios from 'axios';
import Pedido from "./pedido";


export default function Login(){

  
    const navigate = useNavigate();

   


 
    useEffect(()=>{

        if(localStorage.getItem("token")) {
             navigate('/pedido')
        } else {
           navigate('/login')
        }
    
      
    },[])
   


    const [email, setEmail]=useState("")
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [cep, setCep] = useState("")
    const [rua, setRua] = useState("")
    const [telefone, setTelefone] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [error, setError]=useState(false)

    const data = { 
        email:email,
        nome: nome,
        cpf: cpf,
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: complemento,
        telefone: telefone,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        password: password,
        confirmPassword: confirmPassword

    }


    const handleSubmit = ((e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/register", data).then((res) => {
           try {
           
               setError(res.data.msg)
           } catch (error) {
              
           }

        });  

    })


    function btnLogin(e){
    e.preventDefault()
        let item = { email, password }

        if(item.email===""){
            console.log('email é obrigatorio')
           
        } else if (item.password === ""){
            console.log('password é obrigatorio')
          
        }
         else{

            axios.post("http://localhost:4000/login", item).then((res) => {
              
    
                try {
                    
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    localStorage.setItem("id", JSON.stringify(res.data.id));
                  navigate('/pedido')
                    //window.location.reload();
    
                   
                } catch (error) {
                    console.log(error)
                   
                }
    
            }); 
        }

   

   }

   


    return(
        <>
           <HeaderPedido/>

          
             
            <div className="linksBackPedidos">
         <div className="linksLogin">
            <div className="formPedidos">
                <div className="titlePedido">Já sou cadastrado</div>
                <form onSubmit={btnLogin}>
                <div className="formItens">
                  <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                   </div>
                <div>
                    <label>Senha</label>               
                    <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
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

                                <div className="formItens">
                                    <div>
                                        <label>nome</label>
                                        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="nome" required />
                                    </div>
                                    <div>
                                        <label>email</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                                    </div>
                                </div>
                           
                            </div>
                            <div className="formItens">
                                <div>
                                    <label>cpf</label>
                                    <input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="cpf" />
                                </div>
                                <div>
                                    <label>telefone</label>
                                    <input type="number" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="telefone" required />
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
                                    <label>Bairro</label>
                                    <input value={bairro} onChange={(e) => setBairro(e.target.value)} placeholder="bela vista" required />
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
                            <div className='formInput'>
                                <div className='compraFormContent'>
                                    <label>cidade</label>
                                    <input value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="palhoça" required />
                                </div>


                                <div className='formInput'>
                                    <div className='compraFormContent numerInput1'>
                                        <label>Estado</label>
                                        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                                            <option value="">Escolhe um estado</option>
                                            <option value="Acre">Acre</option>
                                            <option value="Alagoas">Alagoas</option>
                                            <option value="Amapá">Amapá</option>
                                            <option value="Amazonas">Amazonas</option>
                                            <option value="Bahia">Bahia</option>
                                            <option value="Ceará">Ceará</option>
                                            <option value="Espírito Santo">Espírito Santo</option>
                                            <option value="Goiás">Goiás</option>
                                            <option value="Maranhão">Maranhão</option>
                                            <option value="Mato Grosso">Mato Grosso</option>
                                            <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                                            <option value="Minas Gerais">Minas Gerais</option>
                                            <option value="Pará">Pará</option>
                                            <option value="Paraíba">Paraíba</option>
                                            <option value="Paraná">Paraná</option>
                                            <option value="Pernambuco">Pernambuco</option>
                                            <option value="Piauí">Piauí</option>
                                            <option value="Rio de Janeiro">Rio de Janeiro</option>
                                            <option value="Rio Grande do Norte">Rio Grande do Norte</option>
                                            <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                                            <option value="Rondônia">Rondônia</option>
                                            <option value="Roraima">Roraima</option>
                                            <option value="Santa Catarina">Santa Catarina</option>
                                            <option value="São Paulo">São Paulo</option>
                                            <option value="Sergipe">Sergipe</option>
                                            <option value="Tocantins">Tocantins</option>
                                            <option value="Distrito Federal">Distrito Federal</option>
                                           
                                        </select>
                                    </div>

                                   
                                </div>
                            </div>
                            <div className="formItens">
                                <div>
                                    <label>Crie sua Senha de acesso</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div>
                                    <label>Digite novamente</label>
                                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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