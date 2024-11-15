import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPets } from "./petSlice";
// import PetCard from "../../components/PetCard";
// import addIcon from "../../assets/add-button.png";
// import cat from "../../assets/card-pet/cat.png";
// import ProtectorCard from "../../components/ProtectorCard";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const { petsAvailable } = useSelector((state) => state.pets);
  const { token, role } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPets());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [token, navigate]);

  return (
    <Container fluid className="home-container d-flex align-items-center justify-content-center position-relative">
     
      {/* { petsAvailable.length < 1 ? */}
        <p className="text-center">No hay productos registrados <br /> actualmente</p> :
        
        {/* (petsAvailable.map((pet) => (
          <PetCard key={pet.id} img={pet.fotos[0]} name={pet.nombre} city={pet.ciudad} sex={pet.sexo} />
        )))} */}

      {/* <PetCard img={cat} name="Tormund" city="Avellaneda" sex="Macho"/> */}
      

      {/* <ProtectorCard /> */}
      {/* { role === "Protectora" && (
        <Link to="/register/pett-add" className="position-absolute bottom-0 end-0 mb-4 me-2">
          <img src={addIcon} alt="add-pet" />
        </Link>
      )} */}
    </Container>
  );
};

export default Home;
