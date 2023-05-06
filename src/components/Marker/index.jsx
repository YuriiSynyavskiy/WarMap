import L from 'leaflet'
import images, { enemyImages } from '../../images'
import { Marker, Popup } from 'react-leaflet'
import React, { useMemo, useRef } from 'react'
import { Button } from 'antd'

import './index.css'

const DraggableMarker = ({
  position,
  fetchPositions,
  setModalOpen,
  setPositionToEdit,
  editableMode,
  draggable,
}) => {
  const { id, name, enemy, type, lat, lng, count, description } = position

  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker) {
          const newPosition = marker.getLatLng()
          const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, lat: newPosition.lat, lng: newPosition.lng }),
          }
          fetch('http://127.0.0.1:5000/position', requestOptions)
            .then((response) => response.json())
            .then(() => fetchPositions())
        }
      },
    }),
    [],
  )
  const removePosition = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }
    fetch('http://127.0.0.1:5000/position', requestOptions)
      .then((response) => response.json())
      .then(() => fetchPositions())
  }

  const editPosition = () => {
    setModalOpen(true)
    setPositionToEdit()
  }

  return (
    <Marker
      autoPan
      draggable={draggable}
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
      position={[lat, lng]}
    >
      <Popup>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>{name}</div>
        <div>
          Широта: {lat.toFixed(7)}; Довгота: {lng.toFixed(7)};
        </div>
        <div>{count ? <div style={{ marginTop: '10px' }}>Кількість: {count}</div> : <></>}</div>
        <div>
          {description ? <div style={{ marginTop: '10px' }}>Опис: {description}</div> : <></>}
        </div>
        {editableMode ? (
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={editPosition}>Редагувати</Button>
            <Button danger onClick={removePosition}>
              Видалити
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Popup>
    </Marker>
  )
}

export default DraggableMarker
