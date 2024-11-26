import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import StartedScreen from './Pages/StartedScreen';
import UsuarioRegistro from "./pages/UsuarioRegistro";
import Login from "./auth/Login"
import ProductoRegistro from "./pages/ProductoRegistro";
import Home from './Pages/Home';
import HomeLayout from './layouts/HomeLayout';
import CardProducto from "./componente/CardProducto";

const  App = () => {
  const producto = {marca:"Trapiche",
    tipo:"Malbec",
    cosecha: "2024",
    precio: 17000
  }
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

      </Routes>
    </>
  );
}

export default App;
