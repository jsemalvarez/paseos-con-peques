import { eventService } from "../services/eventService"
import { formatEvent } from "../utils/formatEvent";
import { addNewEvent, closeEventDetail, deleteEvent, initProcessingData, setEvents, updateEvent } from "./eventSlice";


export const startSavingNewEvent = (newEvent) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )
        const response = await eventService.saveNewEvent(newEvent);
        dispatch( addNewEvent({id:response.id, ...newEvent}) )    
    }
}

export const startGetingEvents = () => {
    return async( dispatch) => {
        dispatch( initProcessingData() )
        const response = await eventService.getEvents();
        
        if(response.ok){
            const eventsFormatted = response.data.map( formatEvent );
            dispatch( setEvents( eventsFormatted ));
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
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
        dispatch( closeEventDetail())
        dispatch( deleteEvent(id))
    }
}

