import { useMemo, useRef } from "react"
import { Marker } from "react-leaflet"
import { initLatLng } from "./mapConstants"


export const DraggableMarker = ({position, setPosition}) => {

    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position || initLatLng}
        ref={markerRef}>
      </Marker>
    )
  }
