
import React,{useEffect,useState} from "react"
import {useNavigate} from 'react-router-dom';


// import "./style/meusPedidos.css"

export default function Login(){

    
    const [nome, setNome]=useState("")
    const [senha, setSenha]=useState("")

    // if(cpf==""){
    //     localStorage.removeItem("cpf")
    //   }

    const navigate = useNavigate();

  
    useEffect(()=>{
        if(localStorage.getItem('senha')){
            navigate('/admin/dashboard')
        }

    },[])


    function login(e){
    e.preventDefault()
    let item ={nome, senha}

    console.log(item)
   fetch("http://localhost:5000/login",{
    method:"post",
    headers:{
        "Content-type":"application/json",
        "Accept":"application/jason"
    },
    body: JSON.stringify(item)
   }).then(result=> result.json())

    .then(result=>{
     
            
            localStorage.setItem("senha",JSON.stringify(result[0].senha))
            navigate('/admin/dashboard')
         
            console.log(result)
            if(result===400){
                console.log(result)
            }
            console.log(result)
            
        
    })  
   

   }


    return(
        <>
     

      <div className="linksBackPedidos">
         <div className="links">
            <div className="formPedidos">
            <div style={{textAlign:"center", fontSize:"50px", fontWeight:"800", textTransform:"uppercase",color:"red",marginBottom:"10px"}}>Menu</div>
                <div className="titlePedido">painel administrativo</div>
                <form onSubmit={login}>
                <div className="formItens">
                  <div>
                    <label>nome</label>
                    <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                   </div>
                <div>
                    <label>senha</label>               
                    <input type="password" value={senha} onChange={(e)=>setSenha(e.target.value)}/>
                </div>
                </div>
             

                <input className="btnPedido" type="submit" value="entrar"/>
                </form>
            </div>

         </div>
         </div>

        
        
        </>
    )
}