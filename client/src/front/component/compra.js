import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CartContext } from "../context/context"
import HeaderCardapio from "./headerCardapio"

import "./style/compra.css"
import Footer from './footer';
import { MdDownloadDone } from 'react-icons/md';
import Cart from "./cart";
export default function Compra(){

  const { carts, handleDelete, handleAdd, total } = useContext(CartContext)
 
  const navigate = useNavigate();

  const [logIn, setLogIn] = useState(true)
  const [logOut, setLogOut] = useState(false)

  function handleLogin() {
    setLogIn(false)
    setLogOut(true)
  }
  function handleLogout() {
    setLogIn(true)
    setLogOut(false)
  }
  
  console.log(total)
  if(total <= 0){
    navigate('/')
  }
    // verificar login

  var idString = localStorage.getItem("emailCliente")

  var emailCliente = JSON.parse(idString)
  

  var userOrder = ''
  var userLogin = ''

  if (localStorage.getItem("emailCliente")) {
    userOrder = 'showUserOrder'
    userLogin = 'hideUserOrder'
  } else {
    userOrder = 'hideUserOrder'
    userLogin = 'showUserOrder'
  }




  const [email, setEmail] = useState("")
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

  const [error, setError] = useState(false)


  // register customer
  const userInfos = {
    email: email,
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


  const handleSubmit2 = ((e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/register", userInfos).then((res) => {
      try {
        localStorage.setItem("emailCliente", JSON.stringify(userInfos.email));
        window.location.reload(); 
      } catch (error) {
      }
    });
  })

// customer login
  function btnLogin(e) {
    e.preventDefault()
    let item = { email, password }
      axios.post("http://localhost:4000/login", item).then((res) => {
        try {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("id", JSON.stringify(res.data.id));
          localStorage.setItem("emailCliente", JSON.stringify(item.email));
          localStorage.setItem("costumer", JSON.stringify(res.data.nome));
          window.location.reload();
          console.log(res.data)
         
        } catch (error) {
          
        }

      });
  }

    

    //fim verificar login
 
    const [cepIn, setCepIn] = useState("")
    const [ruaIn, setRuaIn] = useState("")
    const [numeroIn, setNumeroIn] = useState("")
    const [bairroIn, setBairroIn] = useState("")
    const [cidadeIn, setCidadeIn] = useState("")
    const [estadoIn, setEstadoIn] = useState("")
    const [complementoIn, setComplementoIn] = useState("")
 

    const [valor, setValor] = useState("")
  
  const [total2, setTotal2] = useState("")

 
   
useEffect(()=>{
  getId()
},[])

const valorTotal = Number(total + total2).toFixed(2)

const itemComprado = carts
 

// data customer login
const [customer, setCustomer ] = useState("")
  
const getId=(()=>{
  axios.get("http://localhost:4000/email/" + emailCliente).then((res) => {
    try {
      localStorage.setItem("idCliente", JSON.stringify(res.data.user._id));
      setCustomer(res.data.user.nome)
     // window.location.reload();
    } catch (error) {
    }
  });
})

 
   
  
    
const {id} =useParams()

var idClienteString= localStorage.getItem("idCliente")
  var costumerString = localStorage.getItem("costumer")

var idCliente = JSON.parse(idClienteString)
  var costumer = JSON.parse(costumerString)
   
 // fazer comprar
  const data = {
    costumer: costumer,
    idCliente: idCliente,
    status: "pago",
    itemComprado: itemComprado,
    valorTotal: valorTotal,
    cep: cepIn,
    rua: ruaIn,
    numero: numeroIn,
    complemento: complementoIn,
    bairro: bairroIn,
    cidade: cidadeIn,
    estado: estadoIn,

  }

const handleSubmit=((e)=>{
    e.preventDefault()

    axios.post("http://localhost:4000/order", data).then((res) => {

      if (res.status === 200) {
        localStorage.removeItem("cart")
        navigate('/obrigado')
      }

    });
    
});
    
  
  


    const [item, setItem] = useState([])
    const url="http://localhost:5000/product/"
    const url2="http://localhost:4000/"


     
    useEffect(()=>{
  
        listItem()
        listBebida()


      },[])

      const listItem=()=>{
        axios.get(`${url}${id}`).then((response) => {
            // setItem(response.data);
            
        });

      }

 
      const [beb, setBeb] = useState([])

      const url3="http://localhost:4000/bebidas"
     
  
        const listBebida=()=>{
          axios.get(`${url3}`).then((response) => {
            setBeb(response.data);
              
          });
        }


 
 
    return(
        <>
        <HeaderCardapio/>
       
       
        {/* section login  */}

        
        <section id={userLogin}>

          <div className="linksBackPedidos">
            <div className="linksLogin">
              {
                logIn ?
              <div className="formPedidos">
                <div className="titlePedido">Entrar com e-mail e senha</div>
                <form onSubmit={btnLogin}>
                  <div className="formItens">
                    <div>
                      <label>Email</label>
                      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                      <label>Senha</label>
                      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>


                  <input className="btnPedido" type="submit" value="login" />
                </form>
                <span className="login_info" onClick={handleLogin}>Não tem uma conta? Cadastre-se</span>
              </div>
                  : null
              }

              {
                logOut ?

              <div className="formPedidos">
                <div className="titlePedido">QUERO ME CADASTRAR</div>
                {error && <div style={{ color: "red" }}>cliente já tem cadastro</div>}
                <form onSubmit={handleSubmit2}>
                  <div className="formItens">

                    <div className="formItens">
                      <div>
                        <label>Nome</label>
                        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="nome" required />
                      </div>
                      <div>
                        <label>E-mail</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                      </div>
                    </div>

                  </div>
                  <div className="formItens">
                    <div>
                      <label>Cpf</label>
                      <input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="cpf" />
                    </div>
                    <div>
                      <label>Telefone</label>
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
                      <label>Cidade</label>
                      <input value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="palhoça" required />
                    </div>


                    <div className='formInput'>
                      <div className='compraFormContent numerInput1'>
                        <label>Estado</label>
                            <select value={estado} onChange={(e) => setEstado(e.target.value)} className="select">
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
                <span className="login_info" onClick={handleLogout}>Entrar com e-mail e senha</span>
              </div>
                  : null
              }

            </div>
          </div>
        </section>
        
        {/* section checkout  */}

<section className='compraBases' id={userOrder}>
          {
            customer !== "" ? <small className='username'>Olá {customer}</small> : null
          }
      <div className='compraContent'>

      <div className='compraForm'>

         <form onSubmit={handleSubmit} className="formabase1">
          <div className='formdados'>
          <h2>ENDEREÇO DE ENTREGA</h2>
      <div className='formInput'>
      <div className='compraFormContent'>
        <label>Rua</label>   
        <input value={ruaIn} onChange={(e)=>setRuaIn(e.target.value)} placeholder="rua caraúna" required/>
       </div>
        
       <div className='compraFormContent'>
       <label>Cep</label>
        <input value={cepIn} onChange={(e)=>setCepIn(e.target.value)} placeholder="88131740" required/>
       </div>

      </div>
        
     <div className='formInput'>
     <div className='compraFormContent'>
        <label>Bairro</label>
        <input value={bairroIn} onChange={(e)=>setBairroIn(e.target.value)} placeholder="bela vista" required/>
      </div>
        
       <div className='compraFormContent'>
       <label>Cidade</label>
        <input value={cidadeIn} onChange={(e)=>setCidadeIn(e.target.value)} placeholder="palhoça" required/>
       </div>
     </div>
       
     <div className='formInput'>
     <div className='compraFormContent'>
                      <label>Estado</label>
                      <select value={estadoIn} onChange={(e) => setEstadoIn(e.target.value)} className="select">
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
       

      <div  className='formInput'>
      <div className='compraFormContent numerInput1'>
        <label>Numero</label>
        <input value={numeroIn} onChange={(e)=>setNumeroIn(e.target.value)} placeholder="65" required/>
      </div>
       
        <div className='compraFormContent numerInput2'>
        <label>Complemento</label>
        <input value={complementoIn} onChange={(e)=>setComplementoIn(e.target.value)} placeholder="apto 2" required/>
        </div>
      </div>
     </div>

     {/* card-cartao */}
     <div className='pagamento'>
      <div className='titlePagamento'>pagamento</div>
      <div className='aviso'>Preencha os dados do seu Cartão</div>

      <div className='pagamentoInput'>
        <label>Número do Cartão</label>
        <input type="text"/>
      </div>

      <div className='pagamentoInput'>
        <label>Nome do Titular do Cartão</label>
        <input type="text"/>
      </div>

      <div className='pagamentoInput2'>
      <div className='pagamentoInput'>
        <label>Vencimento</label>
        <input type="text"/>
      </div>
      <div className='pagamentoInput'>
        <label>Código de segurança</label>
        <input type="text"/>
      </div>

      </div>

     </div>
      
     </div> 


   {/* adicinal item */}
       
      
        <div className='formdados dados2'>

        <input type="submit" className="btnFormCompra" value="Pagar agora"/>
        </div>
      
       
    </form>

    </div>

            {/* remumo do pedido */}
<div className='resumo'>
    <div className=''>

      <div className='titleCompra'>RESUMO DO PEDIDO</div>

    <div className="infoCompra">
                <div className='infoCompraItems'>
                  {


                    carts && carts.map((dados) => (

                      <div className="cardBaseCompra">
                        <div className="cardImgCompra" key={dados.idPedido}>
                          <img src={url2 + dados.file} alt={url2 + dados.file} />
                          <h3>{dados.nome}</h3>

                        </div>

                        <div className="cardTextCompra">
                          <input type="hidden" value={valor} onChange={(e) => setValor(e.target.value)} />
                          <div className="texts">{dados.description.slice(0, 40) + "..."}</div>
                          <div className="cardPrecoCompra">
                          

                            <input type="hidden" value={valor === "" ? setValor(Number(dados.preco)) : null} onChange={(e) => setValor(e.target.value)} />

                            <div className="precoCompra">{dados.qty} <span className="por"> x </span> R$ {dados.preco}</div>
                            <div><button onClick={(e) => handleDelete(dados)}>-</button> <button onClick={(e) => handleAdd(dados)}>+</button></div>
                          </div>




                        

                        </div>



                      
                      </div>

                    ))
                  }
                </div>
                {carts.length > 0 ? <div className="precoCompra">Subtotal: R$ {Number(total + total2).toFixed(2)}</div> : null}

    </div>
   </div>

      <div className='adicional'>
        <div className='adicionalTitle'>Adicional</div>


        <div className='adicionalContent'>

          {

            beb.map((dado, index) => (

              <div className='adicinalCard' key={index}>
                <div>{dado.nome}</div>


                <div className='btnPrecoAdicional'>
                  <div className='preco'>R$ {dado.preco}</div>
                  <div className='btnAdicional'>


                    <div className="btn" onClick={(e) => handleAdd(dado)}><span>adicionar</span></div>



                  </div>

                </div>




              </div>

            ))

          }
        </div>




      </div>
</div>
    </div>
</section>
     <Cart />
    <Footer/>
       
        </>
    )
}