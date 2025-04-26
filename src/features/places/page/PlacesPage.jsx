import { Link } from 'react-router-dom'

import { usePlaces } from '../hooks/usePlaces'

import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { PlaceCard } from '../components/PlaceCard'
import { useMemo, useState } from 'react'

export const PlacesPage = () => {

  const { places } = usePlaces();

  const [searchingPlace, setSearchingPlace] = useState('');

  const filteredPlaces = useMemo(() => {
    const term = searchingPlace.trim().toLowerCase()
    if (term.length <= 1) return places
    return places.filter((place) =>
      place.name.toLowerCase().includes(term)
    )
  }, [places, searchingPlace])



  return (
    <PrivateLoyout>
      <div>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Buscar lugar..."
            value={searchingPlace}
            onChange={(e) => setSearchingPlace(e.target.value)}
            className="w-full max-w-md mx-6 bg-secondary p-2 border-2 border-primary rounded-lg focus:outline-hidden"
          />
        </div>

        <div className='flex justify-center'>
          <Link 
            to='/places/new'
            className='btn-primary'
          >Nuevo Lugar</Link>
        </div>

        <div className='flex flex-wrap justify-center gap-4 p-4'>
          {
            filteredPlaces.map( place => ( 
             <PlaceCard key={place.id} place={place} />
            ))
          }

        </div>
      </div>
    </PrivateLoyout>
  )
}
