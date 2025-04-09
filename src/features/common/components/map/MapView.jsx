import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { initLatLng } from './mapConstants'


export const MapView = ({ children }) => {

    return (
        <div id='map'>

            <MapContainer center={initLatLng} zoom={14} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                { children }

            </MapContainer>
        </div>

    )
}
