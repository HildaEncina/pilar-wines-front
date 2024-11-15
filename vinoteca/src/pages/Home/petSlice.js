import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiAuthenticated from '../../api/apiAuthenticated';

export const getPets = createAsyncThunk('pet/pets', async (petId = null, {rejectWithValue}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return rejectWithValue("No token found"); 
  }
  const requestAuthenticated = apiAuthenticated(token);
  try {
    const endpoint = petId ? `/Mascotas/${petId}` : '/Mascotas';
    const response = await requestAuthenticated.get(endpoint);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data || "Error desconocido");
  }
});

const petSlice = createSlice({
  name: 'pets',
  initialState : {
    petsAvailable: [],
    selectedPet: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPets.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          state.petsAvailable = action.payload;
          state.selectedPet = null;
        } else {
          state.selectedPet = action.payload;
          state.petsAvailable = [];
        }
      })
      .addCase(getPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default petSlice.reducer;

