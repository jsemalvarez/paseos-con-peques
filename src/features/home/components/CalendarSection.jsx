import { useMemo, useState } from 'react'
import { useEvents } from '../../events/hooks/useEvents';
import { formatEvents } from '../../events/services/eventService';
import { Calendar } from '../../events/components/Calendar';
import { CalendarDayAside } from '../../events/components/CalendarDayAside';
import { EventDetail } from '../../events/components/EventDetail';
import { AGE_RANGES } from '../../common/utils/constants';


export const CalendarSection = () => {

  const { events, handleOpenEventDetail, handleOpenCalendarDayAside } = useEvents()

  const [searchingEvent, setSearchingEvent] = useState('');
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);

  const handleAgeRangeChange = (rangeId) => {
    setSelectedAgeRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((id) => id !== rangeId)
        : [...prev, rangeId]
    );
  };

  const filteredEvents = useMemo(() => {
    const term = searchingEvent.trim().toLowerCase();
    return events.filter((event) => {
      const matchesSearch = term.length <= 1 || event.title.toLowerCase().includes(term);
      const matchesAge = selectedAgeRanges.length === 0 || event.ageRanges?.some((range) => selectedAgeRanges.includes(range));
      return matchesSearch && matchesAge;
    });
  }, [searchingEvent, selectedAgeRanges, events]);

  //TODO: mejorar este rendimiento, se ejecuta cada vez que dibuja el componente
  const formattedEvents = formatEvents( filteredEvents );  

  return (
    <div id='calendarSection' className='min-h-screen py-[100px]'>

      <div className="flex flex-col justify-center items-center gap-4 m-6">
        <input
          type="text"
          placeholder="Buscar evento..."
          value={searchingEvent}
          onChange={(e) => setSearchingEvent(e.target.value)}
          className="w-full max-w-md bg-primary p-2 border-2 border-secondary rounded-lg focus:outline-hidden"
        />

        <div className="w-full max-w-md flex justify-center flex-col md:flex-row items-center gap-4 mb-6 bg-primary p-2 border-2 border-secondary rounded-lg">
          {AGE_RANGES.map(({ id, label }) => (
            <label key={id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={ id }
                checked={selectedAgeRanges.includes(id)}
                onChange={() => handleAgeRangeChange(id)}
              />
              { label }
            </label>
          ))}
        </div>

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
