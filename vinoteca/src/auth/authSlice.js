import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

//Login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/Authentication/token', credentials);
    return response.data; // Se asume que la respuesta contiene { token: 'token_value' }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'login',
  initialState: {
    token:  localStorage.getItem('token') ? localStorage.getItem('token') : null,
    userId: null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.role = null;
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
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.usuario.id;
        state.role = action.payload.usuario.tipoRegistro.descripcion;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }});

export const { logout } = authSlice.actions;
export default authSlice.reducer;