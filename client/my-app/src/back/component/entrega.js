

import HeaderPedido from "./headerPedido"

import "../styles/links.css"


export default function Entrega(){


    return(
        <>
        <HeaderPedido/>
        <div className="links">
        <ul className="linkContent">
          <li><a href="/admin/dashboard/andamento">em aberto</a></li>
          <li><a href="/admin/dashboard/preparo">em preparo</a></li>
          <li className="ativo"><a href="/admin/dashboard/entrega">em entrega</a></li>
          <li><a href="/admin/dashboard/historico">históricos</a></li>
         
        </ul>
      </div>
        <h2>pedidos entregado</h2>
        </>
    )
}