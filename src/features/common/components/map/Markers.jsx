import React from 'react'

import { Marker } from 'react-leaflet'

import { createSvgIcon } from '../../../places/utils/createSvgIcon'
import { ICONS_BY_TYPE } from '../../../places/utils/iconsByType'
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

              const placeType = place.iconType || ICONS_BY_TYPE.PLAY_ROOM;
              const svgIconType = ICONS_BY_TYPE[ placeType ] || {};

              const bgColor = COLORS_BY_CATEGORIES[ place.bgColor] || COLORS_BY_CATEGORIES.ENTERTIME; 
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
