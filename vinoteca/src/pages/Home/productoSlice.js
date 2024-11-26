import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Ajusta según tu configuración

// ** Thunks para operaciones asincrónicas **

// Listar productos
export const listarProductos = createAsyncThunk(
  'productos/listar',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8082/api/producto/listar'); // Aquí cambiamos la URL
      console.log("ME traigo a los productos: ", response);
      return response.data;

    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error desconocido');
    }
  }
);
// Obtener un producto por ID
export const productoID = createAsyncThunk(
  'productos/productoID',
  async (productoId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${productoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error desconocido');
    }
  }
);

// Crear producto
export const crearProducto = createAsyncThunk(
  'productos/crearProducto',
  async (producto, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/crear`, producto);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error desconocido');
    }
  }
);

// Editar producto por ID
export const editarProducto = createAsyncThunk(
  'productos/editarProducto',
  async ({ productoId, producto }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/editar/${productoId}`, producto);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error desconocido');
    }
  }
);

// Eliminar producto por ID
export const eliminarProducto = createAsyncThunk(
  'productos/eliminarProducto',
  async (productoId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/eliminar/${productoId}`);
      return productoId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error desconocido');
    }
  }
);

// ** Slice de productos **
const productoSlice = createSlice({
  name: 'productos',
  initialState: {
    productosDisponibles: [],
    productoSeleccionado: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Reducers para listarProductos
      .addCase(listarProductos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listarProductos.fulfilled, (state, action) => {
        state.loading = false;
        state.productosDisponibles = action.payload;
      })
      .addCase(listarProductos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reducers para productoID
      .addCase(productoID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productoID.fulfilled, (state, action) => {
        state.loading = false;
        state.productoSeleccionado = action.payload;
      })
      .addCase(productoID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reducers para crearProducto
      .addCase(crearProducto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearProducto.fulfilled, (state, action) => {
        state.loading = false;
        state.productosDisponibles.push(action.payload);
      })
      .addCase(crearProducto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reducers para editarProducto
      .addCase(editarProducto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editarProducto.fulfilled, (state, action) => {
        state.loading = false;
        state.productosDisponibles = state.productosDisponibles.map((producto) =>
          producto._id === action.payload._id ? action.payload : producto
        );
      })
      .addCase(editarProducto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reducers para eliminarProducto
      .addCase(eliminarProducto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(eliminarProducto.fulfilled, (state, action) => {
        state.loading = false;
        state.productosDisponibles = state.productosDisponibles.filter(
          (producto) => producto._id !== action.payload
        );
      })
      .addCase(eliminarProducto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productoSlice.reducer;
