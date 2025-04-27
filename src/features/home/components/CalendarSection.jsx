import React, { useMemo, useState } from 'react'
import { useEvents } from '../../events/hooks/useEvents';
import { formatEvents } from '../../events/services/eventService';
import { Calendar } from '../../events/components/Calendar';
import { CalendarDayAside } from '../../events/components/CalendarDayAside';
import { EventDetail } from '../../events/components/EventDetail';

export const CalendarSection = () => {

  const { events, handleOpenEventDetail, handleOpenCalendarDayAside } = useEvents()

  const [searchingEvent, setSearchingEvent] = useState('')

  const filteredEvents = useMemo(() => {
    const term = searchingEvent.trim().toLowerCase()
    if (term.length <= 1) return events
    return events.filter((event) =>
      event.title.toLowerCase().includes(term)
    )
  }, [searchingEvent, events])

  const formattedEvents = formatEvents( filteredEvents );  

  return (
    <div id='calendarSection' className='min-h-screen py-[100px]'>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar evento..."
          value={searchingEvent}
          onChange={(e) => setSearchingEvent(e.target.value)}
          className="w-full max-w-md mx-6 bg-primary p-2 border-2 border-secondary rounded-lg focus:outline-hidden"
        />
      </div>

      <div className='w-full md:w-8/10 max-w-[1200px] mx-auto'>

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
