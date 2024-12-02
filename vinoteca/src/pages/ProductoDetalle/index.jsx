import { useEffect } from "react";
import { Button, Row, Col, Carousel } from "react-bootstrap";
import { BsWhatsapp } from "react-icons/bs";
import "./productoDetalle.scss";
import { useDispatch, useSelector } from "react-redux";
import { productoID } from "../Home/productoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { crearCarrito, editarCarritoPorID, obtenerCarritoPorID } from "../Carrito/carritoSlice";
import axios from 'axios';

const ProductoDetalle = () => {
  /** Mi producto */
  const { productoSeleccionado, loading, error } = useSelector((state) => state.producto);

  /** ID Cliente */
  const { userId } = useSelector((state) => state.login);
  const { carritoActual: carrito } = useSelector((state) => state.carrito);
  const { carritoActual} = useSelector((state) => state.carrito);
  console.log("Carrito carrito acutal de producto detalle", carritoActual)
  

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productoID(id));
  if (carrito) {
    dispatch(obtenerCarritoPorID(carrito));
  }
}, [dispatch, id, carrito]);

// Agrega un log aquí para verificar el carritoActual
useEffect(() => {
  console.log("Carrito actual después de obtenerlo:", carrito);
}, [carrito]);

  if (loading) {
    return <div>Cargando producto...</div>;
  }
  if (error) {
    return <div>Error al cargar el producto: {error}</div>;
  }
  if (!productoSeleccionado) {
    return <div>No se encontró el producto.</div>;
  }

 
  const agregarAlCarrito = async () => {
      const productoAAgregar = {
          ...productoSeleccionado,
          cantidad: 1, 
      };
  
      if (!carrito) {
         
          const carritoData = {
              idUsuario: userId,
              cantidadProductos: 1,
              montoTotal: productoSeleccionado.precio,
              productos: [productoAAgregar], 
          };
  
          try {
              const nuevoCarrito = await dispatch(crearCarrito(carritoData)).unwrap();
              navigate("/home");
              console.log("Carrito creado con ID:", nuevoCarrito);
          } catch (err) {
              console.error("Error al crear el carrito:", err);
          }
      } else {
         
          console.log("Carrito antes de edicion:", carrito._id); 
          console.log("Producto Seleccionado", productoSeleccionado.precio)
        
        // try {
        //     console.log("Este es el producto seleccionado", productoSeleccionado)
        //     const response = await axios.put(
        //         `http://localhost:8082/api/carrito/editar/${carrito._id}`, productoSeleccionado
                
        //     );
        //     navigate("/home");
        //     console.log("Carrito actualizado:", response.data);
        // } catch (err) {
        //     console.error("Error al editar el carrito:", err.response ? err.response.data : err.message);
        // }
        
        try {
          console.log("Estoy dentro del try y soy un producto", productoSeleccionado.marca);
          console.log("Poducto id", productoSeleccionado._id)
          
          const carritoActualizado = await dispatch(
            editarCarritoPorID({
              id: carrito._id,
              camposParaActualizar: {
                producto: {
                  id: productoSeleccionado._id,
                  marca: productoSeleccionado.marca,
                  tipo: productoSeleccionado.tipo,
                  
                  descripcion: productoSeleccionado.descripcion,
                  cosecha: productoSeleccionado.cosecha,
                  precio: productoSeleccionado.precio,
                  fotos: productoSeleccionado.fotos
                },
              },
            })
          ).unwrap();
          
        
          console.log("Carrito actualizado:", carritoActualizado);
          navigate("/home");
        } catch (err) {
          console.error("Error al editar el carrito:", err);
        }
        
      }
        
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
                      maxHeight: "500px",
                      objectFit: "cover",
                    }}
                  />
                </Carousel.Item>
              ))
            ) : (
              <div>No hay imágenes disponibles</div>
            )}
          </Carousel>
        </Col>
        <Col md={6} className="product-info">
          <h1 className="product-brand">{productoSeleccionado.marca}</h1>
          <h2 className="product-type">{productoSeleccionado.tipo}</h2>
          <p className="product-price">${productoSeleccionado.precio.toLocaleString()}</p>
          <p className="product-description">{productoSeleccionado.descripcion}</p>
          <div className="product-actions">
            <Button onClick={agregarAlCarrito} className="add-to-cart">
              Añadir al carrito
            </Button>
            <Button
              className="contact-button"
              href="https://wa.me/+5491165495756?text=Hola,%20estoy%20interesado%20en%20el%20producto%20"
              target="_blank"
            >
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

