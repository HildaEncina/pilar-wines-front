
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../authSlice";
import * as Yup from "yup";
import logo from "../../assets/logo.png";




import "./login.scss"
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
  
  // Obtener estado de Redux
  const { loading, error, token, rol } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Manejo del submit
  const handleSubmit = (values) => {
    const credentials = {
      email: values.email,
      password: values.password,
    };
    dispatch(login(credentials));
    console.log('Token:', token); 
   
  };

  useEffect(() => {
    if (token) {
        try {

            if (rol === "cliente") {
                navigate("/home");
            } else {
              navigate("/home");
            }
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    }
}, [token, navigate]);
  

  return (
    <div className="container">
     <Container className="container-login">
       <img className="logo-login" src={logo} />
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
                <Form.Control className="form-control-password"
                  type="email"
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

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <div className="container-pass">
                  <Form.Control  
                    className={`form-control-password ${touched.password && errors.password ? 'input-error' : ''}`}
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Contraseña*"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.password && touched.password}
                  />

                  <Form.Control.Feedback type="invalid">
                      {touched.password && errors.password && (
                          <div className="error-text">{errors.password}</div>
                      )}
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
              
              <div className="actions">
                <div className="container-recordarme">
                  <input className="remember"  type="checkbox" id="remember" name="remember" />
                  <label className="remember" htmlFor="remember">Recordarme</label>
                </div>
                <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
              </div>

              <div className="bnt-container">
                <Button className="btn-large"
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
              
                {loading ? 'Loading...' : 'Ingresar'} 
                </Button>
                <Button className="btn-create"
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={()=>navigate("/usuario-registro")}
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
}

export default Login;
