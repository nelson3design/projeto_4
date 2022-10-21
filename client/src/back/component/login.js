
import React,{useEffect,useState} from "react"
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
// import "./style/meusPedidos.css"

export default function Login(){

    
    const [nome, setNome]=useState("")
    const [password, setPassword]=useState("")

    const navigate = useNavigate();

  
    useEffect(()=>{
        if (localStorage.getItem('idAdmin')){
            navigate('/admin/dashboard')
        }

    },[])


    function login(e) {
        e.preventDefault()
        let item = { nome, password }

        if (item.nome === "") {
            console.log('user é obrigatorio')

        } else if (item.password === "") {
            console.log('password é obrigatorio')

        }
        else {

            axios.post("http://localhost:4000/admin/login", item).then((res) => {


                try {

                    localStorage.setItem("tokenAdmin", JSON.stringify(res.data.token));
                    localStorage.setItem("idAdmin", JSON.stringify(res.data.id));
                    navigate('/admin/dashboard')
                
                    console.log(item)
                } catch (error) {
                    console.log(error)

                }

            });
        }


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
                    <label>usuário</label>
                    <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                   </div>
                <div>
                    <label>senha</label>               
                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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