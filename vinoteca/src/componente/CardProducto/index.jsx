
import { Card, CardMedia, CardContent, Typography, IconButton, Box, ButtonBase } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import logo from "../../assets/home-layout/botella.jpg";
import { useNavigate } from "react-router-dom";


const CardProducto = ({ marca,tipo,cosecha, precio }) => {

    const navigate= useNavigate();
const irDetalle= ()=> {
    navigate("/producto-detalle")
}
  return (
    <ButtonBase onClick={irDetalle} sx={{ display: "block", textAlign: "inherit" }}>
 <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={logo}
          sx={{ objectFit: "cover" }}
        />
        <IconButton 
        onClick={irDetalle}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "white",
          }}
        >
          <FavoriteIcon sx={{ color: "#f50057" }} />
        </IconButton>
      </Box>

      {/* Contenido de la tarjeta */}
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {marca}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tipo} • Cosecha: {cosecha}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>
          ${precio}
        </Typography>
      </CardContent>
    </Card>
    </ButtonBase>
   
  );
};

export default CardProducto;