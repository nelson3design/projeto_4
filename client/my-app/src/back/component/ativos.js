
import HeaderPedido from "./headerPedido"

import "../styles/links.css"
import Image1 from "../assets/imageteste.jpg"
import "../styles/ativos.css"



export default function Ativos(){


    return(
        <>
        <HeaderPedido/>

        <div className="baseContent">

        <div className="links">
        <ul className="linkContent">
          <li className="ativo"><a href="/admin/dashboard/andamento">em aberto</a></li>
          <li><a href="/admin/dashboard/preparo">em preparo</a></li>
          <li><a href="/admin/dashboard/entrega">em entrega</a></li>
          <li><a href="/admin/dashboard/historico">históricos</a></li>
         
        </ul>
      </div>
       
     <section className="baseItens">
        <div className="caixa">
            <div className="caixaImg">
                <img src={Image1}/>
            </div>
            <div className="descrip">Coxa e sobrecoxa empanados ao estilo ame...</div>
            <div className="info">
                <div><span>Cliente:</span> <span>nelson</span></div>
                <div><span>Valor:</span> <span>R$ 22.90</span></div>
                <div><span>Pedido:</span> <span>#59233</span></div>
                <div><span>Quant:</span> <span>1</span></div>
                <div><span>Pago:</span> <span>sim</span></div>
                <div>
                    <span>Endereço:</span> 
                </div>
                <p className="endereco">rua caraúna 86, bela vista Palhoça, 88137626</p>

            </div>

            <div className="btns">
                <button>confirmar</button>
                <button>cancelar</button>
            </div>

        </div>
     </section>

        </div>

        </>
    )
}