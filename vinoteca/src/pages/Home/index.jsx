import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listarProductos } from "../Home/productoSlice";
import CardProducto from "../../componente/CardProducto";

import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, rol } = useSelector((state) => state.login);
  const { productosDisponibles } = useSelector((state) => state.producto);
  console.log("Productos disponibles:", productosDisponibles);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token && rol) {
      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);
    }
  }, [token, rol]);

  useEffect(() => {
    dispatch(listarProductos());
  }, [dispatch]);

  return (
   <div>
     <div className="container categories">
          <h2 className="my-4 categories__title">Categorias</h2>
    </div>
    <Container
      fluid
      className="home-container d-flex align-items-center justify-content-center position-relative"
    > 
       
      {productosDisponibles.length === 0 ? (
        <p className="text-center">
          No hay productos disponibles actualmente.
        </p>
      ) : (
        <div className="productos-grid">
          {productosDisponibles.map((producto) => (
            <CardProducto
              key={producto._id}
              id={producto._id}
              marca={producto.marca}
              tipo={producto.tipo}
              descripcion={producto.descripcion}
              cosecha={producto.cosecha}
              precio={producto.precio}
              fotos={producto.fotos}
            />
          ))}
        </div>
      )}

      {rol === "administrador" && (
        <Link
          to="/producto-registro"
          className="position-absolute bottom-0 end-0 mb-4 me-2"
        >
          <Button className="btn-wine">+</Button>
        </Link>
      )}
    </Container>
   </div>
  );
};

export default Home;
