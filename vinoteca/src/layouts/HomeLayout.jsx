import { Container, Col, Form, Row, Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from '../auth/authSlice';
import profile from "../assets/home-layout/profile.png";
import menu from "../assets/home-layout/menu.png";
import search from "../assets/home-layout/search.png";

import "./home-layout.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HomeLayout = ({children}) => {
  const [show, setShow] = useState(false);
  const Navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 3840,
        settings: "unslick"
      },
      {
        breakpoint: 450,
        settings: {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleLogOut = () => {
    dispatch(logout());
    Navigate('/');
  };

  return (
    <>
      <div className="container p-3 layout-container">
        <header className="d-flex justify-content-between align-items-center my-2">
          <Button className="p-0" variant="none" onClick={handleShow}>
            <img src={menu} alt="menu" />
          </Button>

          <img className="img-profile" src={profile} alt="profile"/>
        </header>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Pilar Wines </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>Desarrollado por Hilda</p>
            <Button onClick={handleLogOut} variant="primary">
              Logout
            </Button>
          </Offcanvas.Body>
        </Offcanvas>

        <Container >
          <Form inline>
            <Row>
              <Col className="d-flex position-relative p-0">
                <Form.Control
                  type="text"
                  placeholder="Marca, cosecha, tipo"
                  className="input-search"
                />
                <Button className="position-absolute top-50 end-0 translate-middle-y h-100 btn-search p-0" type="submit">
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
      <div>
        {children}
      </div>
    </>
  )
}

export default HomeLayout