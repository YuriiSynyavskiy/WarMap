import React, { useRef, useState, useEffect } from 'react'
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

import PositionModal from '../PositionModal'

import './index.css'

const MIN_ZOOM = 3

const MapEvents = ({ map, setMouseCoords, setModalOpen, setNewPositionCoords }) => {
  useMapEvents({
    mousemove(e) {
      setMouseCoords({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
    click(e) {
      setNewPositionCoords({ lat: e.latlng.lat, lng: e.latlng.lng })
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

  const [mouseCoords, setMouseCoords] = useState({ lat: 47.69, lng: 37.83 })
  const [newPositionCoords, setNewPositionCoords] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [positions, setPositions] = useState([])

  const closeModal = () => setModalOpen(false)

  const createMarker = (newMarker) => setPositions((prevMarkers) => [...prevMarkers, newMarker])

  const xLat = mouseCoords.lat.toFixed(3)
  const yLng = mouseCoords.lng.toFixed(3)
  
  useEffect(() => {
    // Update the document title using the browser API
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('http://127.0.0.1:5000/positions', requestOptions)
        .then(response => response.json())
        .then(data => setPositions(data))
    }, [])

  return (
    <div>
      <MapContainer
        center={[47.69, 37.83]}
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
        {positions.map(({ name, type, lat, lng }) => (
          <Marker icon={customIcon} key={Math.random()} position={[lat, lng]}>
            <Popup>{name}</Popup>
          </Marker>
        ))}
        <MapEvents
          map={map}
          setMouseCoords={setMouseCoords}
          setModalOpen={setModalOpen}
          setNewPositionCoords={setNewPositionCoords}
        />
      </MapContainer>
      <PositionModal
        isOpen={modalOpen}
        closeModal={closeModal}
        positionCoords={newPositionCoords}
        createMarker={createMarker}
      />
    </div>
  )
}

export default WarMap
