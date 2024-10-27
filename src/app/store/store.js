"use client"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import clientslice from "./userslice"
import dashslice from "./dashslice";

export const store = configureStore({
    reducer: {
        clientstore: clientslice,
        dashstore: dashslice,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})