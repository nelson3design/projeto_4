import { useState } from "react";
import "./style.css"
import { MdSearch, MdStarOutline,MdOutlineRestaurant } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";
import Slide from './slide'
import Carrossel from "./carrossel"
import Footer from "./footer";





function Header(){

    const [showBarra, setShowBarra] = useState(false)

    const handleSearch =()=>{
        setShowBarra(!showBarra)
    }

    return(
      <>
        <header>
            <nav className="nav container">
                <div className="logo">menu</div>

                <ul className="navlist">
                    <li>
                        <form className="form">
                            {showBarra? <input className="barra" type="search"/>: null}
                            <div className="formContent" onClick={handleSearch}>
                           {showBarra ? null : <MdSearch className="iconSearch"/>   }

                            {showBarra ?  <span className="search">buscar</span> :  <span className="semBorder">buscar</span> }
                          
                            </div>
                        </form>
                    </li>

                    <li className="ative"><MdStarOutline className="star"/> <span>destaques</span></li>
                    <li><MdOutlineRestaurant/> <span>cardapio</span></li>
                    <li><FaClipboardCheck/> <span>meus pedidos</span></li>

                    

                </ul>
            </nav>

        </header>
        <Slide/>
        <div className="cardContent">
            <div className="CardItens container">
                <h2 className="title">Cardapio do dia</h2>
            <Carrossel/>
            </div>
           
        </div>


        <Footer/>
      </>
    )
}

export default Header