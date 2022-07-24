
import React ,{useState,useEffect} from "react";

import axios from 'axios'
import "../styles/list.css"
import {Link} from 'react-router-dom'

function List(){

    const [item, setItem] = useState([])
    const [value, setValue] = useState([])

    const url="http://localhost:5000/"

    useEffect(()=>{

        listItem()
         
      },[])

      const listItem=()=>{
        axios.get(`${url}`).then((response) => {
            setItem(response.data);
            
        });
      }


      const handleSearch= async (e)=>{
        e.preventDefault()
         return await axios 
         .get(`http://localhost:5000/item/?q=${value}`)
         .then((response)=>{
          setItem(response.data)
      
            setValue("")
      
         })
        
    }
  

       const handleRemove=(id)=>{
        if(window.confirm('tem certeza de excluir esse usuáorio')){
            axios.delete(`${url}delete-action/${id}`).then((response) => {
               
                listItem()
               
            });
        }
   }

    return(
        <>
        <div className="listas">

        <div className="listasContent container">

        
        <div className="btnBarPes">
            <Link to="/admin/dashboard/create" className="btnAdd">Adicionar item</Link>

         <form className="formPes" onSubmit={handleSearch}>
            <input className="barText" type="text" value={value} onChange={(e)=>setValue(e.target.value)}/>
            <input type="submit" value="pesquisar" className="btnPes"/>
         </form>
        </div>

        
         <table border="0px" width="100%" className="table">
            <thead className="thead">
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Categoria</th>
                    <th>Destaque</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody className="tbody">
            {
              
              item && item.map((dados)=>(
                    
                     <tr key={dados.id}>  
                    <td data-label="Imagem"><img src={url+dados.image} width="60px" alt=""/></td>
                    <td className="nome" data-label="Nome">{dados.nome}</td>
                    <td className="desc" data-label="Description">{dados.description.length < "30" ? dados.description: dados.description.slice(0,40)+"..." }</td>
                    <td data-label="Preço">{"R$ "+dados.preco}</td>
                    <td className="cat" data-label="Categoria">{dados.categoria}</td>
                    <td data-label="Destaque">{dados.destaque}</td>

                    <td data-label="Ações" className="action">
                        <Link to={`/admin/dashboard/update/${dados.id}`}>
                           <button className="btnAtion1 btnAtion">Editar</button>
                        </Link>
                
                       
                        <button onClick={()=>handleRemove(dados.id)} className="btnAtion2 btnAtion">Excluir</button>
                    </td>
                </tr>
            ))
          
            
            }
            </tbody>

        </table>
        </div>
        </div>
        </>
    )

}

export default List