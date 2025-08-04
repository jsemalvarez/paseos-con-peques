import { useEffect, useMemo, useState } from 'react'
import { MapView } from '../../../common/components/map/MapView'
import { Markers } from '../../../common/components/map/Markers'
import { usePlaces } from '../../../places/hooks/usePlaces'
import { AGE_RANGES } from '../../../common/utils/constants'
import { CATEGORIES, CATEGORIES_TRANSLATE } from '../../../places/utils/categories'
import { BtnFilterMap } from './BtnFilterMap'


export const MapSection = () => {

  const [category, setCategory] = useState('all')
  const { places, handleOpenPlaceDetail } = usePlaces();
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

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


  if (!isOnline) {
    return (
      <div 
        id='mapSection' 
        className='min-h-screen py-[100px] flex flex-col justify-center items-center'
      >
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mt-4">
          <p className="font-semibold">Mapa no disponible sin conexión</p>
        </div>
      </div>
    );
  }


  return (
    <div id='mapSection' className='min-h-screen py-[100px] flex flex-col justify-center items-center'>

      <p className='text-secondary'>*Click en los iconos para mas info</p>
      <div className='w-9/10 max-w-[1200px] rounded-xl bg-primary overflow-hidden'>
        <div className='aspect-[4/5] md:aspect-[10/5]'>
          <MapView>
            <Markers places={filteredPlaces} handleClick={handleOpenPlaceDetail} /> 
          </MapView>
        </div>

        <div className="text-white px-4 py-2 flex flex-wrap gap-2 items-center justify-center">
          <BtnFilterMap
            key='all'
            value='all'
            label={ 'Todos' }
            handleClick={ setCategory }
            isActive={ category == 'all'}
          />
          {
            Object.values(CATEGORIES).map( categoryName => (
              <BtnFilterMap
                key={ categoryName }
                value={ categoryName }
                label={CATEGORIES_TRANSLATE[categoryName]}
                handleClick={ setCategory }
                isActive={ category == categoryName}
              />
            ))
          }
        </div>

        <div className="flex justify-center items-center bg-secondary">
          <div className="w-full max-w-md flex flex-wrap justify-center items-center flex-row gap-2 p-2">
            {AGE_RANGES.map(({ id, label }) => (
              <label key={id} className="flex items-center justify-center grow-1 gap-2 text-sm px-2 py-1 bg-primary rounded-md">
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
    </div>
  )
}
