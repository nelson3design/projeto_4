
import HeaderCardapio from "./headerCardapio"
import Footer from "./footer"
import "./style/obrigado.css"
import { MdCheckCircle } from "react-icons/md";




export default function Obrigado(){


    return(
        <>

        <HeaderCardapio/>
          <div className="baseContent pageObrigado">
              <div className="baseItens">


              <div className="modalObrigado">
                <div className="iconObrigado"><MdCheckCircle/></div>

                <div className="titleObrigado">Pedido confirmado</div>
                <div className="obrigado">Obrigado</div>
                <div className="avisoObrigado">Seu pedido foi realizado com sucesso. Agora falta pouco para receber seu produto</div>

              </div>


              </div>
          </div>

          <Footer/>
        </>
    )
}