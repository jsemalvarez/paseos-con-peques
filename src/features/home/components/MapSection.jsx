import React, { useEffect, useState } from 'react'
import { MapView } from '../../common/components/map/MapView'
import { Markers } from '../../common/components/map/Markers'
import { usePlaces } from '../../places/hooks/usePlaces'

export const MapSection = () => {

  const [category, setCategory] = useState('all')
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const { places } = usePlaces();

  useEffect(() => {
    setFilteredPlaces( places )
  },[])

  console.log( places )

  useEffect(() => {
    const filteredPlaces = places.filter(place => place.categories.includes(category))
    setFilteredPlaces(( category == 'all' ) ? places : filteredPlaces)
  },[category, places])


  return (
    <div className='min-h-screen bg-secondary py-[100px] flex justify-center items-center'>

      <div className='w-8/10 max-w-[1200px] rounded-xl bg-red-500 overflow-hidden'>
        <div className='h-[600px]'>
          <MapView>
            <Markers places={filteredPlaces} /> 
          </MapView>
        </div>

        <div class="bg-blue-600 text-white px-4 py-2 flex flex-wrap gap-2 items-center justify-center">
          <button
           class="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition cursor-pointer"
           onClick={() => setCategory('all')}
          >
             <span class="text-sm">Todos</span>
          </button>
          <button
           class="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition cursor-pointer"
           onClick={() => setCategory('entertime')}
          >
             <span class="text-sm">Entretenimiento</span>
          </button>
          <button
           class="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition cursor-pointer"
           onClick={() => setCategory('food')}
          >
             <span class="text-sm">Gastronomía</span>
          </button>
          <button
           class="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition cursor-pointer"
           onClick={() => setCategory('outdoors')}
          >
             <span class="text-sm">Al aire libre</span>
          </button>
          <button
           class="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition cursor-pointer"
           onClick={() => setCategory('allDay')}
          >
             <span class="text-sm">Pasar el Dia</span>
          </button>
          <button
           class="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition cursor-pointer"
           onClick={() => setCategory('culture')}
          >
             <span class="text-sm">Cultura</span>
          </button>
          <button
           class="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition cursor-pointer"
           onClick={() => setCategory('supervision')}
          >
             <span class="text-sm">Con profes</span>
          </button>
        </div>

      </div>
    </div>
  )
}
