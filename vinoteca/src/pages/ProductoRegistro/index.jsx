import axios from "axios";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button, Container, Alert } from "react-bootstrap";
import validationSchema from "./validationShcema";
import "./producto-registro.scss";
import "../../api/api";

const ProductoRegistro = () => {
  const [subiendo, setSubiendo] = useState(false);
  const { token, userId } = useSelector((state) => state.login);
  const form = useRef();
  const navigate = useNavigate();

  const initialState = {
    id: 0,
    marca: "",
    tipo: "",
    descripcion: "",
    cosecha: "",
    precio: 0,
    fotos: [],
  };

  const uploadImagesToCloudinary = async (fotos) => {
    const formDataArray = fotos.map((imagen) => {
      const formData = new FormData();
      formData.append("file", imagen);
      formData.append("upload_preset", "pilarWines");
      return formData;
    });

    try {
      const responses = await Promise.all(
        formDataArray.map((formData) =>
          axios.post(
            "https://api.cloudinary.com/v1_1/djn5lvybe/image/upload",
            formData
          )
        )
      );
      return responses.map((response) => response.data.secure_url);
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      throw error;
    }
  };

  const handleSubmit = async (values) => {
    setSubiendo(true);

    try {
      const imageUrl = await uploadImagesToCloudinary(values.fotos);
      const data = {
        marca: values.marca,
        tipo: values.tipo || "N/A",
        descripcion: values.descripcion || "N/A",
        cosecha: values.cosecha,
        precio: values.precio,
        fotos: imageUrl,
      };

      const response = await axios.post(
        "http://localhost:8082/api/producto/crear",
        data
      );
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error("Error al agregar un producto:", error);
    } finally {
      setSubiendo(false);
    }
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
          <Form
            ref={form}
            onSubmit={formikHandleSubmit}
            encType="multipart/form-data"
          >
            <Form.Group className="mb-3" controlId="marca">
              <Form.Control
                className="form"
                type="text"
                name="marca"
                placeholder="Marca*"
                value={values.marca}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.marca && touched.marca}
              />
              <Form.Control.Feedback type="invalid">
                {errors.marca}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 position-relative" controlId="tipo">
              <Form.Control
                className="form"
                as="select"
                name="tipo"
                value={values.tipo}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.tipo && touched.tipo}
              >
                <option value="">Variedad*</option>
                <option value="Malbec">Malbec</option>
                <option value="Cabernet">Cabernet Franc</option>
                <option value="Otro">Otro</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.tipo}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="cosecha">
              <span className="placeholder-text"></span>
              <Form.Control
                className="form"
                type="text"
                name="cosecha"
                placeholder="Cosecha*"
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
              <Form.Control
                className="form"
                as="textarea"
                name="descripcion"
                placeholder="Descripción"
                value={values.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="precio">
              <Form.Control
                className="form"
                type="number"
                name="precio"
                placeholder="Precio*"
                value={values.precio}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.precio && touched.precio}
              />
              <Form.Control.Feedback type="invalid">
                {errors.precio}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="fotos">
              <Form.Label>Cargar imágenes (máximo 10)</Form.Label>
              <Form.Control
                type="file"
                name="fotos"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.target.files); // Obtiene todos los archivos seleccionados
                  setFieldValue("fotos", files); // Los asigna al campo "fotos"
                }}
                isInvalid={!!errors.fotos && touched.fotos}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fotos}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              className="btn-large"
              variant="primary"
              type="submit"
              disabled={isSubmitting || subiendo}
            >
              {subiendo ? "Subiendo imágenes..." : "Agregar Producto"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ProductoRegistro;
