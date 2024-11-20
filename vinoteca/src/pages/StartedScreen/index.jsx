import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import image01 from '../../assets/botella.jpeg';
import image02 from '../../assets/vino_.jpeg';
import dot02 from '../../assets/dot02.png'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './started-screen.scss';

const StartedScreen = () => {
  
  const navigate = useNavigate();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <a>
          <img
            src={dot02}
            alt="dot"
            style={{ width: '15px', height: '5px' }}
          />
        </a>
      );
    },
    appendDots: dots => (
      <ul style={{ margin: "0px" }}> {dots} </ul>
    ),
    dotsClass: "slick-dots custom-dots",
  
  };


  return (
    <div className='vh-100 vw-100 d-flex align-items-center fade-in'>
      <Container>
        <Row>
          <Col className="p-0">
            <div className="slider-container">
              <Slider {...settings}>
                <div className="slide">
                  <div className="slide-image d-flex justify-content-center">
                    <img className="img-fluid img-size" src={image01} alt="image" />
                  </div>
                  <h2 className="slide-title text-center mb-2 mt-4">Para los amantes del buen vino</h2>
                  <p className="slide-text text-center px-3">Regístrate y únete a una comunidad de conocedores. <br className="d-none d-sm-block" /> Disfruta de acceso a vinos seleccionados y descubre nuevas etiquetas que te sorprenderán.</p>
                </div>
                <div className="slide">
                  <div className="slide-image d-flex justify-content-center">
                    <img className="img-fluid img-size" src={image02} alt="image" />
                  </div>
                  <h2 className="slide-title text-center mb-2 mt-4">Descubre tu vino ideal</h2>
                  <p className="slide-text text-center px-4">Sumérgete en nuestro mundo de vinos y encuentra la botella perfecta para cada ocasión. Déjanos guiarte para hacer de cada brindis un momento inolvidable.<br /> ¿Por que no dejarte seducir por nuestra selección de vinos?</p>
                </div>
              </Slider>
              <div className="d-flex flex-column align-items-center area-button">
                <Button variant="primary" className="mt-4 btn-sm" onClick={() => navigate('/login')}>Siguiente</Button>
                <Link to="/login" className="link mt-3">Omitir</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default StartedScreen;