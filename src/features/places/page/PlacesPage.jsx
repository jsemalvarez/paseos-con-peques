import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { usePlaces } from '../hooks/usePlaces'

import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'

export const PlacesPage = () => {

  const { places, isProcessing, deletePlace, getPlaces } = usePlaces()

  const handleDelete = (id) => {
    deletePlace(id)
  }

  useEffect(() => {
    getPlaces()
  },[])

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
              <div key={place.id } className='flex-1 min-w-[250px] max-w-[400px] h-[200px] flex flex-col p-2 rounded-lg shadow-md bg-secondary'>
                <div className='flex-1 bg-primary rounded-lg p-2'>                  
                  <h3>{ place.name }</h3>

                </div>
                <footer className='flex gap-2 mt-2'>
                  <Link 
                    to={`/places/edit/${place.id}`}
                    className='bg-yellow-500 flex-1 cursor-pointer rounded-full flex justify-center'
                  >Editar</Link>
                  {/* TODO: hacer un cartel de confirmacion antes de eliminar */}
                  <button 
                    className='bg-red-500 flex-1 cursor-pointer rounded-full disabled:cursor-not-allowed'
                    onClick={ () => handleDelete(place.id) }
                    disabled={ isProcessing }
                  >{`${ isProcessing ? 'Eliminando...':'Eliminar'}`}</button>
                </footer>
              </div>
            ))
          }

        </div>
      </div>
    </PrivateLoyout>
  )
}
