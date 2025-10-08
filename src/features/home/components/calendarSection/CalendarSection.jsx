
import { useState } from 'react';
import { useEvents } from '../../../events/hooks/useEvents';
import { Calendar } from '../../../events/components/Calendar';
import { CalendarDayAside } from '../../../events/components/CalendarDayAside';
import { EventDetail } from '../../../events/components/EventDetail';
import { FilterSection } from './FilterSection';
import { FeaturedEvents } from './FeaturedEvents';


export const CalendarSection = () => {

  const { events } = useEvents()

  const [filteredEvents, setFilteredEvents] = useState([]);

  const { handleOpenEventDetail, handleOpenCalendarDayAside } = useEvents();

  return (
    <div id='calendarSection' className='min-h-screen py-[100px]'>

      <FeaturedEvents
        events={events}
        openEventDetail={handleOpenEventDetail}
      />

      <div className='w-full md:w-8/10 max-w-[1200px] mx-auto'>
        <Calendar   
          events={filteredEvents} 
          openEventDetail={handleOpenEventDetail}
          openCalendarDayAside={handleOpenCalendarDayAside}
        />
        <CalendarDayAside />
        <EventDetail />
      </div>

      <FilterSection 
        setFilteredEvents={ setFilteredEvents }
      />       

    </div>
  )
}
