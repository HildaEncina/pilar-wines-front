import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";


import "./home.scss";

const Home = () => {
  const navigate = useNavigate();

  const { token, rol } = useSelector((state) => state.login);




  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <Container
      fluid
      className="home-container d-flex align-items-center justify-content-center position-relative"
    >
      {/* { petsAvailable.length < 1 ? */}
      <p className="text-center">
        No hay productos registrados <br /> actualmente
      </p>{" "}
    
      {rol === "administrador" && (
        <Link
          to="/producto-registro"
          className="position-absolute bottom-0 end-0 mb-4 me-2"
        >
          <Button className="btn-wine">+</Button>
        </Link>
      )}
    </Container>
  );
};

export default Home;
