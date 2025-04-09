import { Link } from 'react-router-dom'

import { usePlaces } from '../hooks/usePlaces'

import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { PlaceCard } from '../components/PlaceCard'

export const PlacesPage = () => {

  const { places } = usePlaces()


  return (
    <PrivateLoyout>
      <div>
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
    </PrivateLoyout>
  )
}
