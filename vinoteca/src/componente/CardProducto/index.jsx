import { Card, CardMedia, CardContent, Typography, IconButton, Box, ButtonBase } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";  
import PropTypes from 'prop-types'; 
import './CardProducto.scss'; 


const CardProducto = ({ id, marca, tipo, cosecha, precio, fotos }) => {
    const navigate = useNavigate();
   

    const irDetalle = () => {
        console.log("ID de card dentro", id);
        navigate(`/producto-detalle/${id}`); 
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
CardProducto.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    marca: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    cosecha: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    fotos: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default CardProducto;
