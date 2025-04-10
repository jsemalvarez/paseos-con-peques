
import React from 'react'
import { usePlaces } from '../../../places/hooks/usePlaces'
import { Marker } from 'react-leaflet'

export const Markers = () => {
    const { places } = usePlaces()
  return (
    <>
        {
            places.map( place => (
                < Marker key={place.id} position={place.position} />
            ))
        }
    </>
  )
}
