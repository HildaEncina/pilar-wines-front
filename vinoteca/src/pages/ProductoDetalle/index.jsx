import { Button, Row, Col, Carousel, Badge } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';


const ProductoDetalle = ({ producto }) => {
  return (
    <div className="producto-detalle">
      <Row>
        <Col md={6} className="product-images">
          <Carousel>
            {producto.fotos.map((foto, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={foto}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6} className="product-info">
          <h1 className="product-brand">{producto.marca}</h1>
          <h2 className="product-type">{producto.tipo}</h2>
          <p className="product-price">${producto.precio.toLocaleString()}</p>
          <p className="product-description">{producto.descripcion}</p>

          <div className="product-actions">
            <Button variant="dark" className="add-to-cart">
              Añadir al carrito
            </Button>
            <Button
              variant="success"
              className="contact-button"
              href="https://wa.me/?text=Hola,%20estoy%20interesado%20en%20el%20producto%20"
              target="_blank"
            >
              <FaWhatsapp size={20} />
            </Button>
          </div>

          <div className="product-details">
            <h5>Detalles adicionales</h5>
            <ul>
              <li>Cosecha: {producto.cosecha}</li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};


export default ProductoDetalle;