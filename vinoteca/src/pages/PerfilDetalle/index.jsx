import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserTimes, FaTools, FaHome } from "react-icons/fa"; 
import "./perfil-detalle_styls.scss";
import img from "../../assets/pilar-fuego-bordo.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { obtenerUsuarioPorId, logout } from "../../auth/authSlice.js";

const PerfilDetalle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario, userId, loading, error } = useSelector(
    (state) => state.login
  );
  console.log("Soy un userId de editar perfil", userId);
  console.log("Soy usuario de editar perfil", usuario);

  useEffect(() => {
    if (userId) {
      dispatch(obtenerUsuarioPorId(userId));
    }
  }, [userId, dispatch]);

  
  const handleBack = () => {
    navigate("/home");
  };

  const handleEditarPerfil = () => {
    navigate("/editar-perfil");
  };

  const handleEliminarCuenta = async () => {
    console.log("Soy email en usuario ", userId);

    if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      try {
       
        const response = await axios.delete(
          `http://localhost:8082/api/usuario/eliminarUsuario/${userId}`
        );
  
        console.log("Cuenta eliminada:", response.data);
         
        dispatch(logout());
        localStorage.setItem("logout", Date.now()); 
  
       
        alert("Tu cuenta ha sido eliminada con éxito.");

        navigate("/");
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error.response?.data || error.message);
        alert("Hubo un error al intentar eliminar tu cuenta. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className="detalle-perfil-layout">
      {/* Menú lateral */}
      <div className="menu-lateral">
        <ul>
          <li onClick={handleBack}>
            <FaHome /> Inicio
          </li>
          <li onClick={handleEditarPerfil}>
            <FaTools /> Editar perfil
          </li>
          <li onClick={handleEliminarCuenta}>
            <FaUserTimes /> Eliminar Cuenta
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="detalle-perfil-contenido">
        <div className="perfil-header">
          <img
            src={img || "https://via.placeholder.com/150"}
            alt="Foto de perfil"
            className="perfil-img"
          />
          <h2>{`Hola ${usuario?.nombre} ${usuario?.apellido} !!`}</h2>
          <p>Gestiona tu información, privacidad y seguridad</p>
        </div>
        <Card className="detalle-perfil-card">
          <Card.Body>
            <Card.Text>
              <strong>Edad:</strong> {usuario?.edad} <br />
              <strong>Email:</strong> {usuario?.email}
              <br />
              <strong>Teléfono:</strong> {usuario?.telefono} <br />
              <strong>Domicilio:</strong> {usuario?.domicilio}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PerfilDetalle;
