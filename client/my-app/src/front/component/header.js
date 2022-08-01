import { useState } from "react";
import "./style/header.css"
import { MdSearch, MdStarOutline,MdOutlineRestaurant } from "react-icons/md";
import { FaClipboardCheck,FaTimes,FaBars } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";


function Header(){
const url="http://localhost:5000/"
    const [showBarra, setShowBarra] = useState(false)

    const [hamb, setHamb] = useState(true)
    const [times, setTimes] = useState(false)

    const handleHamb =()=>{
      setTimes(!times)
      setHamb(!hamb)
    }
    const handleTimes =()=>{
      setHamb(!hamb)
       setTimes(!times)
    }


    let className='barra'

    if(!showBarra){
        className = "hideBarra"
    }

    const handleSearch =()=>{
        setShowBarra(!showBarra)
    }
  const [item, setItem] = useState([])
    const [value, setValue] = useState([])

       const handleSearch2= async (e)=>{
        e.preventDefault()
         return await axios 
         .get(`http://localhost:5000/item/?q=${value}`)
         .then((response)=>{
         
      
            setValue("")
            if(value==""){
              setValue("")
            }else{
              setItem(response.data)
            }
      
         })
        
    }


    return(
      <>
      
        <header>
            <nav className="nav container">
                <a href="http://localhost:3000/" className="logo">menu</a>
                <div className="menuMobile">

                   <form className="formMobile" onSubmit={handleSearch2}>
                          
                           <input className="" type="search" value={value} onChange={(e)=>setValue(e.target.value)}/>

                           <span className="searchMobile" onClick={handleSearch2}><MdSearch className=""/></span>
                                                    
                        </form>

                </div>

                <div className="iconMobile">
                  {hamb? <FaBars onClick={handleHamb} className="iconM"/> : null}
                 {times?  <FaTimes onClick={handleTimes} className="iconM"/> : null}
                </div>

                <ul className="navlist">
                    <li>
                        <form className="form" onSubmit={handleSearch2}>
                           
                            <input className={className} type="search" value={value} onChange={(e)=>setValue(e.target.value)}/>
                            <div className="formContent" onClick={handleSearch}>
                           {showBarra ? null : <MdSearch className="iconSearch"/>   }

                            {showBarra ?  <span className="search" onClick={handleSearch2}>buscar</span> :  <span className="semBorder">buscar</span> }
                          
                            </div>
                        </form>
                    </li>

                    <li className="ative"><a href="http://localhost:3000/"><MdStarOutline className="star"/> <span>destaques</span></a></li>
                    <li><a href="http://localhost:3000/cardapio"><MdOutlineRestaurant/> <span>cardápio</span></a></li>
                    <li><a href="http://localhost:3000/meus-pedidos"><FaClipboardCheck/> <span>meus pedidos</span></a></li>

                    

                </ul>
            </nav>

            {times?
                <ul className="mobileLinks">
                  <li className="ative"><a href="http://localhost:3000/"><MdStarOutline className="star"/> <span>destaques</span></a></li>
                    <li><a href="http://localhost:3000/cardapio"><MdOutlineRestaurant/> <span>cardápio</span></a></li>
                    <li><a href="http://localhost:3000/meus-pedidos"><FaClipboardCheck/> <span>meus pedidos</span></a></li>
                </ul>
             : null}
        </header>
        <div className="formSearch">
            <div className="formSearchContent">
            {
              
              item && item.map((dados)=>(
                <div className="formResponse">
               
                      <Link to={`/comprar/${dados.id}`} style={{textDecoration: "none"}} className="linkHover">
              <div className="cardBase">
            <div className="cardImg">
                <img src={url+dados.image} alt={url+dados.image}/>
                <h3>{dados.nome}</h3>

            </div>

             <div className="cardText">
                {/* <div className="texts">{dados.description.slice(0,50)+"..."}</div> */}
                 <div className="texts">{dados.description.length < "30" ? dados.description: dados.description.slice(0,60)+"..." }</div>
                <div className="cardPreco">
                    <div className="preco">R$ {dados.preco}</div>
                   
                    <div className="btn"><span>comprar</span></div>
                </div>
                
            </div>

        </div>
                </Link>
       </div>
            ))
              }
              </div>
        </div>
       
       


       
      </>
    )
}

export default Header