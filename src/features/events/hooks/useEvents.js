import { useDispatch, useSelector } from 'react-redux'
import { startDeletingEvent, startGetingEvents, startSavingNewEvent, startUpdatingEvent } from '../state/thunk';

export const useEvents = () => {

    const dispatch = useDispatch();
    const { events, isProcessing } = useSelector( state => state.events );

    const saveEvent = (newEvent) => {
        dispatch(startSavingNewEvent(newEvent)) 
    }

    const getEvents = () => {
        dispatch( startGetingEvents() )
    }

    const deleteEvent = (id) => {
        dispatch( startDeletingEvent(id) )
    }

    const updateEvent = (eventToUptade) => {
        dispatch( startUpdatingEvent(eventToUptade) )
    }

    return (
        {
            events,
            isProcessing,
            saveEvent,
            getEvents,
            updateEvent,
            deleteEvent,
        }
    )
}
