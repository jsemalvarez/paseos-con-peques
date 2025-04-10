import React from 'react'
import { MapView } from '../../common/components/map/MapView'
import { Markers } from '../../common/components/map/Markers'

export const MapSection = () => {
  return (
    <div className='min-h-screen bg-secondary py-[100px] flex justify-center items-center'>

      <div className='w-9/10 max-w-[1200px] rounded-xl bg-red-500 overflow-hidden'>
        <div className='h-[600px]'>
          <MapView>
            <Markers /> 
          </MapView>
        </div>
        <div className='bg-blue-500'>
          <p>Selectores </p>
        </div>
      </div>
    </div>
  )
}
