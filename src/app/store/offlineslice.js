"use client"
import { createSlice } from "@reduxjs/toolkit";

const init = {
    storeonline: true,
    randers:{
        compo: null
    },
}

const Offlineslice = createSlice({
    name:"offlline-store",
    initialState:init,
    reducers:{
        togglestate(state, action){
            state.storeonline = action.payload
        },
        setoffrender(state, actions){
            state.randers.compo = actions.payload?.key == state.randers.compo?.key? null : actions.payload
        }
    }
})

export const {togglestate, setoffrender} = Offlineslice.actions

export default Offlineslice.reducer