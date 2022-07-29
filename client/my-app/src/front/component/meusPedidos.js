import Footer from "./footer"
import "./style/meusPedidos.css"

import HeaderPedido from "./headerPedido"


export default function MeusPedidos(){


    return(
        <>
           <HeaderPedido/>
            <div className="linksBackPedidos">
         <div className="links">
            <div className="formPedidos">
                <div className="titlePedido">acesse o seu pedido</div>
                <form action="http://localhost:5000/clientes" method="POST">
                <div className="formItens">
                  <div>
                    <label>nome</label>
                    <input type="text"/>
                   </div>
                <div>
                    <label>cpf</label>               
                    <input type="number"/>
                </div>
                </div>

                <input className="btnPedido" type="submit" value="acessar"/>
                </form>
            </div>

         </div>
         </div>

         <Footer/>
        </>
    )
}