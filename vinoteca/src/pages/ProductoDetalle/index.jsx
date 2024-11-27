import { useEffect } from "react";
import { Button, Row, Col, Carousel, Badge } from "react-bootstrap";
import { BsWhatsapp } from "react-icons/bs";
import "./productoDetalle.scss";
import { useDispatch, useSelector } from 'react-redux';
import {productoID} from "../Home/productoSlice";
import { useParams } from 'react-router-dom';

const ProductoDetalle = () => {
  const { productoSeleccionado, loading, error } = useSelector((state) => state.producto);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productoID(id));
  }, [dispatch, id]);

  // Comprobamos el estado de carga
  if (loading) {
    return <div>Cargando producto...</div>; // O puedes usar un spinner aquí
  }

  // Si hay un error, muestra un mensaje de error
  if (error) {
    return <div>Error al cargar el producto: {error}</div>;
  }

  // Si productoSeleccionado es nulo o indefinido, no accedemos a sus propiedades
  if (!productoSeleccionado) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <div className="producto-detalle">
      <Row>
        <Col md={6} className="producto-imagenes">
          <Carousel>
            {productoSeleccionado.fotos && productoSeleccionado.fotos.length > 0 ? (
              productoSeleccionado.fotos.map((foto, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={foto}
                    alt={`Producto ${index + 1}`}
                    style={{
                      maxHeight: "500px", // Fija la altura máxima de las imágenes
                      objectFit: "cover", // Ajusta cómo se recortan las imágenes
                    }}
                  />
                </Carousel.Item>
              ))
            ) : (
              <div>No hay imágenes disponibles</div> // Si no hay fotos
            )}
          </Carousel>
        </Col>
        <Col md={6} className="product-info">
          <h1 className="product-brand">{productoSeleccionado.marca}</h1>
          <h2 className="product-type">{productoSeleccionado.tipo}</h2>
          <p className="product-price">${productoSeleccionado.precio.toLocaleString()}</p>
          <p className="product-description">{productoSeleccionado.descripcion}</p>
          <div className="product-actions">
            <Button className="add-to-cart">Añadir al carrito</Button>
            <Button className="contact-button" href="https://wa.me/+5491165495756?text=Hola,%20estoy%20interesado%20en%20el%20producto%20" target="_blank">
              <BsWhatsapp size={40} style={{ color: "#800020" }} />
            </Button>
          </div>
          <div className="product-details">
            <h5>Detalles adicionales</h5>
            <ul>
              <li>Cosecha: {productoSeleccionado.cosecha}</li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductoDetalle;

