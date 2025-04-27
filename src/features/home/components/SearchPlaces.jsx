import React from 'react'
import { usePlaces } from '../../places/hooks/usePlaces'
import { PlaceCard } from '../../places/components/PlaceCard'
import { Link } from 'react-router-dom'

export const SearchPlaces = () => {

    const { places } = usePlaces()

  return (
    <div className='min-h-screen bg-secondary py-[100px]'>

      <div className='flex justify-center'>
        <Link 
          to='/places/new'
          className='btn-primary'
        >Nuevo Lugar</Link>
      </div>

      <div className='flex flex-wrap justify-center gap-4 p-4'>
        {
          places.map( place => ( 
            <PlaceCard key={place.id} place={place} />
          ))
        }

      </div>

    </div>
  )
}
