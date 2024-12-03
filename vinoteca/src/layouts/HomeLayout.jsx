import { Container, Col, Form, Row, Button, Offcanvas } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";
import profile from "../assets/home-layout/profile.png";
import menu from "../assets/home-layout/menu.png";
import search from "../assets/home-layout/search.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "./home-layout.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { obtenerCarritoPorID } from "../pages/Carrito/carritoSlice";

const HomeLayout = ({ children }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();


  const { carritoActual } = useSelector((state) => state.carrito);
  console.log("Carrito actual de layaout ",carritoActual);
  let cantidadProductos=0;
  // let cantidadProductos = carritoActual?.productos?.length || 0;
  cantidadProductos = cantidadProductos + carritoActual?.productos?.length;  

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };


  const handleCartClick = () => {
    navigate('/carrito'); 
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

          {/* Imagen de perfil */}
          <img className="img-profile" src={profile} alt="profile" />
        </header>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Pilar Wines </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>Desarrollado</p>
            <Button onClick={handleLogOut} variant="primary">
              Logout
            </Button>
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
