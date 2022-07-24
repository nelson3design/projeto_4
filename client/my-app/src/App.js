import { BrowserRouter, Routes, Route } from "react-router-dom";

import Start from "./front/component/start"
import './App.css';

import BackList from "./back/list";
import BackCreate from "./back/create";
import BackUpdate from "./back/update"
import Cardapio from "./front/component/cardapio";
import MeusPedidos from "./front/component/meusPedidos";

import Compra from "./front/component/compra";

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
       
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
