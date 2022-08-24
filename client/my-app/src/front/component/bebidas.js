import React,{useEffect,useState,useContext} from "react";
import axios from "axios";
import HeaderCardapio from "./headerCardapio"
import "./style/cardapio.css"
import { Link } from "react-router-dom";
import Footer from "./footer";
import { CartContext } from "../context/context"

import Cart from "./cart";
export default function Bebidas(){

  const { carts, handleAdd, handleCart } = useContext(CartContext)

  
     const [item, setItem] = useState([])
    const url="http://localhost:5000/bebidas"
    const url2="http://localhost:5000/"

     useEffect(()=>{
  

        listItem()
         
      },[])

      const listItem=()=>{
        axios.get(`${url}`).then((response) => {
            setItem(response.data);
            
        });
      }


    return(
        <>
           <HeaderCardapio/>

      <div className="linksBack">
         <div className="links">
        <ul className="linkContentBack">
          <li><a href="/cardapio">hambúrguer</a></li>
          <li><a href="/pizza">pizza</a></li>
          <li className="ativo"><a href="/bebidas">bebidas</a></li>
         
        </ul>
        </div>
   <section className="baseItens">

        {
              
              item && item.map((dados)=>(
               
                      
              <div className="cardBase">
            <div className="cardImg">
                <img src={url2+dados.image} alt={url2+dados.image}/>
                <h3>{dados.nome}</h3>

            </div>

             <div className="cardText">
                {/* <div className="texts">{dados.description.slice(0,50)+"..."}</div> */}
                 <div className="texts">{dados.description.length < "30" ? dados.description: dados.description.slice(0,60)+"..." }</div>
                <div className="cardPreco">
                    <div className="preco">R$ {dados.preco}</div>
                   
                        <div className="btn" onClick={(e) => handleAdd(dados)}><span>comprar</span></div>
                </div>
                
            </div>

        </div>
              
       
            ))
              }
              </section>
              </div>
        <Cart />
              <Footer/>
        </>
    )
}