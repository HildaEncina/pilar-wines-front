import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';
import {jwtDecode} from 'jwt-decode'; 
// Estado inicial
const initialState = {
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') || null,
  rol: localStorage.getItem('rol') || null,
  usuario: JSON.parse(localStorage.getItem('usuario')) || null, 
  loading: false,
  error: null,
};

// Thunk para login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/usuario/login', credentials);
      console.log('Respuesta del servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en la petición:', error.response?.data || error);
      return rejectWithValue(error.response?.data || { mensaje: 'Error desconocido' });
    }
  }
);

// Thunk para obtener un usuario por ID
export const obtenerUsuarioPorId = createAsyncThunk(
  'auth/obtenerUsuarioPorId',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`http://localhost:8082/api/usuario/${userId}`);
      console.log('Usuario obtenido:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { mensaje: 'Error al obtener el usuario' });
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
      state.usuario = null;
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      localStorage.removeItem('userId');
      localStorage.removeItem('usuario');
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
          localStorage.setItem('userId', decodedToken.id);
        } else {
          state.error = 'No se recibió un token válido del servidor';
        }
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.mensaje || 'Error al iniciar sesión';
      })
      .addCase(obtenerUsuarioPorId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerUsuarioPorId.fulfilled, (state, action) => {
        state.usuario = action.payload;
        state.loading = false;
        localStorage.setItem('usuario', JSON.stringify(action.payload)); 
      })
      .addCase(obtenerUsuarioPorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.mensaje || 'Error al obtener el usuario';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;