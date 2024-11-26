import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import StartedScreen from './Pages/StartedScreen';
import UsuarioRegistro from "./pages/UsuarioRegistro";
import Login from "./auth/Login"
import ProductoRegistro from "./pages/ProductoRegistro";
import Home from './Pages/Home';
import HomeLayout from './layouts/HomeLayout';
import CardProducto from "./componente/CardProducto";
import ProductoDetalle from "./pages/ProductoDetalle";
import foto1 from "./assets/home-layout/botella.jpg";
import foto2 from "./assets/home-layout/botella.jpg";


const  App = () => {
  const producto = {marca:"Trapiche",
    tipo:"Malbec",
    cosecha: "2024",
    precio: 17000
  }
  const producto1 = {marca:"Trapiche",
    tipo:"Malbec",
    cosecha: "2024",
    precio: 17000,
    fotos: [foto1, foto2]}
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
        <Route path="/card-producto" element={<CardProducto marca={producto.marca}
        tipo={producto.tipo}
        cosecha={producto.cosecha}
        precio={producto.precio}
         />} />
        <Route path="/producto-detalle" element={<ProductoDetalle producto={producto1}/>} />

      </Routes>
    </>
  );
}

export default App;
