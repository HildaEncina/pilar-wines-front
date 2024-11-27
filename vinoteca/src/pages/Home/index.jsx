import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {listarProductos} from "../Home/productoSlice";
import CardProducto from "../../componente/CardProducto"; 

import "./home.scss";



const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Seleccionar datos del estado
  const { token, rol } = useSelector((state) => state.login);
  const {productosDisponibles} = useSelector((state) => state.producto); 
 
  useEffect(() => {
    dispatch(listarProductos());
  }, [dispatch]);

  // Verificar token y redirigir al login si no está presente
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

 
  
  

  return (
    <Container
      fluid
      className="home-container d-flex align-items-center justify-content-center position-relative"
    >
     
     { productosDisponibles.length < 1 ?
        ( <p className="text-center">No hay animales registrados <br /> actualmente</p>) :
        
        <div className="productos-grid">
        {productosDisponibles.map((producto) => {
  console.log("Este es el key:", producto._id); // Inspecciona el ID del producto aquí
  return (
    <CardProducto
      key={producto._id}
      id={producto._id}
      marca={producto.marca}
      tipo={producto.tipo}
      cosecha={producto.cosecha}
      precio={producto.precio}
      fotos={producto.fotos} // Pasar la lista de fotos al componente
    />
  );
})}

        </div>

     }
      {rol === "administrador" && (
        <Link
          to="/producto-registro"
          className="position-absolute bottom-0 end-0 mb-4 me-2"
        >
          <Button className="btn-wine">+</Button>
        </Link>
      )}
    </Container>
  );
};

export default Home;