
import React ,{useState,useEffect} from "react";

import axios from 'axios'

import {Link} from 'react-router-dom'

function List(){

    const [item, setItem] = useState([])
    const url="http://localhost:5000/"

    useEffect(()=>{
  

        listItem()
         
      },[])

      const listItem=()=>{
        axios.get(`${url}`).then((response) => {
            setItem(response.data);
            
        });
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
        <h2 className="title">lista de usuários</h2>
        <Link to="/admin/dashboard/create" className="btnAdd">Adicionar item</Link>
         <br/><br/>

         {/* <form onSubmit={handleSearch}>
            <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} className="pes"/>
            <input type="submit" value="pesquisar" className="btnPes"/>
         </form> */}

        <br/>
         <table border="1px" width="100%">
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
            {
              
              item && item.map((dados)=>(
               <tbody key={dados.id}>
                    
                <tr>  
            <td data-label="Nome"><img src={url+dados.image} width="60px" alt=""/></td>
                    <td data-label="Email">{dados.nome}</td>
                    <td data-label="Contato">{dados.description}</td>
                    <td data-label="Contato">{dados.preco}</td>
                    <td data-label="Contato">{dados.categoria}</td>
                    <td data-label="Contato">{dados.destaque}</td>

                    <td data-label="Ações">
                        <Link to={`/admin/dashboard/update/${dados.id}`}>
                           <button className="btnAtion1 btnAtion">Editar</button>
                        </Link>
                
                       
                        <button onClick={()=>handleRemove(dados.id)} className="btnAtion2 btnAtion">Excluir</button>
                    </td>
                </tr>
            </tbody>
            ))
          
            
            }

        </table>
        </>
    )

}

export default List