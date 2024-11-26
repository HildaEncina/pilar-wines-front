import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";
import productoReducer from "../pages/Home/productoSlice";

export const store = configureStore({
    reducer: {
        login: authSlice,
        producto:  productoReducer,
    },
});