import { eventService } from "../services/eventService"
import { addNewEvent, deleteEvent, initProcessingData, setEvents, updateEvent } from "./eventSlice";


export const startSavingNewEvent = (newEvent) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )
        const response = await eventService.saveNewEvent(newEvent);
        dispatch( addNewEvent({id:response.id, newEvent}) )    
    }
}

export const startGetingEvents = () => {
    return async( dispatch) => {
        dispatch( initProcessingData() )
        const response = await eventService.getEvents();
        dispatch( setEvents( response.data ));
    }
}

export const startUpdatingEvent = (updatedData) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )
        await eventService.updateEvent(updatedData.id, updatedData);
        dispatch( updateEvent(updatedData) )
    }
}

export const startDeletingEvent = (id) => {
    return async(dispatch) => {
        dispatch( initProcessingData() )
        await eventService.deleteEvent(id)
        dispatch( deleteEvent(id))
    }
}

