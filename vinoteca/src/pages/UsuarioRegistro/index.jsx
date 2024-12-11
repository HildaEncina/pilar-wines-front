import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import logo from "../../assets/pilar-fuego-bordo.png";
import "./usuario-registro_styles.scss";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo debe contener letras")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El campo Nombre es requerido"),
  apellido: Yup.string()
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      "El apellido solo debe contener letras"
    )
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede tener más de 50 caracteres")
    .required("El campo Apellido es requerido"),
    edad: Yup.string()
    .required("La edad es requerido"),
  email: Yup.string("Debe ingresar su usuario")
    .email("Debe ingresar un email")
    .required("El campo Usuario es requerido"),
  password: Yup.string()
    .required("El campo Password es requerido"),
  telefono:Yup.string()
  .required("El campo telefono es requerido"),
  domicilio: Yup.string()
  .matches(
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
    "El domicilio solo debe contener letras"
  )
  .min(2, "El domicilio debe tener al menos 2 caracteres")
  .max(50, "El domicilio no puede tener más de 50 caracteres")
  .required("El campo domicilio es requerido"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmación de contraseña es requerida"),
});

const UsuarioRegistro = () => {
  const navigate = useNavigate();

  const form = useRef();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confPasswordVisible, setConfPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfPasswordVisibility = () => {
    setConfPasswordVisible(!confPasswordVisible);
  };

  const sendEmail = async () => {
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      return "SUCCESS";
    } catch (error) {
      console.log(error);
      return error.text;
    }
  };

  const handleSubmit = (values) => {
    console.log("Nombre:", values.name);
    console.log("Apellido:", values.lastName);
    console.log("Email:", values.email);
    console.log("Password:", values.password);
    console.log("Confirmation Password:", values.confirmPassword);

    axios
      .post("http://localhost:8082/api/usuario/registrar", {
        nombre: values.nombre,
        apellido: values.apellido,
        edad:values.edad,
        email: values.email,
        password: values.password,
        telefono:values.telefono,
        domicilio:values.domicilio,
      })
      .then(async (response) => {
        navigate("/login");
        console.log("Response:", response);

        // Llamar a sendEmail y esperar su respuesta
        const emailStatus = await sendEmail();

        if (emailStatus === "SUCCESS") {
          navigate("/register/account-validation");
        } else {
          console.error("Error al enviar el email:", emailStatus);
        }
      })
      .catch((error) => {
        console.log("el error es: " + error);
        const response = JSON.parse(error.request.response);
        console.log("la respuesta es: " + response);

        if (
          response.errors &&
          response.errors.includes(
            "Ya existe un usuario registrado con esa dirección de email"
          )
        ) {
          navigate("/register/refused");
        } else {
          console.error("Error:", response.errors);
        }
      });
  };

  return (
    <Container className="card-registro">
      <img className="img-register" src={logo} />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit: formikHandleSubmit,
          isSubmitting,
        }) => (
        <Form className="form-container" ref={form} onSubmit={formikHandleSubmit}>
          <Form.Group controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control
                className="form-register"
                type="text"
                name="nombre"
                placeholder="Nombre*"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.nombre && touched.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {errors.domicilio}
              </Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control
                className="form-register"
                type="text"
                name="apellido"
                placeholder="Apellido*"
                value={values.apellido}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.apellido && touched.apellido}
              />
              <Form.Control.Feedback type="invalid">
                {errors.apellido}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label></Form.Label>
              <Form.Control
                className="form-register"
                type="text"
                name="edad"
                placeholder="Edad*"
                value={values.edad}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.edad && touched.edad}
              />
              <Form.Control.Feedback type="invalid">
                {errors.edad}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control
                className="form-register"
                type="text"
                name="email"
                placeholder="Email*"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email && touched.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label></Form.Label>
              <div className="password-container">
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña*"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.password && touched.password}
                />
                <span
                  className="toggle-visibility"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer", color: "maroon" }}
                >
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                  />
                </span>
                <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
              </div>
             
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label></Form.Label>
              <div className="password-container">
                <Form.Control
                  type={confPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña*"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    !!errors.confirmPassword && touched.confirmPassword
                  }
                />
                <span
                  className="toggle-visibility"
                  onClick={toggleConfPasswordVisibility}
                  style={{ cursor: "pointer", color: "maroon" }}
                >
                  <FontAwesomeIcon
                    icon={confPasswordVisible ? faEyeSlash : faEye}
                  />
                </span>
                <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
              </div>
            
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control
                className="form-register"
                type="text"
                name="telefono"
                placeholder="Telefono*"
                value={values.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.telefono && touched.telefono}
              />
              <Form.Control.Feedback type="invalid">
                {errors.telefono}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control
                className="form-register"
                type="text"
                name="domicilio"
                placeholder="Domicilio*"
                value={values.domicilio}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.domicilio && touched.domicilio}
              />
              <Form.Control.Feedback type="invalid">
                {errors.domicilio}
              </Form.Control.Feedback>
            </Form.Group>

            <div>
              <Button
                variant="primary"
                type="submit"
                className="btn-register btn-large"
                disabled={isSubmitting}
              >
                Registrarme
              </Button>
            </div>
        </Form>
        )}
      </Formik>
   
  </Container>

  );
};

export default UsuarioRegistro;
