import { createSlice } from "@reduxjs/toolkit";


export const placeSlice = createSlice({
    name: 'places',
    initialState: {
        isSaving: false,
        places:[],
        // activePlace: null,
        activePlace: {
            uid:null,
            name:null,
        }
    },
    reducers:{
        isSavingNewPlace: (state) => {
            state.isSaving = true;
        },
        addNewPlace: (state, action) => {
            state.places.push(action.payload);
            state.isSaving = false;
        },
        updatePlaceById:(state, action) => {
            const updatedPlaces = state.places.map(place => {
                if(place.uid == action.payload.uid){
                    return {
                        ...place,
                        ...action.payload,
                        uid: place.uid
                    }
                }
                return place
            })
            state.places = updatedPlaces;
        },
        deletePlaceById:(state, action) => {
            const filteredPlaces = state.places.filter( place => place.uid != action.payload);
            state.places = filteredPlaces;
        },
    }
})

export const { isSavingNewPlace, addNewPlace, updatePlaceById, deletePlaceById } = placeSlice.actions;