import React, { useEffect, useState } from "react";
import axios from "axios"
import HeaderPedido from "./headerPedido"
import { useNavigate } from 'react-router-dom';
import "../styles/links.css"

import "../styles/ativos.css"



export default function Preparo() {
  const navigate = useNavigate();

  const [order, setIOrder] = useState([])
  const url = "http://localhost:4000/active"
  const url2 = "http://localhost:4000/"

  useEffect(() => {
    if (localStorage.getItem("idAdmin")) {
      //navigate('/admin/andamento')
    } else {
      navigate('/admin/login')
    }
    listItem()

  }, [])



  const listItem = () => {
    axios.get("http://localhost:4000/order/preparado").then((response) => {
      setIOrder(response.data);
      console.log(response.data)

    });
  }

  //   console.log(item[0].idPedido)



  const handlePreparar = (_id) => {
var id ={
  id:_id
}
    axios.post(url2+"preparar/",id).then((response)=>{
      console.log(response)
      listItem()
    })
  }
  const handleTerminar = (_id) => {
    var id = {
      id: _id
    }
    axios.post(url2+"terminar/",id).then((response)=>{
        console.log(response)
        listItem()
      })
  }


  return (
    <>
      <HeaderPedido />

      <div className="baseContent">

        <div className="links">
          <ul className="linkContent">
            <li><a href="/admin/dashboard/andamento">em aberto</a></li>
            <li className="ativo"><a href="/admin/dashboard/preparo">em preparo</a></li>
            <li><a href="/admin/dashboard/entrega">em entrega</a></li>
            <li><a href="/admin/dashboard/historico">históricos</a></li>

          </ul>
        </div>


        <section className="baseItens">


          <>

            <div className="caixa">

              <div>
                {order.map((order, index) => (
                  <>
                    <div>Status: {order.status}</div>
                    <div>Confirmado: {order.confirmar}</div>
                    <div>Cancelado: {order.cancelar}</div>
                    <div>Preparado: {order.preparar}</div>
                    <div>Terminado: {order.terminar}</div>
                    <div>Entregado: {order.entregar}</div>
                    <div>Finalizado: {order.finalizar}</div>

                    {order.pedido.map((pedido, index) => (
                      pedido.itemComprado.map((cart) => (
                        <>
                          <img src={url2 + cart.file} alt={url2 + cart.file} />
                          <div>Nome: {cart.nome}</div>
                          <div>Categoria: {cart.categoria}</div>
                          <div>Description: {cart.description}</div>
                          <div>Quantidade: {cart.qty}</div>
                          <div>Preço: {cart.preco}</div>
                        </>
                      ))

                    ))}

                    {order.pedido.map((pedido, index) => (
                      pedido.bebidas.map((cart) => (
                        <>
                          <img src={url2 + cart.file} alt={url2 + cart.file} />
                          <div>Nome: {cart.nome}</div>
                          <div>Categoria: {cart.categoria}</div>
                          <div>Description: {cart.description}</div>
                          <div>Quantidade: {cart.qty}</div>
                          <div>Preço: {cart.preco}</div>

                        </>
                      ))

                    ))}

                    {order.pedido.map((pedido, index) => (
                      pedido.entrega.map((cart) => (
                        <>
                          <div>Rua: {cart.rua}</div>
                          <div>CEP: {cart.cep}</div>
                          <div>Numero: {cart.numero}</div>
                          <div>Complemento: {cart.complemento}</div>
                          <div>Bairro: {cart.bairro}</div>
                          <div>Cidade: {cart.cidade}</div>
                          <div>Estado: {cart.estado}</div>

                        </>
                      ))

                    ))}

                    {order.pedido.map((pedido, index) => (

                      <div>Valor Total: {pedido.valorTotal}</div>
                    ))}

                    <div className="btns">
                      <button className="confirmar" onClick={() => handlePreparar(order._id)}>preparar</button>
                      <button className="cancelar" onClick={() => handleTerminar(order._id)}>terminar</button>
                    </div>
                  </>

                ))}
              </div>

            

            </div>

          </>

        </section>

      </div>

    </>
  )
}

