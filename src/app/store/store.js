"use client"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import clientslice from "./userslice"
import dashslice from "./dashslice";

export const store = configureStore({
    reducer: {
        clientstore: clientslice,
        dashstore: dashslice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
        devTools: true,
})