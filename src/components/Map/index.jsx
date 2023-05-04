import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { Menu } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import DraggableMarker from '../Marker'
import PositionModal from '../PositionModal'

import './index.css'

const MIN_ZOOM = 3

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

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
  const [positionToEdit, setPositionToEdit] = useState(null)

  const closeModal = () => setModalOpen(false)
  const onClickMenu = (e) => {
    console.log('click ', e)
  }
  const fetchPositions = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    fetch('http://127.0.0.1:5000/positions', requestOptions)
      .then((response) => response.json())
      .then((data) => setPositions(data))
  }

  useEffect(() => {
    fetchPositions()
  }, [])
  const menuItems = [
    getItem('Додаткові можливості', 'sub4', <SettingOutlined />, [
      getItem('Хронологічний режим', '1'),
      getItem('Індивідуальний режим', '2'),
    ])
  ]
  const positionsMemoized = useMemo(
    () =>
      positions.map((position) => (
        <DraggableMarker
          position={position}
          key={position.id}
          fetchPositions={fetchPositions}
          setModalOpen={setModalOpen}
          setPositionToEdit={() => setPositionToEdit(position)}
        />
      )),
    [positions],
  )

  const xLat = mouseCoords.lat.toFixed(5)
  const yLng = mouseCoords.lng.toFixed(5)

  console.log(positionToEdit)

  return (
    <div style={{position: 'relative'}}>
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
        {positionsMemoized}
        <MapEvents
          map={map}
          setMouseCoords={setMouseCoords}
          setModalOpen={setModalOpen}
          setNewPositionCoords={setNewPositionCoords}
        />
      </MapContainer>
      {modalOpen && (
        <PositionModal
          isOpen={modalOpen}
          closeModal={closeModal}
          positionCoords={newPositionCoords}
          fetchPositions={fetchPositions}
          positionToEdit={positionToEdit}
          stopEditing={() => setPositionToEdit(null)}
        />
      )}
  <div
    style={{
      position: 'absolute',
      width: '10%',
      height: '10%',
      top: 0,
      right: 50,
      zIndex: 10000
    }}  
  > 

    <Menu
      onClick={onClickMenu}
      style={{
        width: 256,
      }}
      mode="inline"
      items={menuItems}
      theme="dark"
    />
      </div>
    </div>
  )
}

export default WarMap
