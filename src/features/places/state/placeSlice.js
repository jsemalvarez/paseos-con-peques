import { createSlice } from "@reduxjs/toolkit";


export const placeSlice = createSlice({
    name: 'places',
    initialState: {
        isProcessing : false,
        places:[],
    },
    reducers:{
        initProcessingData: (state) => {
            state.isProcessing  = true;
        },
        addNewPlace: (state, action) => {
            state.places.push(action.payload);
            state.isProcessing  = false;
        },
        updatePlace:(state, action) => {
            const updatedPlaces = state.places.map(place => {
                if(place.id == action.payload.id){
                    return {
                        ...place,
                        ...action.payload,
                        id: place.id
                    }
                }
                return place
            })
            state.places = updatedPlaces;
            state.isProcessing  = false;
        },
        deletePlace:(state, action) => {
            const filteredPlaces = state.places.filter( place => place.id != action.payload);
            state.places = filteredPlaces;
            state.isProcessing  = false;
        },
        setPlaces:(state, action) => {
            state.places = action.payload
            state.isProcessing = false;
        }
    }
})

export const { initProcessingData, addNewPlace, updatePlace, deletePlace, setPlaces } = placeSlice.actions;