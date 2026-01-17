import { createSlice } from "@reduxjs/toolkit";


export const driverSlice = createSlice({
    name: 'drivers',
    initialState: {
        isProcessing : false,
        drivers:[],
        driverDetail:{},
    },
    reducers:{
        initProcessingData: (state) => {
            state.isProcessing  = true;
        },
        addNewDriver: (state, action) => {
            state.drivers.push(action.payload);
            state.isProcessing  = false;
        },
        updateDriver:(state, action) => {
            const updatedDrivers = state.drivers.map(driver => {
                if(driver.id == action.payload.id){
                    return {
                        ...driver,
                        ...action.payload,
                        id: driver.id
                    }
                }
                return driver
            })
            state.drivers = updatedDrivers;
            state.isProcessing  = false;
        },
        deleteDriver:(state, action) => {
            const filteredDrivers = state.drivers.filter( driver => driver.id != action.payload);
            state.drivers = filteredDrivers;
            state.isProcessing  = false;
        },
        setDrivers:(state, action) => {
            state.drivers = action.payload
            state.isProcessing = false;
        },

    }
})

export const { 
    initProcessingData, 
    addNewDriver, 
    updateDriver, 
    deleteDriver, 
    setDrivers, 
} = driverSlice.actions;