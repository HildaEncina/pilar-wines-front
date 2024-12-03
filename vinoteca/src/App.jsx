import { Routes, Route, useParams } from "react-router-dom";
import StartedScreen from './Pages/StartedScreen';
import UsuarioRegistro from "./pages/UsuarioRegistro";
import Login from "./auth/Login"
import ProductoRegistro from "./pages/ProductoRegistro";
import Home from './Pages/Home';
import HomeLayout from './layouts/HomeLayout';
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";



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
        <Route path="/carrito" element={<Carrito />} />

      </Routes>
    </>
  );
}

export default App;
