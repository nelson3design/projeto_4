import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./front/component/header"
import './App.css';

import BackList from "./back/list";
import BackCreate from "./back/create";
import BackUpdate from "./back/update"



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header/>}></Route> 

        <Route path="/admin/dashboard" element={<BackList/>}></Route> 
         <Route path="/admin/dashboard/create" element={<BackCreate/>}></Route>
         <Route path="/admin/dashboard/update/:id" element={<BackUpdate/>}></Route>    
       
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
