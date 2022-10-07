
import "./style/start.css"
import Header from "./header"
import Footer from "./footer"
import Slide from "./slide"
import Cart from "./cart"
import Carrossel from "./carrossel"


export default function Start(){


    return(
        <>
         <Header/>
         <Slide/>
         <div className="cardContent">
            <div className="CardItens container">
            <h2 className="title">Cardapio do dia</h2>
            <Carrossel/>
            </div>
           
        </div>
          <Cart />
         <Footer/>
        
        </>
    )
}