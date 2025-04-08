
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useEvents } from '../hooks/useEvents'

import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { Calendar } from '../components/Calendar'
import { formatEvents } from '../services/eventService'
import { EventDetail } from '../components/EventDetail'

export const EventsPage = () => {

  const { events, getEvents, handleOpenEventDetail } = useEvents()

  const formattedEvents = formatEvents( events );

  useEffect(() => {
    getEvents()
  },[])

  return (
    <PrivateLoyout>
      <div>
        <div className='flex justify-center'>
          <Link 
            to='/events/new'
            className='btn-primary'
          >Nuevo Evento</Link>
        </div>

        <div className='flex flex-wrap justify-center gap-4 p-4'>

          <Calendar   
            events={formattedEvents} 
            openEventDetail={handleOpenEventDetail}
          />
          <EventDetail />

        </div>
      </div>
    </PrivateLoyout>
  )
}

