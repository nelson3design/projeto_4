
import React ,{useState,useEffect} from "react";
import Footer from "./footer";
import axios from 'axios'
import "../styles/list.css"
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import { FaUserCircle,FaCaretDown } from "react-icons/fa";




function List(){
    const navigate = useNavigate();

    const [item, setItem] = useState([])
    const [value, setValue] = useState([])

    const url="http://localhost:5000/"
    const url2="http://localhost:5000/login/"

    var cpfstring= localStorage.getItem("senha")

  var senha= cpfstring.slice(1,-1)

  useEffect(()=>{
    if(localStorage.length < 0){
        navigate('/admin/login')
    }

},[])

  
console.log(senha)

    useEffect(()=>{

        listItem()
         
      },[])

      const listItem=()=>{
        axios.get(`${url2}${senha}`).then((response) => {
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


       // paginação

       const [itensPerPage, setItensPerPage]=useState(8)

       const [currentPage, setCurrentPage]=useState(0)


       const pages= Math.ceil(item.length / itensPerPage)
       const startIndex= currentPage * itensPerPage
       const endIndex= startIndex + itensPerPage
       const currentItens = item.slice(startIndex,endIndex)



       const [logout, setLogout]= useState(false)

if(senha===""){
  localStorage.removeItem("senha")
}

if(logout){
  localStorage.removeItem("senha")
  navigate('/admin/login')
}

const handlelogout =()=>{
  setLogout(true)
}



       const [profile , setProfile]= useState(false)

       let className='profileContentUser'
     
       if(!profile){
           className = "hideProfileContent"
       }
     
     
       const handleShow = ()=>{
         setProfile(!profile)
       }
     

    return(
        <>
        <div className="listas">

        <div className="listasContent container">

        <div className="infoClienteMobile">
     
     {
            
            item && item.slice(-1).map((dados)=>(
              <div>

              <div className="profile profileUser">
              <div className="avatar"><FaUserCircle className="iconProfile"/> <span>{dados.nomeUser}</span></div> <FaCaretDown onClick={handleShow} style={{cursor: "pointer"}}/>
              </div>

             
            
               
               <div className={className}>
         
                <div className="profileItem"><div>Nome: </div><span>{dados.nomeUser}</span></div>
                
                 <div onClick={handlelogout} className="sair">Sair</div>
               </div>
            

               </div>
     
          ))
            }
     </div>

        
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
              
              currentItens && currentItens.map((dados)=>(
                    
                     <tr key={dados.id}>  
                    <td data-label="Imagem"><img src={url+dados.image} width="60px" alt=""/></td>
                    <td className="Nome" data-label="Nome">{dados.nome}</td>
                    <td className="Description" data-label="Description">{dados.description.length < "30" ? dados.description: dados.description.slice(0,25)+"..." }</td>
                    <td data-label="Preço">{"R$ "+dados.preco}</td>
                    <td className="Categoria" data-label="Categoria">{dados.categoria}</td>
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

        <div className="paginationBase">
                    {Array.from(Array(pages), (itens, index)=>{
                        return <button style={ index == currentPage ? {background: "red",color:"white"}: null} value={index} onClick={(e)=>setCurrentPage(Number(e.target.value))}>{index + 1}</button>
                    })}
                </div>
        </div>
        </div>
        <Footer/>
        </>
    )

}

export default List