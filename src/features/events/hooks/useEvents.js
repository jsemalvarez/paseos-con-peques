import { useDispatch, useSelector } from 'react-redux'
import { startDeletingEvent, startGetingEvents, startSavingNewEvent, startUpdatingEvent } from '../state/thunk';
import { closeCalendarDayAside, closeEventDetail, openCalendarDayAside, openEventDetail } from '../state/eventSlice';

export const useEvents = () => {

    const dispatch = useDispatch();
    const { 
        events, 
        productDetail, 
        isProcessing, 
        isEventDetailOpen, 
        isCalendarDayAsideOpen, 
        calendarDayEvents 
    } = useSelector( state => state.events );

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

    const handleOpenEventDetail = ( event ) => {
        dispatch( openEventDetail( event ) )
    }

    const handleCloseEventDetail = () => {
        dispatch( closeEventDetail() )
    }

    const handleOpenCalendarDayAside = ( events ) => {
        dispatch( openCalendarDayAside( events ) )
    }

    const handleCloseCalendarDayAside = () => {
        dispatch( closeCalendarDayAside() )
    }

    return (
        {
            events,
            isProcessing,
            isEventDetailOpen,
            isCalendarDayAsideOpen,
            productDetail,
            calendarDayEvents,
            saveEvent,
            getEvents,
            updateEvent,
            deleteEvent,
            handleOpenEventDetail,
            handleCloseEventDetail,
            handleOpenCalendarDayAside,
            handleCloseCalendarDayAside,
        }
    )
}
