import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'

import { SettingOutlined } from '@ant-design/icons'

import DraggableMarker from '../Marker'
import PositionModal from '../PositionModal'
import LeafletRuler from '../Ruler'

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

const MapEvents = ({
  map,
  setMouseCoords,
  setModalOpen,
  setNewPositionCoords,
  addNewPositionMode,
}) => {
  useMapEvents({
    mousemove(e) {
      setMouseCoords({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
    click(e) {
      if (addNewPositionMode) {
        setNewPositionCoords({ lat: e.latlng.lat, lng: e.latlng.lng })
        setModalOpen(true)
      }
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
  const [addNewPositionMode, setAddNewPositionMode] = useState(false)

  const navigate = useNavigate()

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

  useEffect(() => {
    if (!map.current) return

    const [ruler] = document.getElementsByClassName('leaflet-ruler')

    const listener = () => {
      setAddNewPositionMode(false)
    }

    ruler.addEventListener('click', listener)

    return () => {
      ruler.removeEventListener('click', listener)
    }
  }, [map.current])

  const closeModal = () => setModalOpen(false)

  const menuItems = [
    getItem('', 'sub4', <SettingOutlined />, [
      getItem('Хронологічний режим', '1'),
      getItem('Індивідуальний режим', '2'),
      getItem(`Режим додавання позначок: ${addNewPositionMode ? 'Ввімкнено' : 'Вимкнено'}`, '3'),
    ]),
  ]

  const onClickMenu = (e) => {
    if (e.key === '1') {
      navigate('chronology')
    } else if (e.key === '3') {
      setAddNewPositionMode((prevState) => !prevState)
    }
  }

  const positionsMemoized = useMemo(
    () =>
      positions.map((position) => (
        <DraggableMarker
          position={position}
          key={position.id}
          fetchPositions={fetchPositions}
          setModalOpen={setModalOpen}
          setPositionToEdit={() => setPositionToEdit(position)}
          editableMode={true}
        />
      )),
    [positions],
  )

  const xLat = mouseCoords.lat.toFixed(5)
  const yLng = mouseCoords.lng.toFixed(5)

  return (
    <div style={{ position: 'relative' }}>
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
          addNewPositionMode={addNewPositionMode}
        />
        <LeafletRuler />
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
      <div className='menu-wrapper'>
        <Menu onClick={onClickMenu} mode='inline' items={menuItems} theme='dark' />
      </div>
    </div>
  )
}

export default WarMap
