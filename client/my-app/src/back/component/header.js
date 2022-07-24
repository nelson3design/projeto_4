import { useState } from "react";
import "../styles/header.css"
import { MdSearch, MdStarOutline,MdOutlineRestaurant } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";
import { Link } from "react-router-dom";




function Header(){

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
        <header className="headerBack">
            <nav className="nav container">
                <a className="logoBack" href="http://localhost:3000/admin/dashboard">menu</a>
                

                <ul className="navlistBack">
                   
                    <li className="ative"><a href="http://localhost:3000/admin/dashboard"><MdOutlineRestaurant/> <span>cardapio</span></a></li>
                    <li><FaClipboardCheck/> <span>pedidos</span></li>

                    

                </ul>
            </nav>

        </header>
       
       


       
      </>
    )
}

export default Header