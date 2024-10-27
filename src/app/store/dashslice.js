"use client"
import { createSlice } from "@reduxjs/toolkit";

const init = {
    routes: {
        createnew: false,
        documents: false,
        settings: false,
    },
    randers:{
        compo: null
    },
}

const Dashboardslice = createSlice({
    name: "Dashboard",
    initialState: init,
    reducers: {
        createroute(state, actions) {
            state.routes.createnew = actions.payload !== undefined? actions.payload : !state.routes.createnew
        },
        documentroute(state, actions) {
            state.routes.documents = actions.payload !== undefined? actions.payload :  !state.routes.documents
        },
        settingroute(state, actions) {
            state.routes.settings = actions.payload !== undefined? actions.payload :  !state.routes.settings
        },

        setrandercompo(state, actions){
            state.randers.compo = actions.payload?.key == state.randers.compo?.key? null : actions.payload
        }
    }
})

export const { createroute, documentroute, settingroute, markoption, deleteoption, aioption, shareoption, setrandercompo } = Dashboardslice.actions

export default Dashboardslice.reducer