
import React from 'react'
import { Marker } from 'react-leaflet'
import { ICONS_BY_TYPE } from '../../../places/utils/iconsByType'
import { createSvgIcon } from '../../../places/utils/createSvgIcon'
import { COLORS_BY_CATEGORIES } from '../../../places/utils/categories'



export const Markers = ({ places, handleClick }) => {


    const eventHandler = (place) => {      
      return {
        click() {
          handleClick(place)
        },
    }}

    return (
      <>
        {
          places.map( place => {

              const placeType = place.iconType || 'parque';
              const svgIconType = ICONS_BY_TYPE[ placeType ] || {};

              const bgColor = COLORS_BY_CATEGORIES[ place.bgColor] || '#616161'; 
              const icon = createSvgIcon({ bgColor, svgIconType });

              return (
                < Marker 
                  key={place.id} 
                  position={place.position} 
                  icon={icon}
                  eventHandlers={ eventHandler(place) }
                />                
              )
            })
        }
    </>
  )
}
