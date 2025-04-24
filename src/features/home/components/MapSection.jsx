import React, { useEffect, useState } from 'react'
import { MapView } from '../../common/components/map/MapView'
import { Markers } from '../../common/components/map/Markers'
import { usePlaces } from '../../places/hooks/usePlaces'

export const MapSection = () => {

  const [category, setCategory] = useState('all')
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const { places, handleOpenPlaceDetail } = usePlaces();

  useEffect(() => {
    setFilteredPlaces( places )
  },[])


  useEffect(() => {
    const filteredPlaces = places.filter(place => place.categories.includes(category))
    setFilteredPlaces(( category == 'all' ) ? places : filteredPlaces)
  },[category, places])


  return (
    <div id='mapSection' className='min-h-screen py-[100px] flex justify-center items-center'>

      <div className='w-8/10 max-w-[1200px] rounded-xl bg-red-500 overflow-hidden'>
        <div className='h-[600px]'>
          <MapView>
            <Markers places={filteredPlaces} handleClick={handleOpenPlaceDetail} /> 
          </MapView>
        </div>

        <div className="bg-primary text-white px-4 py-2 flex flex-wrap gap-2 items-center justify-center">
          <button
           className="flex items-center gap-1 bg-secondary text-primary px-3 py-1 rounded-full hover:bg-rose-300 transition-all duration-300 cursor-pointer"
           onClick={() => setCategory('all')}
          >
             <span className="text-sm">Todos</span>
          </button>
          <button
           className="flex items-center gap-1 bg-secondary text-primary px-3 py-1 rounded-full hover:bg-rose-300 transition-all duration-300 cursor-pointer"
           onClick={() => setCategory('entertime')}
          >
             <span className="text-sm">Entretenimiento</span>
          </button>
          <button
           className="flex items-center gap-1 bg-secondary text-primary px-3 py-1 rounded-full hover:bg-rose-300 transition-all duration-300 cursor-pointer"
           onClick={() => setCategory('food')}
          >
             <span className="text-sm">Gastronomía</span>
          </button>
          <button
           className="flex items-center gap-1 bg-secondary text-primary px-3 py-1 rounded-full hover:bg-rose-300 transition-all duration-300 cursor-pointer"
           onClick={() => setCategory('outdoors')}
          >
             <span className="text-sm">Al aire libre</span>
          </button>
          <button
           className="flex items-center gap-1 bg-secondary text-primary px-3 py-1 rounded-full hover:bg-rose-300 transition-all duration-300 cursor-pointer"
           onClick={() => setCategory('all_day')}
          >
             <span className="text-sm">Pasar el Dia</span>
          </button>
          <button
           className="flex items-center gap-1 bg-secondary text-primary px-3 py-1 rounded-full hover:bg-rose-300 transition-all duration-300 cursor-pointer"
           onClick={() => setCategory('culture')}
          >
             <span className="text-sm">Cultura</span>
          </button>
          <button
           className="flex items-center gap-1 bg-secondary text-primary px-3 py-1 rounded-full hover:bg-rose-300 transition-all duration-300 cursor-pointer"
           onClick={() => setCategory('supervision')}
          >
             <span className="text-sm">Con profes</span>
          </button>
        </div>

      </div>
    </div>
  )
}
