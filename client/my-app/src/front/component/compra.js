import axios from 'axios';
import { useState,useEffect } from 'react';
import { createName } from './api';
import { useParams } from 'react-router-dom';

import HeaderCardapio from "./headerCardapio"

export default function Compra(){

   
  

    const [nome, setNome] = useState("")
    
   
  
    const data={
        nome: nome
      
    }
       


    const handleSubmit=((e)=>{
        e.preventDefault()

      
console.log(data)
            createName(data).then((res)=>{
               
          
                
            }).catch((error)=>{
               
                if(error.response.data === 400) console.log(error.response.data)
            })
        
       
    })

 


    return(
        <>
        <HeaderCardapio/>

     
         <h2 className="">adicionar usuário</h2>
        

      
         <form onSubmit={handleSubmit}>
        <input value={nome} setNome={setNome} onChange={(e)=>setNome(e.target.value)}/>
        <br/> <br/>

      
        <input type="submit" className="btnAtion1 btnAtion"/>
        
    </form>
        
       
        </>
    )
}