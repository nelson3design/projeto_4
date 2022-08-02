import { BrowserRouter, Routes, Route,Link } from "react-router-dom";

import Start from "./front/component/start"
import './App.css';

import BackList from "./back/list";
import BackCreate from "./back/create";
import BackUpdate from "./back/update"

import MeusPedidos from "./front/component/meusPedidos";

import Compra from "./front/component/compra";


import Login from "./back/component/login";
import Ativos from "./back/component/ativos";
import Preparo from "./back/component/preparo";
import Entrega from "./back/component/entrega";
import Historico from "./back/component/historico";

import Cardapio from "./front/component/cardapio";
import Pizza  from "./front/component/pizza";
import Bebidas from "./front/component/bebidas";

import Obrigado from "./front/component/abrigado";
import Pedido from "./front/component/pedido";

import Header from "./front/component/header";

function App() {



  return (
    <>
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>

        {/* front-end */}

        <Route exact path="/" element={<Start/>}></Route> 
        <Route path="/cardapio" element={<Cardapio/>}></Route> 
         <Route path="/pizza" element={<Pizza/>}></Route> 
          <Route path="/bebidas" element={<Bebidas/>}></Route> 
        <Route path="/meus-pedidos" element={<MeusPedidos/>}></Route> 
         <Route path="/comprar/:id" element={<Compra/>}></Route>  
         <Route path="/obrigado" element={<Obrigado/>}></Route>
         <Route path="/pedido" element={<Pedido/>}></Route>
     

        {/* back-end */}
        <Route path="/admin/login" element={<Login/>}></Route> 
         <Route path="/admin/dashboard" element={<BackList/>}></Route> 
         <Route path="/admin/dashboard/create" element={<BackCreate/>}></Route>
         <Route path="/admin/dashboard/update/:id" element={<BackUpdate/>}></Route>  
         <Route path="/admin/dashboard/andamento" element={<Ativos/>}></Route>  
         <Route path="/admin/dashboard/preparo" element={<Preparo/>}></Route>  
         <Route path="/admin/dashboard/entrega" element={<Entrega/>}></Route>  
         <Route path="/admin/dashboard/historico" element={<Historico/>}></Route>  
         
       
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
