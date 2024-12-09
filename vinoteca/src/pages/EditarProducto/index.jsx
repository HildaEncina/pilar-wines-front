import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button, Container, Alert } from "react-bootstrap";
import validationSchema from "../ProductoRegistro/validationShcema";
import { productoID } from "../Home/productoSlice";


import "./producto-editar.scss";

const EditarProducto = () => {
 
  const [subiendo, setSubiendo] = useState(false);
  const { token } = useSelector((state) => state.login);
  const { productoSeleccionado, loading, error } = useSelector((state) => state.producto);
  const navigate = useNavigate();
  const { id } = useParams();
 console.log("Soy producto selecionado de editar producto", productoSeleccionado)

  const form = useRef();


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
     
      let imageUrl = productoSeleccionado.fotos;
  
      
      if (values.fotos && values.fotos.length > 0) {
        imageUrl = await uploadImagesToCloudinary(values.fotos);
      }
 
      
      const data = {
        ...values,
        fotos: imageUrl,
      };
  
      await axios.put(
        `http://localhost:8082/api/producto/editar/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } } 
      );
  
      navigate("/home");
    } catch (error) {
      console.error("Error al editar el producto:", error);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <Container className="container-producto">
      <h2 className="title">Editar Producto</h2>
      <Formik
        initialValues={{
          marca: productoSeleccionado?.marca,
          tipo: productoSeleccionado?.tipo,
          descripcion: productoSeleccionado?.descripcion,
          cosecha: productoSeleccionado?.cosecha,
          precio: productoSeleccionado?.precio,
          fotos: [],
        }}
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
              <Form.Control
                className="form"
                type="text"
                name="cosecha"
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
              <Form.Label>Cargar nuevas imágenes (opcional)</Form.Label>
              <Form.Control
                type="file"
                name="fotos"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.target.files);
                  setFieldValue("fotos", files);
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
              {subiendo ? "Subiendo imágenes..." : "Guardar Cambios"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditarProducto;
