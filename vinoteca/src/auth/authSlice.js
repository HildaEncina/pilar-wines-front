import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';
import {jwtDecode} from 'jwt-decode'; // Ajuste en la importación si es default

// Estado inicial
const initialState = {
  token: localStorage.getItem('token') || null,
  userId: null,
  rol: localStorage.getItem('rol') || null,
  loading: false,
  error: null,
  carrito: null, // Cambiado de [] a null para diferenciar estados
};

// Thunk para login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/usuario/login', credentials);
      console.log('Respuesta del servidor:', response.data); // Muestra el token
      return response.data;
    } catch (error) {
      console.error('Error en la petición:', error.response?.data || error);
      return rejectWithValue(error.response?.data || { mensaje: 'Error desconocido' });
    }
  }
);

// Thunk para obtener el carrito
export const obtenerCarrito = createAsyncThunk(
  'auth/obtenerCarrito',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/carrito/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { mensaje: 'Error al obtener el carrito' });
    }
  }
);

// Thunk para crear un carrito
export const crearCarrito = createAsyncThunk(
  'auth/crearCarrito',
  async (carritoData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/carrito/crear', carritoData);
      return response.data; // El ID del carrito creado
    } catch (error) {
      return rejectWithValue(error.response?.data || { mensaje: 'Error al crear el carrito' });
    }
  }
);

// Thunk para editar un carrito
export const editarCarrito = createAsyncThunk(
  'auth/editarCarrito',
  async ({ id, camposParaActualizar }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/carrito/editar/${id}`, camposParaActualizar);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { mensaje: 'Error al editar el carrito' });
    }
  }
);

// Slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.rol = null;
      state.carrito = null; // Limpiar el carrito al cerrar sesión
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token } = action.payload;
        if (token) {
          const decodedToken = jwtDecode(token);
          state.token = token;
          state.userId = decodedToken.id;
          state.rol = decodedToken.rol;

          // Guardar en localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('rol', decodedToken.rol);
        } else {
          state.error = 'No se recibió un token válido del servidor';
        }
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.mensaje || 'Error al iniciar sesión';
      })
      .addCase(obtenerCarrito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerCarrito.fulfilled, (state, action) => {
        state.loading = false;
        state.carrito = action.payload; // Guardar el carrito obtenido
      })
      .addCase(obtenerCarrito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.mensaje || 'Error al obtener el carrito';
      })
      .addCase(crearCarrito.fulfilled, (state, action) => {
        state.carrito = { _id: action.payload, productos: [], cantidadProductos: 0, montoTotal: 0 };
      })
      .addCase(editarCarrito.fulfilled, (state, action) => {
        state.carrito = action.payload; // Actualizar el carrito con la respuesta del servidor
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
