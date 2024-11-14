import * as Yup from "yup";

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo debe contener letras")
  .min(2, "El nombre debe tener al menos 2 caracteres")
  .max(50, "El nombre no puede tener más de 50 caracteres")
  .required("El campo Nombre es requerido"),
  
  raza: Yup.string().notRequired(),
  
  tipoAnimal: Yup.string()
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El tipo de animal solo debe contener letras")
  .min(4, "El tipo de animal debe tener al menos 2 caracteres")
  .max(50, "El tipo de animal no puede tener más de 50 caracteres")
  .required("El campo tipo de animal es requerido"),
  
  tamano: Yup.string().required("El campo Tamaño es requerido"),
  
  temperamentoConAnimales: Yup.string()
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El temperamento solo debe contener letras")
  .min(2, "El temperamento debe tener al menos 2 caracteres")
  .max(50, "El temperamento no puede tener más de 50 caracteres")
  .notRequired(),

  temperamentoConPersonas: Yup.string()
  .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El temperamento solo debe contener letras")
  .min(2, "El temperamento debe tener al menos 2 caracteres")
  .max(50, "El temperamento no puede tener más de 50 caracteres")
  .notRequired(),

  estado: Yup.string().notRequired(),
  
  ciudad: Yup.string().required("El campo es obligatorio"),

  mesAnioNacimiento: Yup.date()
    .nullable()
    .required('La fecha de nacimiento es requerida'),

  descripcion: Yup.string()
  .min(2, "La descripción debe tener al menos 2 caracteres")
  .max(50, "La descripción no puede tener más de 50 caracteres")
  .notRequired(),

  sexo: Yup.string().required("Debes seleccionar un sexo"),

});

export default validationSchema;