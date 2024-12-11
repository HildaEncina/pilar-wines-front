import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice";
import * as Yup from "yup";
import logo from "../../assets/pilar-fuego-bordo.png";
import { obtenerUsuarioPorId } from "../authSlice";
import "./login.scss"

import "./";

const validationSchema = Yup.object().shape({
  email: Yup.string("Debe ingresar su usuario")
    .email("Debe ingresar un email")
    .required("Usuario es requerido"),
  password: Yup.string()
    .matches(/^\d+$/, "El password debe ser numérico")
    .required("Password es requerido"),
});

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, token, rol, userId, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (values) => {
    const credentials = {
      email: values.email,
      password: values.password,
    };
    dispatch(login(credentials));
  };

  useEffect(() => {
    if (token && !userId) {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        dispatch(obtenerUsuarioPorId(storedUserId));
      }
    }
  }, [token, userId, dispatch]);

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, rol, navigate]);

  return (
    <div className="container_">
      <Container className="container-login">
        <img className="logo-login" src={logo} alt="Logo" />
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
            <Form onSubmit={formikHandleSubmit}>
           
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  className="form-control-password"
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.email && touched.email}
                />
                <Form.Control.Feedback className="error-message" type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Control
                  className={`form-control-password ${
                    touched.password && errors.password ? "input-error" : ""
                  }`}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña*"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.password && touched.password}
                />
                <Form.Control.Feedback className="error-message" type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              {error && <div className="error-message">{error}</div>}

              <div className="actions">
                <div className="container-recordarme ">
                  <input type="checkbox" id="remember" name="remember" />
                  <label htmlFor="remember">Recordarme</label>
                </div>
                <a href="/forgot-password" className="forgot-password">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <div className="bnt-container">
                <Button
                  className="btn-large"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {loading ? "Cargando..." : "Ingresar"}
                </Button>
                <Button
                  className="btn-create"
                  type="button"
                  onClick={() => navigate("/usuario-registro")}
                >
                  Crear Cuenta
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default Login;
