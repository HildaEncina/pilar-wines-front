import { Container, Col, Form, Row, Button, Offcanvas } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";
import profile from "../assets/pilar-fuego-bordo.png";
import menu from "../assets/home-layout/menu.png";
import search from "../assets/home-layout/search.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FaUser, FaHeart, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/pilar-fuego-bordo.png";

import "./home-layout.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeLayout = ({ children }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { token, rol } = useSelector((state) => state.login);

  useEffect(() => {
    if (token && rol) {
      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);
    }
  }, [token, rol]);

  const { carritoActual } = useSelector((state) => state.carrito);
  console.log("Carrito actual de layaout ", carritoActual);
  let cantidadProductos = 0;
  cantidadProductos = cantidadProductos + carritoActual?.productos?.length;

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/carrito");
  };

  const handlePerfil = () => {
    navigate("/perfil");
  };

  const handleFavoritos = () => {
    navigate("/favoritos");
  };

  return (
    <>
      <div className="container p-3 layout-container">
        <header className="d-flex justify-content-between align-items-center my-2">
          {/* Botón del menú */}
          <Button className="p-0" variant="none" onClick={handleShow}>
            <img src={menu} alt="menu" />
          </Button>

          {/* Botón del carrito */}
          {rol !== "administrador" && (
            <Button
              className="p-0 position-relative btn-cart"
              variant="none"
              onClick={handleCartClick}
            >
              <ShoppingCartIcon fontSize="large" />
              {cantidadProductos > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {cantidadProductos}
                </span>
              )}
            </Button>
          )}

          {/* Imagen de perfil */}
          <img className="img-profile" src={profile} alt="profile" />
        </header>
        <Offcanvas style={{ width: "250px" }} show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Pilar Wines</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvas-body-custom">
            <img src={logo} alt="Logo" className="logo-small" />
            <div className="button-container">
              <Button onClick={handlePerfil} className="custom-button mb-3">
                <FaUser className="me-2" /> Perfil
              </Button>
              <Button onClick={handleFavoritos} className="custom-button mb-3">
                <FaHeart className="me-2" /> Favoritos
              </Button>
              <Button onClick={handleLogOut} className="custom-button mb-3">
                <FaSignOutAlt className="me-2" /> Logout
              </Button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <Container>
          <Form inline>
            <Row>
              <Col className="d-flex position-relative p-0">
                <Form.Control
                  type="text"
                  placeholder="Marca, cosecha, tipo"
                  className="input-search"
                />
                <Button
                  className="position-absolute top-50 end-0 translate-middle-y h-100 btn-search p-0"
                  type="submit"
                >
                  <img src={search} alt="search" />
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>

        <div className="container categories">
          <h2 className="my-4 categories__title">Categorias</h2>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
};

export default HomeLayout;
