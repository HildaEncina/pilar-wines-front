import * as Yup from "yup";

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchema = Yup.object().shape({

  marca: Yup.string()
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "La marca solo debe contener letras")
  .min(2, "La marca debe tener al menos 2 caracteres")
  .max(50, "La marca no puede tener más de 50 caracteres")
  .required("El campo marca es requerido"),
  
  tipo: Yup.string().notRequired(),
  
  descripcion: Yup.string()
  .min(2, "La descripción debe tener al menos 2 caracteres")
  .max(50, "La descripción no puede tener más de 50 caracteres")
  .notRequired(),
  
  cosecha: Yup.string().required("El año de la cosecha es requerido"),
 precio: Yup.number()
  .required("El precio es requerido")
  .min(1, "El precio debe ser mayor que 0"),
 fotos: Yup.array()
  .of(Yup.mixed().test("fileFormat", "Formato no soportado", (value) => 
    value && SUPPORTED_FORMATS.includes(value.type)
  ))
  .max(10, "Puedes subir un máximo de 10 imágenes")
  .required("Las imágenes son obligatorias"),




});

export default validationSchema;