import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { obtenerUsuarioPorId } from "../../auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./usuario-edit_styles.scss";

const validationSchema = Yup.object().shape({
  nombre: Yup.string().matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo se permiten letras"),
  apellido: Yup.string().matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "Solo se permiten letras"),
  edad: Yup.number().min(1, "Edad no válida").required("La edad es obligatoria"),
  email: Yup.string().email("Email no válido"),
  telefono: Yup.string(),
  domicilio: Yup.string(),
});

const UsuarioEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario, userId, loading, error } = useSelector((state) => state.login);

 
  console.log("Soy un userId de editar perfil ", userId);
  console.log("Soy usuario del editar perfil ", usuario);

 
  useEffect(() => {
    if (userId) {
      dispatch(obtenerUsuarioPorId(userId));
    }
  }, [userId, dispatch]);

  const handleSubmit = async (values) => {
    try {
      console.log("soy el values", values)
      const response = await axios.put(
        `http://localhost:8082/api/usuario/editarPerfil/${usuario.email}`, 
        values
      );

      console.log("Datos actualizados:", response.data);
      alert("¡Perfil actualizado con éxito!");
      navigate("/perfil"); 
    } catch (error) {
      console.error("Error al actualizar el perfil:", error.response?.data || error.message);
      alert("Hubo un problema al actualizar el perfil.");
    }
  };

  
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos del usuario</div>;
  }

  if (!usuario) {
    return <div>Cargando información del usuario...</div>;
  }

  return (
    <Container className="usuario-edit-container">
      <h3 className="title">Mis datos personales</h3>
      <Formik
        enableReinitialize
        initialValues={{
          nombre: usuario?.nombre || "",
          apellido: usuario?.apellido || "",
          edad: usuario?.edad || "",
          email: usuario?.email || "",
          telefono: usuario?.telefono || "",
          domicilio: usuario?.domicilio || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} className="usuario-edit-form">
            <Row>
              <Col md={6}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Nombre*"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.nombre && !!errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="apellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellido"
                    placeholder="Apellido*"
                    value={values.apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.apellido && !!errors.apellido}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.apellido}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="edad">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="number"
                    name="edad"
                    placeholder="Edad*"
                    value={values.edad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.edad && !!errors.edad}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.edad}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="telefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    placeholder="Teléfono*"
                    value={values.telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.telefono && !!errors.telefono}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.telefono}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="domicilio">
                  <Form.Label>Domicilio</Form.Label>
                  <Form.Control
                    type="text"
                    name="domicilio"
                    placeholder="Domicilio*"
                    value={values.domicilio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.domicilio && !!errors.domicilio}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.domicilio}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" className="save-button">
              Guardar
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default UsuarioEdit;


