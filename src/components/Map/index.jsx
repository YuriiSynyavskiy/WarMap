import React, { useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

const customIcon = new L.Icon({
  iconUrl:
    'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
  iconRetinaUrl:
    'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
  iconAnchor: [15, 15],
  popupAnchor: [0, -12],
  iconSize: new L.Point(32, 32),
  className: 'leaflet-div-icon',
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
})

import MapModal from '../AddMarkerModal'

import './index.css'

const MIN_ZOOM = 3

const MapEvents = ({ map, setPosition, setModalOpen, setMarkerPosition }) => {
  useMapEvents({
    mousemove(e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
    click(e) {
      setMarkerPosition({ lat: e.latlng.lat, lng: e.latlng.lng })
      setModalOpen(true)
    },
    zoom(e) {
      if (e.target._zoom < MIN_ZOOM) map.current.setZoom(MIN_ZOOM)
    },
  })
  return false
}

function WarMap() {
  const map = useRef()

  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 })
  const [markerPosition, setMarkerPosition] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [markers, setMarkers] = useState([])

  const closeModal = () => setModalOpen(false)

  const createMarker = (newMarker) => setMarkers((prevMarkers) => [...prevMarkers, newMarker])

  const xLat = position.lat.toFixed(3)
  const yLng = position.lng.toFixed(3)

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        className='map-container'
        zoom={13}
        scrollWheelZoom={true}
        ref={map}
      >
        <TileLayer
          attribution={`X: ${xLat} Y: ${[yLng]}`}
          url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
          subdomains={['mt1', 'mt2', 'mt3']}
        />
        {markers.map(({ name, position }) => (
          <Marker icon={customIcon} key={Math.random()} position={[position.lat, position.lng]}>
            <Popup>{name}</Popup>
          </Marker>
        ))}
        <MapEvents
          map={map}
          setPosition={setPosition}
          setModalOpen={setModalOpen}
          setMarkerPosition={setMarkerPosition}
        />
      </MapContainer>
      <MapModal
        isOpen={modalOpen}
        setClose={closeModal}
        markerPosition={markerPosition}
        createMarker={createMarker}
      />
    </div>
  )
}

export default WarMap
