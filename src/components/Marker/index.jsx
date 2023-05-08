import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'antd'
import mergeImages from 'merge-images'

import {
  allyImages,
  enemyImages,
  countsAlly,
  countsEnemy,
  spinnerGif,
  landmark,
} from '../../images'

import './index.css'

const DraggableMarker = ({
  position,
  fetchPositions,
  setModalOpen,
  setPositionToEdit,
  editableMode,
  draggable,
}) => {
  const [imageb64, setImageb64] = useState()

  const markerRef = useRef(null)

  const { id, name, enemy, type, lat, lng, count, description, isLandmark } = position

  useEffect(() => {
    if (isLandmark) return

    let mergeOptions

    if (enemy) {
      mergeOptions = [
        { src: enemyImages[type].image, x: 0, y: 0 },
        { src: countsEnemy[count].image, x: 0, y: 0 },
      ]
    } else {
      mergeOptions = [
        { src: allyImages[type].image, x: 0, y: 0 },
        { src: countsAlly[count].image, x: 0, y: 0 },
      ]
    }

    mergeImages(mergeOptions).then((b64) => setImageb64(b64))
  }, [enemy, type, count])

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

  const iconUrl = isLandmark ? landmark : imageb64 || spinnerGif

  return (
    <Marker
      autoPan
      draggable={draggable}
      eventHandlers={eventHandlers}
      ref={markerRef}
      icon={
        new L.Icon({
          iconUrl,
          iconAnchor: [20, 10],
          popupAnchor: [10, -15],
          iconSize: new L.Point(60, 60),
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
        <div>
          {count ? (
            <div style={{ marginTop: '10px' }}>
              Кількість: {enemy ? countsEnemy[count].label : countsAlly[count].label}
            </div>
          ) : (
            <></>
          )}
        </div>
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
