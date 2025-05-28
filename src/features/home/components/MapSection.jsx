import { useMemo, useState } from 'react'
import { MapView } from '../../common/components/map/MapView'
import { Markers } from '../../common/components/map/Markers'
import { usePlaces } from '../../places/hooks/usePlaces'
import { AGE_RANGES } from '../../common/utils/constants'

export const MapSection = () => {

  const [category, setCategory] = useState('all')
  // const [filteredPlaces, setFilteredPlaces] = useState([])
  const { places, handleOpenPlaceDetail } = usePlaces();
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);

  // useEffect(() => {
  //   setFilteredPlaces( places )
  // },[])

  // useEffect(() => {
  //   const filteredPlaces = places.filter(place => place.categories.includes(category))
  //   setFilteredPlaces(( category == 'all' ) ? places : filteredPlaces)
  // },[category, places])

  const handleAgeRangeChange = (rangeId) => {
    setSelectedAgeRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((id) => id !== rangeId)
        : [...prev, rangeId]
    )
  };

  const filteredPlaces = useMemo(() =>{
    return places.filter( place => {
      const hasPlaceCategory = category === 'all'||  place.categories.length == 0 || place.categories.includes(category);
      const hasPlaceAgeRange = selectedAgeRanges.length === 0 || place.ageRanges.some((range) => selectedAgeRanges.includes(range))
      return hasPlaceCategory && hasPlaceAgeRange;
    })
  },[category, selectedAgeRanges, places])


  return (
    <div id='mapSection' className='min-h-screen py-[100px] flex flex-col justify-center items-center'>

      <p className='text-secondary'>*Click en los iconos para mas info</p>
      <div className='w-8/10 max-w-[1200px] rounded-xl bg-primary overflow-hidden'>
        <div className='aspect-[1/1] md:aspect-[10/5]'>
          <MapView>
            <Markers places={filteredPlaces} handleClick={handleOpenPlaceDetail} /> 
          </MapView>
        </div>

        <div className="text-white px-4 py-2 flex flex-wrap gap-2 items-center justify-center">
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

        <div className="w-full max-w-md mx-auto flex justify-center items-center flex-col md:flex-row gap-4 p-2 border-t-1 border-secondary">
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
    </div>
  )
}
