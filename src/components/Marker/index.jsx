import L from 'leaflet'
import images, { enemyImages } from '../../images'
import { Marker, Popup } from 'react-leaflet'
import React, { useMemo, useRef, useState } from 'react'

import './index.css'

const DraggableMarker = ({ type, enemy, lat, lng, name, id }) => {
  const [position, setPosition] = useState([lat, lng])
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker) {
          const newPosition = marker.getLatLng()
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, lat: newPosition.lat, lng: newPosition.lng }),
          }
          fetch('http://127.0.0.1:5000/position', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data) || setPosition([data.lat, data.lng]))
        }
      },
    }),
    [],
  )

  return (
    <Marker
      autoPan
      draggable
      eventHandlers={eventHandlers}
      ref={markerRef}
      icon={
        new L.Icon({
          iconUrl: enemy ? enemyImages[type].image : images[type].image,
          iconAnchor: [20, 10],
          popupAnchor: [10, -15],
          iconSize: enemy ? new L.Point(60, 60) : new L.Point(60, 40),
          className: 'leaflet-div-icon',
        })
      }
      position={position}
    >
      <Popup>
        <div>
          {name}
        </div>
      </Popup>
    </Marker>
  )
}

export default DraggableMarker
