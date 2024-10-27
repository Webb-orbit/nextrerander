"use client"
import { createSlice } from "@reduxjs/toolkit";

const init = {
    userid: null,
    status: false
}

const Userslice = createSlice({
    name: "client",
    initialState: init,
    reducers:{
        storelogin(state, action){
            state.userid = action.payload,
            state.status = true
        },
        storelogout(state){
            state.userid = null,
            state.status = false
        }
    }
})

export const {storelogin, storelogout} = Userslice.actions

export default Userslice.reducer