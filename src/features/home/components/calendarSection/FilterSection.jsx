import { useEffect, useMemo, useState } from 'react'

import { AGE_RANGES, EVENT_TYPES, PRICE_EVENTS } from '../../../common/utils/constants';
import { useEvents } from '../../../events/hooks/useEvents';
import { formatEvents } from '../../../events/services/eventService';
import { FilterEventByTag } from './FilterEventByTag';

export const FilterSection = ({ setFilteredEvents }) => {

    const { events } = useEvents()

    const [searchingEvent, setSearchingEvent] = useState('');
    const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
    const [selectedPriceEvent, setSelectedPriceEvent] = useState([])
    const [selectedEventType, setSelectedEventType] = useState([])

    const filteredEvents = useMemo(() => {
        const term = searchingEvent.trim().toLowerCase();
        return events.filter((event) => {
            const matchesSearchTitle = term.length <= 1 || event.title.toLowerCase().includes(term);
            const matchesSearchDescription = term.length <= 1 || event.description.toLowerCase().includes(term);
            const matchesSearchArtists = term.length <= 1 || event.artists.toLowerCase().includes(term);
            const matchesSearch = matchesSearchTitle || matchesSearchDescription || matchesSearchArtists;
            const matchesAge = selectedAgeRanges.length === 0 || event.ageRanges?.some((range) => selectedAgeRanges.includes(range));
            const matchesEventType = selectedEventType.length === 0 || event.activityTypes?.some((activityType) => selectedEventType.includes(activityType));
            const matchesPriceEvent = selectedPriceEvent.length === 0 || selectedPriceEvent.includes(event.priceType);            
        return matchesSearch 
            && matchesAge 
            && matchesPriceEvent 
            && matchesEventType;
        });
    }, [searchingEvent, selectedAgeRanges, events, selectedPriceEvent, selectedEventType]);

    const formattedEvents = useMemo(() => formatEvents( filteredEvents ), [filteredEvents]) ; 

    useEffect(()=>{
        setFilteredEvents(formattedEvents)
    },[formattedEvents, setFilteredEvents])

    return (
        <div className="flex flex-col justify-center items-center gap-1 mb-6">
            <input
                type="text"
                placeholder="Nombre del artista o evento"
                value={searchingEvent}
                onChange={(e) => setSearchingEvent(e.target.value)}
                className="w-full max-w-md bg-primary p-2 border-2 border-secondary rounded-lg focus:outline-hidden"
            />

            <FilterEventByTag
                labelTag='Edad recomendada:'
                elementsTag={ AGE_RANGES }
                selectedTag={selectedAgeRanges}
                setSelectedTag={setSelectedAgeRanges}
            />


            <FilterEventByTag
                labelTag='Tipo de entrada:'
                elementsTag={ PRICE_EVENTS }
                selectedTag={selectedPriceEvent}
                setSelectedTag={setSelectedPriceEvent}
            />

            <FilterEventByTag
                labelTag='Tipo de actividad:'
                elementsTag={ EVENT_TYPES }
                selectedTag={selectedEventType}
                setSelectedTag={setSelectedEventType}
            />
        </div>
    )
}
