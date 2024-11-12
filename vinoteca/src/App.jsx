import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import UsuarioRegistro from "./pages/UsuarioRegistro";
import Login from "./auth/Login"

const  App = () => {
  return (
    <>
      
      <Routes>
        <Route path="/usuario-registro" element={<UsuarioRegistro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
