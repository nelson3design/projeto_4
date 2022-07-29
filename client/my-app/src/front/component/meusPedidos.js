import React,{useEffect,useState} from "react"
import {useNavigate} from 'react-router-dom';

import Footer from "./footer"
import "./style/meusPedidos.css"

import HeaderPedido from "./headerPedido"


export default function MeusPedidos(){

    const [nome, setNome]=useState("")
    const [cpf, setCpf]=useState("")

    if(cpf===""){
        localStorage.removeItem("cpf")
      }

    const navigate = useNavigate();

  
    useEffect(()=>{
        if(localStorage.getItem('cpf')){
            navigate('/pedido')
        }

    },[])


   async function login(){
    let item ={nome, cpf}
   let result= await fetch("http://localhost:5000/clientes",{
    method:"post",
    headers:{
        "Content-type":"application/json",
        "Accept":"application/jason"
    },
    body: JSON.stringify(item)
   });

     result = await result.json()
     localStorage.setItem("cpf",JSON.stringify(result[0].cpf))
     navigate('/pedido')

     console.log(result)
   }




    return(
        <>
           <HeaderPedido/>
            <div className="linksBackPedidos">
         <div className="links">
            <div className="formPedidos">
                <div className="titlePedido">acesse o seu pedido</div>
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
             

                <input className="btnPedido" type="submit" value="acessar"/>
                </form>
            </div>

         </div>
         </div>

         <Footer/>
        </>
    )
}