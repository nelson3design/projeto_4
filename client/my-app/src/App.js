import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import { useState } from "react";
import Start from "./front/component/start"
import './App.css';

import BackList from "./back/list";
import BackCreate from "./back/create";
import BackUpdate from "./back/update"
import Cardapio from "./front/component/cardapio";
import MeusPedidos from "./front/component/meusPedidos";

import Compra from "./front/component/compra";
import Pedidos from "./back/pedidos";


import Ativos from "./back/component/ativos";
import Preparo from "./back/component/preparo";
import Entrega from "./back/component/entrega";
import Historico from "./back/component/historico";


function App() {



  return (
    <>
    <BrowserRouter>

      <Routes>

        {/* front-end */}

        <Route path="/" element={<Start/>}></Route> 
        <Route path="/cardapio" element={<Cardapio/>}></Route> 
        <Route path="/meus-pedidos" element={<MeusPedidos/>}></Route> 
         <Route path="/comprar/:id" element={<Compra/>}></Route>  
     

        {/* back-end */}
        
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
