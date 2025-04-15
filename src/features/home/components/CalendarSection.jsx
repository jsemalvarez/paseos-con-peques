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
    <div id='calendarSection' className='min-h-screen py-[100px] flex justify-center'>
      <div className='w-full md:w-8/10 max-w-[1200px]'>

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
