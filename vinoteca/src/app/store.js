import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";
import productoReducer from "../pages/Home/productoSlice";
import carritoSlice from "../pages/Carrito/carritoSlice";

export const store = configureStore({
    reducer: {
        login: authSlice,
        producto:  productoReducer,
        carrito: carritoSlice,
    },
});