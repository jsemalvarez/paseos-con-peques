import { createSlice } from "@reduxjs/toolkit";


export const eventSlice = createSlice({
    name: 'events',
    initialState: {
        isProcessing : false,
        events:[],
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
        }
    }
})

export const { initProcessingData, addNewEvent, updateEvent, deleteEvent, setEvents } = eventSlice.actions;