import { createSlice } from "@reduxjs/toolkit";


export const eventSlice = createSlice({
    name: 'events',
    initialState: {
        isProcessing : false,
        events:[],
        productDetail:{},
        isEventDetailOpen: false
    },
    reducers:{
        initProcessingData: (state) => {
            state.isProcessing  = true;
        },
        addNewEvent: (state, action) => {
            state.events.push(action.payload);
            state.isProcessing  = false;
        },
        updateEvent:(state, action) => {
            const updatedEvents = state.events.map(event => {
                if(event.id == action.payload.id){
                    return {
                        ...event,
                        ...action.payload,
                        id: event.id
                    }
                }
                return event
            })
            state.events = updatedEvents;
            state.isProcessing  = false;
        },
        deleteEvent:(state, action) => {
            const filteredEvents = state.events.filter( event => event.id != action.payload);
            state.events = filteredEvents;
            state.isProcessing  = false;
        },
        setEvents:(state, action) => {
            state.events = action.payload
            state.isProcessing = false;
        },
        openEventDetail:(state, action) => {
            state.productDetail = action.payload
            state.isEventDetailOpen = true
        },
        closeEventDetail:(state) => {
            state.isEventDetailOpen = false
            state.productDetail = {}
        },
    }
})

export const { initProcessingData, addNewEvent, updateEvent, deleteEvent, setEvents, openEventDetail, closeEventDetail } = eventSlice.actions;