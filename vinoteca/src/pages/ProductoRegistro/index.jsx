import apiAuthenticated from "../../api/apiAuthenticated";
import axios from "axios";
import { useState,  useRef} from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button, Container, Alert} from "react-bootstrap";
import validationSchema from "./validationShcema";
import "./producto-registro.scss"

const ProductoRegistro = () => {
  // const [subiendo, setSubiendo] = useState(false);
  // const { token, userId } = useSelector((state) => state.login);
  const form = useRef();
  const navigate = useNavigate();
  
  const initialState = {
    id: 0,
    nombre: "",
    tipoAnimal: "",
    raza: "",
    descripcion: "",
    sexo: "",
    tamano: "",
    temperamentoConAnimales: "",
    temperamentoConPersonas: "",
    edad: 3,
    estado: "",
    ciudad: "",
    mesAnioNacimiento: "",
    // protectoraId: userId,
    fotos: [],
  }

  const uploadImagesToCloudinary = async (fotos) => {
    const formDataArray = fotos.map((imagen) => {
      const formData = new FormData();
      formData.append("file", imagen);
      formData.append("upload_preset", "mumapreset"); 
      return formData;
    });
  
    try {
      const responses = await Promise.all(
        formDataArray.map((formData) =>
          axios.post("https://api.cloudinary.com/v1_1/dkthfc4hc/image/upload", formData)
        )
      );
      return responses.map((response) => response.data.secure_url);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      throw error;
    }
  };
  
  const handleSubmit = async (values) => {
    // setSubiendo(true);

    // const formatMesAnio = (fecha) => {
    //   const date = new Date(fecha);
    //   const year = date.getFullYear();
    //   const month = (`0${date.getMonth() + 1}`).slice(-2);
    //   return `${year}-${month}`;
    // };

    // try {
    //   const imageUrl = await uploadImagesToCloudinary(values.fotos);

    //   const data = {
    //     ...values,
    //     fotos: imageUrl,
    //     mesAnioNacimiento: formatMesAnio(values.mesAnioNacimiento),
    //     protectoraId: 1, //sobreescribo el id porque no funciona con el id de la protectora logueada.
    //   };

    //   console.log(data)

    //   const requestAuthenticated = apiAuthenticated(token); 
    //   const response = await requestAuthenticated.post("/Mascotas/registro", data);
    //   console.log(response.data);
    //   navigate("/register/pet/upload-successful");
    // } catch (error) {
    //   console.error("Error al agregar animal:", error);
    // } finally {
    //   setSubiendo(false);
    // }
  };

  return (
    <Container className="container-producto">
      <h2 className="title">Agregar un producto</h2>
      <Formik
        initialValues={initialState}
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
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit: formikHandleSubmit,
          isSubmitting,
        }) => (

          <Form ref={form} onSubmit={formikHandleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Control className="form"
                type="text"
                name="nombre"
                placeholder="Marca*"
                value={values.marca}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.marca && touched.marca}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3 position-relative" controlId="variedad">
              <Form.Control  className="form"
                as="select"
                name="variedad"
                value={values.variedad}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.variedad && touched.variedad}
              >
                <option value="">Variedad*</option>
                <option value="Perro">Malbec</option>
                <option value="Gato">Cabernet Franc</option>
                <option value="Otro">Otro</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.tipoAnimal}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 position-relative " controlId="tamano">
              <Form.Control  className="form"
                as="select"
                name="tamano"
                value={values.tamano}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.tamano && touched.tamano}
              >
                <option value="">Tamaño*</option>
                <option value="Pequeño">Pequeño</option>
                <option value="Mediano">Mediano</option>
                <option value="Grande">Grande</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                  {errors.tamano}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="cosecha">
            <span className="placeholder-text">Cosecha</span> 
              <Form.Control className="form"
                type="date"
                name="cosecha"
                placeholder="Cosecha"
                value={values.cosecha}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.cosecha && touched.cosecha}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cosecha}
              </Form.Control.Feedback>
             
            </Form.Group>

            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Control className="form"
                as="textarea"
                name="descripcion"
                placeholder="Descripción"
                value={values.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fotos">
              <Form.Label>Cargar imágenes (máximo 10)</Form.Label>
              <Form.Control 
                type="file" 
                name="fotos" 
                multiple 
                onChange={(event) => {
                  const file = event.target.files[0]; // Obtiene el primer archivo
                  if (file) {
                    setFieldValue('fotos', [file]); // Establece el archivo en un array
                  }
                }} 
                isInvalid={!!errors.fotos && touched.fotos} // Indica que hay un error
              />
              <Form.Control.Feedback type="invalid">
                {errors.fotos}
              </Form.Control.Feedback>
            </Form.Group>

            <Button className="btn-large" variant="primary" type="submit" /*disabled={isSubmitting || subiendo}*/>
              Agregar Producto
              {/* {subiendo ? "Subiendo imágenes..." : "Agregar Animal"} */}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}


export default ProductoRegistro;