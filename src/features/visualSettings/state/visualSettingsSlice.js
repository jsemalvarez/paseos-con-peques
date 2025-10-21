import { createSlice } from "@reduxjs/toolkit";


export const visualSettingsSlice = createSlice({
    name: 'visualSettings',
    initialState: {
        isProcessing : false,
        isShowBuses: false,
        isShowRoutes: false,
    },
    reducers:{
        initProcessingData: (state) => {
            state.isProcessing  = true;
        },
        setSettings:(state, {payload}) => {
            state.isShowBuses = payload.showBuses
            state.isShowRoutes = payload.showRoutes
            state.isProcessing = false;
        },
        setShowBuses:(state, action) => {
            state.isShowBuses = action.payload
            state.isProcessing = false;
        },
        setShowRoutes:(state, action) => {
            state.isShowRoutes = action.payload
            state.isProcessing = false;
        },
    }
})

export const { 
    initProcessingData, 
    setShowBuses, 
    setShowRoutes, 
} = visualSettingsSlice.actions;