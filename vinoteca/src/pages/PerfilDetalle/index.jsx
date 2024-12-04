import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserTimes, FaTools, FaHome } from "react-icons/fa"; // Íconos
import "./perfil-detalle_styls.scss";
import img from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { obtenerUsuarioPorId } from "../../auth/authSlice.js";

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

  const handleEliminarCuenta = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
      console.log("Cuenta eliminada");
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
