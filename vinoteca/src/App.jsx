import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import UsuarioRegistro from "./pages/UsuarioRegistro";

const  App = () => {
  return (
    <>
      
      <Routes>
        <Route path="/usuario-registro" element={<UsuarioRegistro />} />
      </Routes>
    </>
  );
}

export default App;
