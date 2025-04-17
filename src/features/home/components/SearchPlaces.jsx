import { useEffect, useMemo, useState } from 'react'
import { usePlaces } from '../../places/hooks/usePlaces'
import { PlaceCard } from '../../places/components/PlaceCard'
import { Link } from 'react-router-dom'

export const SearchPlaces = () => {

  const { places } = usePlaces()

  const [searchingPlace, setSearchingPlace] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 6
    
  const filteredPlaces = useMemo(() => {
    const term = searchingPlace.trim().toLowerCase()
    if (term.length <= 1) return places
    return places.filter((place) =>
      place.name.toLowerCase().includes(term)
    )
  }, [places, searchingPlace])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchingPlace])

  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE)
  const currentPlaces = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredPlaces.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredPlaces, currentPage])

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1))

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  

  return (
    <div id='searchSection' className='min-h-screen bg-secondary py-[100px]'>

    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Buscar lugar..."
        value={searchingPlace}
        onChange={(e) => setSearchingPlace(e.target.value)}
        className="w-full max-w-md mx-6 p-2 border-2 border-primary rounded-lg focus:outline-hidden"
      />
    </div>

    <div className='flex flex-wrap justify-center gap-4 p-4'>
      {
        currentPlaces.map( place => ( 
          <PlaceCard key={place.id} place={place} />
        ))
      }

    </div>

    {totalPages > 1 && (
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-full bg-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-full bg-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    )}

    </div>
  )
}
