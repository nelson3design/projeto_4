
import "../styles/header.css"
import { MdOutlineRestaurant } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";





export default function HeaderPedido(){

  

    return(
      <>
        <header className="headerBack">
            <nav className="nav container">
                <a className="logoBack" href="http://localhost:3000/admin/dashboard">menu</a>
                

                <ul className="navlistBack">
                   
                    <li><a href="http://localhost:3000/admin/dashboard"><MdOutlineRestaurant/> <span>cardapio</span></a></li>
                    <li className="ative"><a href="http://localhost:3000/admin/dashboard/andamento"><FaClipboardCheck/> <span>pedidos</span></a></li>



                </ul>
            </nav>

        </header>
       
       


       
      </>
    )
}

