import { eventService } from "../services/eventService"
import { formatEvent } from "../utils/formatEvent";
import { addNewEvent, closeEventDetail, deleteEvent, initProcessingData, setEvents, updateEvent } from "./eventSlice";


export const startSavingNewEvent = (newEvent) => {
    return async( dispatch ) => {
        dispatch( initProcessingData() )
        const response = await eventService.saveNewEvent(newEvent);

        if(response.ok){
            dispatch( addNewEvent({id:response.id, ...newEvent}) )   
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }

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
        const response = await eventService.updateEvent(updatedData.id, updatedData);

        if(response.ok){
            dispatch( updateEvent(updatedData) )
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
    }
}

export const startDeletingEvent = (id) => {
    return async(dispatch) => {
        dispatch( initProcessingData() )
        const response = await eventService.deleteEvent(id)

        if(response.ok){
            dispatch( closeEventDetail())
            dispatch( deleteEvent(id))
        }else{
            console.log(response.errorMessage)
            //TODO: implementar dispatch(setError(response.errorMessage));
        }
    }
}

