import { Card, CardMedia, CardContent, Typography, IconButton, Box, ButtonBase } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";  // Importar estilos del carrusel

import './CardProducto.scss'; // Importar los estilos

const CardProducto = ({ marca, tipo, cosecha, precio, fotos }) => {
    const navigate = useNavigate();

    const irDetalle = () => {
        navigate("/producto-detalle");
    }

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

                    <IconButton className="favorite-icon">
                        <FavoriteIcon />
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

export default CardProducto;
