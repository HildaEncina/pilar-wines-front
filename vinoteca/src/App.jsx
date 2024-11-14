import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import UsuarioRegistro from "./pages/UsuarioRegistro";
import Login from "./auth/Login"
import ProductoRegistro from "./pages/ProductoRegistro";

const  App = () => {
  return (
    <>
      
      <Routes>
        <Route path="/usuario-registro" element={<UsuarioRegistro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/producto-registro" element={<ProductoRegistro />} />
      </Routes>
    </>
  );
}

export default App;
