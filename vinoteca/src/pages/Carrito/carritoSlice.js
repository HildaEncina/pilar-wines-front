import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:8082/api/carrito';

// Thunk para crear un nuevo carrito
export const crearCarrito = createAsyncThunk(
  'carrito/crearCarrito',
  async (carritoData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/crear`, carritoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al crear el carrito');
    }
  }
);

// Thunk para listar carritos
export const listarCarritos = createAsyncThunk(
  'carrito/listarCarritos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al listar los carritos');
    }
  }
);

// Thunk para obtener un carrito por ID
export const obtenerCarritoPorID = createAsyncThunk(
  'carrito/obtenerCarritoPorID',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al obtener el carrito');
    }
  }
);

// Thunk para editar un carrito
export const editarCarritoPorID = createAsyncThunk(
  'carrito/editarCarritoPorID',
  async ({ id, camposParaActualizar }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/editar/${id}`, camposParaActualizar);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al editar el carrito');
    }
  }
);

// Slice de carrito
const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    carritos: [],
    carritoActual: JSON.parse(localStorage.getItem('carritoActual')) || null, 
    estado: 'idle',
    error: null,
  },
  reducers: {
    resetCarritoState: (state) => {
      state.carritoActual = null;
      state.estado = 'idle';
      state.error = null;
      localStorage.removeItem('carritoActual'); 
    },
  },
  extraReducers: (builder) => {
    builder
      // Crear carrito
      .addCase(crearCarrito.fulfilled, (state, action) => {
        state.carritoActual = action.payload;
        localStorage.setItem('carritoActual', JSON.stringify(action.payload)); 
      })
      // Obtener carrito por ID
      .addCase(obtenerCarritoPorID.fulfilled, (state, action) => {
        state.carritoActual = action.payload;
        localStorage.setItem('carritoActual', JSON.stringify(action.payload)); 
      })
      // Editar carrito
      .addCase(editarCarritoPorID.fulfilled, (state, action) => {
        state.carritoActual = action.payload;
        localStorage.setItem('carritoActual', JSON.stringify(action.payload)); 
      });
  },
});

export const { resetCarritoState } = carritoSlice.actions;
export default carritoSlice.reducer;

