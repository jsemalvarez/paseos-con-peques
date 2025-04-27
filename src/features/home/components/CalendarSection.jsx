import React from 'react'
import { useEvents } from '../../events/hooks/useEvents';
import { formatEvents } from '../../events/services/eventService';
import { Calendar } from '../../events/components/Calendar';
import { CalendarDayAside } from '../../events/components/CalendarDayAside';
import { EventDetail } from '../../events/components/EventDetail';

export const CalendarSection = () => {

  const { events, handleOpenEventDetail, handleOpenCalendarDayAside } = useEvents()

  const formattedEvents = formatEvents( events );

  return (
    <div className='min-h-screen py-[100px]'>
      <div className='flex flex-wrap justify-center gap-4 p-4'>

        <Calendar   
          events={formattedEvents} 
          openEventDetail={handleOpenEventDetail}
          openCalendarDayAside={handleOpenCalendarDayAside}
        />
        <CalendarDayAside />
        <EventDetail />

      </div>        
    </div>
  )
}
