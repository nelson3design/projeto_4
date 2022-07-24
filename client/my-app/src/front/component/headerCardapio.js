


import { useState } from "react";
import "./style/header.css"
import { MdSearch, MdStarOutline,MdOutlineRestaurant } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";




function HeaderCardapio(){

    const [showBarra, setShowBarra] = useState(false)

    let className='barra'

    if(!showBarra){
        className = "hideBarra"
    }

    const handleSearch =()=>{
        setShowBarra(!showBarra)
    }

    return(
      <>
        <header>
            <nav className="nav container">
                <a href="http://localhost:3000/" className="logo">menu</a>

                <ul className="navlist">
                    <li>
                        <form className="form">
                            {/* {showBarra? <input className={className} type="search"/>: null} */}

                            <input className={className} type="search"/>
                            
                            <div className="formContent" onClick={handleSearch}>
                           {showBarra ? null : <MdSearch className="iconSearch"/>   }

                            {showBarra ?  <span className="search">buscar</span> :  <span className="semBorder">buscar</span> }
                          
                            </div>
                        </form>
                    </li>

                    <li><a href="http://localhost:3000/"><MdStarOutline className="star"/> <span>destaques</span></a></li>
                    <li className="ative"><a href="http://localhost:3000/cardapio"><MdOutlineRestaurant/> <span>cardapio</span></a></li>
                    <li><a href="http://localhost:3000/meus-pedidos"><FaClipboardCheck/> <span>meus pedidos</span></a></li>

                    

                </ul>
            </nav>

        </header>
       
       


       
      </>
    )
}

export default HeaderCardapio