import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import StartedScreen from './Pages/StartedScreen';
import UsuarioRegistro from "./pages/UsuarioRegistro";
import Login from "./auth/Login"
import ProductoRegistro from "./pages/ProductoRegistro";
import Home from './Pages/Home';
import HomeLayout from './layouts/HomeLayout';

import ProductoDetalle from "./pages/ProductoDetalle";
import foto1 from "./assets/home-layout/botella.jpg";
import foto2 from "./assets/home-layout/botella.jpg";


const  App = () => {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<StartedScreen />} />
        <Route path="/usuario-registro" element={<UsuarioRegistro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
        <HomeLayout><Home /></HomeLayout>}
      />
        <Route path="/producto-registro" element={<ProductoRegistro />} />
  
        <Route path="/producto-detalle/:id" element={<ProductoDetalle />} />

      </Routes>
    </>
  );
}

export default App;
