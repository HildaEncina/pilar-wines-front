import { Card, CardMedia, CardContent, Typography, IconButton, Box, ButtonBase } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";  
import PropTypes from 'prop-types'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import './CardProducto.scss'; 
import axios from 'axios'; 
import { obtenerUsuarioPorId } from "../../auth/authSlice.js";

const CardProducto = ({ id, marca, tipo, descripcion, cosecha, precio, fotos }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);
    const { usuario, userId } = useSelector((state) => state.login);

    
    useEffect(() => {
        if (userId) {
            
            const favoriteStatus = localStorage.getItem(`favorite_${userId}_${id}`);
            if (favoriteStatus) {
                setIsFavorite(JSON.parse(favoriteStatus));  
            }

           
            dispatch(obtenerUsuarioPorId(userId));
        }
    }, [userId, dispatch, id]);

    
    useEffect(() => {
        if (usuario && usuario.productos.includes(id)) {
            setIsFavorite(true);  
        }
    }, [usuario, id]);

    const irDetalle = () => {
        navigate(`/producto-detalle/${id}`);  
    };

    const agregarAFavoritos = async (e) => {
        const productoFavorito = { _id: id, marca: marca, tipo: tipo, descripcion: descripcion, cosecha: cosecha, precio: precio, fotos: fotos };

        e.stopPropagation();  

        try {
           
            const response = await axios.post(
                `http://localhost:8082/api/usuario/favoritos/${userId}`,
                { producto: productoFavorito }
            );
            
            if (response.status === 200) {
                setIsFavorite(true);  
              
                localStorage.setItem(`favorite_${userId}_${id}`, true); 
            }
        } catch (error) {
            console.error("Error al agregar a favoritos:", error);
            alert("Hubo un error al agregar el producto a favoritos");
        }
    };

    return (
        <ButtonBase onClick={irDetalle} sx={{ display: "block", textAlign: "inherit" }}>
            <Card className="card-producto">
                <Box className="card-media">
                    <Carousel>
                        {fotos.map((foto, index) => (
                            <CardMedia
                                key={index}
                                component="img"
                                image={foto}
                                alt={`foto-${index}`}
                            />
                        ))}
                    </Carousel>

                    <IconButton className="favorite-icon" onClick={agregarAFavoritos}>
                        <FavoriteIcon style={{ color: isFavorite ? 'red' : 'inherit' }} />
                    </IconButton>
                </Box>

                <CardContent className="card-content">
                    <Typography variant="h6" className="card-title">
                        {marca}
                    </Typography>
                    <Typography variant="body2" className="card-info">
                        {tipo} • Cosecha: {cosecha}
                    </Typography>
                    <Typography variant="h6" className="price">
                        ${precio}
                    </Typography>
                </CardContent>
            </Card>
        </ButtonBase>
    );
};

CardProducto.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    marca: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    cosecha: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    fotos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CardProducto;

