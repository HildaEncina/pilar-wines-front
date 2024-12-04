import { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, Divider, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { obtenerCarritoPorID, editarCarritoPorID } from "./carritoSlice";
import "./carrito-styles.scss";
import "../../componente/CardProducto/cardProducto.scss"
import { useNavigate, useParams } from "react-router-dom";


const Carrito = () => {
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const { carritoActual } = useSelector((state) => state.carrito);
    console.log("Soy el carritoActual de la card carrito " , carritoActual)

   


    // const eliminarProducto = (idProducto) => {
    //     const nuevosProductos = carritoActual.productos.filter((producto) => producto.id !== idProducto);
    //     dispatch(
    //         editarCarritoPorID({
    //             id: carritoActual._id,
    //             camposParaActualizar: {
    //                 productos: nuevosProductos,
    //                 cantidadProductos: nuevosProductos.length,
    //                 montoTotal: nuevosProductos.reduce((acc, prod) => acc + prod.precio, 0)
    //             }
    //         })
    //     );
    // };

    // const eliminarCarrito = () => {
    //     dispatch(
    //         editarCarritoPorID({
    //             id: carritoActual._id,
    //             camposParaActualizar: {
    //                 productos: [],
    //                 cantidadProductos: 0,
    //                 montoTotal: 0
    //             }
    //         })
    //     );
    // };

    // if (estado === "loading") {
    //     return <Typography variant="h6">Cargando carrito...</Typography>;
    // }

    // if (error) {
    //     return <Typography variant="h6" color="error">Error: {error}</Typography>;
    // }

    return (
        
        <Box className="carrito-container">
            <Typography variant="h4" className="carrito-title">
               Carrito de Compras
            </Typography>

            <Divider sx={{ margin: "16px 0" }} />

            {carritoActual?.productos.length > 0 ? (
                <Box className="productos-list">
                    {carritoActual.productos.map((producto, index) => (
                        <Card key={index} className="producto-card">
                            <CardMedia
                                component="img"
                                height="140"
                                image={producto.fotos[0] || "https://via.placeholder.com/150"}
                                alt={producto.marca}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {producto.marca}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {producto.tipo} - Cosecha: {producto.cosecha}
                                </Typography>
                                <Typography variant="body1" color="text.primary" className="producto-precio">
                                    ${producto.precio.toLocaleString()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    // onClick={() => eliminarProducto(producto.id)}
                                    className="eliminar-producto-btn"
                                >
                                    Eliminar
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Typography variant="h6" className="empty-carrito">
                    Tu carrito está vacío.
                </Typography>
            )}

            <Divider sx={{ margin: "16px 0" }} />

            <Typography variant="h6" className="carrito-summary">
                Total de productos: {carritoActual?.cantidadProductos || 0}
            </Typography>
            <Typography variant="h6" className="carrito-summary">
                Monto total: ${carritoActual?.montoTotal?.toFixed(2) || 0}
            </Typography>

            <Divider sx={{ margin: "16px 0" }} />

            <Box className="carrito-actions">
                <Button
                    variant="contained"
                    color="primary"
                 
                    onClick={() => navigate('/home')}
                    target="_blank"
                    className="agregar-producto-btn"
                >
                    Agregar más productos
                </Button>


                <Button
                    variant="outlined"
                    color="error"
                    href="https://wa.me/+5491165495756?text=Hola,%20estoy%20interesado%20en%20el%20producto%20"
                    className="eliminar-carrito-btn"
                >
                   Comprar
                </Button>
            </Box>
        </Box>
    );
};



export default Carrito;
