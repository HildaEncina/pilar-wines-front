import { useEffect } from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import CardProducto from "../../componente/CardProducto"; 
import { useDispatch, useSelector } from 'react-redux';
import { obtenerUsuarioPorId } from "../../auth/authSlice.js";
import "./favoritos-styles.scss";
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
                <Typography variant="h4" className="titulo-favoritos">Mis favoritos</Typography>
                <Typography variant="body1" className="sin-favoritos">No tienes productos en favoritos</Typography>
            </div>
        );
    }

    return (
        <div className="lista-productos">
            <Typography variant="h4" className="titulo-favoritos">Mis favoritos</Typography>
            {productos.length < 3 ? (
    <Box display="flex" justifyContent="center" gap={3}>
        {productos.map((producto) => (
            <Box className="product-card" key={producto._id}>
                <CardProducto
                    id={producto?._id}
                    marca={producto?.marca}
                    tipo={producto?.tipo}
                    descripcion={producto?.descripcion}
                    cosecha={producto?.cosecha}
                    precio={producto?.precio}
                    fotos={producto?.fotos}
                />
                 {console.log("soy el id de producto dentro de favoritos detalle ", producto?._id)}
                <Box className="price-and-button">
                   <Button onClick={() => handleDetalle(producto?._id)} variant="contained" className="add-to-list-btn">
                     
                      Añadir al carrito
                    </Button>
                </Box>
            </Box>
        ))}
    </Box>
) : (
    <Grid container spacing={2}>
        {productos.map((producto) => (
            <Grid item xs={12} sm={4} md={3} key={producto._id}>
                <Box className="product-card">
                    <CardProducto
                        id={producto?._id}
                        marca={producto?.marca}
                        tipo={producto?.tipo}
                        descripcion={producto?.descripcion}
                        cosecha={producto?.cosecha}
                        precio={producto?.precio}
                        fotos={producto?.fotos}
                    />
                    
                </Box>
            </Grid>
        ))}
    </Grid>
)}
        </div>
    );
};

export default Favoritos;

