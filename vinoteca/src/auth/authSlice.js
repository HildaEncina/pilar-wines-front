import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';
import {jwtDecode} from 'jwt-decode';

// Estado inicial
const initialState = {
  token: localStorage.getItem('token') || null,
  userId: null,
  rol: null,
  loading: false,
  error: null,
};

// Acción asincrónica para el login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/usuario/login', credentials);
      console.log('Respuesta del servidor:', response.data); // Muestra el token
      return response.data; // { token }
    } catch (error) {
      console.error('Error en la petición:', error.response?.data || error);
      return rejectWithValue(error.response?.data || { mensaje: 'Error desconocido' });
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
      localStorage.removeItem('token');
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
          const decodedToken = jwtDecode(token); // Decodifica el JWT para extraer el payload
          state.token = token;
          state.userId = decodedToken.id; // Extrae el ID del usuario del token
          state.rol = decodedToken.rol;  // Extrae el rol del token
          localStorage.setItem('token', token);
        } else {
          state.error = 'No se recibió un token válido del servidor';
        }
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.mensaje || 'Error al iniciar sesión';
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;

