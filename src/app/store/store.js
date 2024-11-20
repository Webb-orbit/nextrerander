"use client"
import { configureStore } from "@reduxjs/toolkit";
import clientslice from "./userslice"
import dashslice from "./dashslice";
import offlineslice from "./offlineslice"

export const store = configureStore({
    reducer: {
        clientstore: clientslice,
        dashstore: dashslice,
        offlinestore: offlineslice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
        devTools: true,
})