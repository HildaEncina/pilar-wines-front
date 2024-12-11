import { useEffect } from "react";
import { Typography } from "@mui/material";
import CardProducto from "../../componente/CardProducto";
import { useDispatch, useSelector } from "react-redux";
import { obtenerUsuarioPorId } from "../../auth/authSlice.js";
import "./favoritos-styles.scss";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Favoritos = () => {
  const { usuario, userId } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productos = usuario?.productos || [];

  useEffect(() => {
    if (userId) {
      dispatch(obtenerUsuarioPorId(userId));
    }
  }, [userId, dispatch]);

  const handleDetalle = (id) => {
    navigate(`/producto-detalle/${id}`);
  };

  if (productos.length === 0) {
    return (
      <div className="lista-productos">
        <Typography variant="h4" className="titulo-favoritos">
          Mis favoritos
        </Typography>
        <Typography variant="body1" className="sin-favoritos">
          No tienes productos en favoritos
        </Typography>
      </div>
    );
  }

  return (
    <Container className="home-container" style={{ padding: 0, margin: 0 }}>

      <Typography variant="h4" className="titulo-favoritos">
        Mis favoritos
      </Typography>
      <div className="productos-grid">
        {productos.map((producto) => (
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
    </Container>
  );
};

export default Favoritos;
