import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { Menu, DatePicker } from 'antd'

import { SettingOutlined } from '@ant-design/icons'

import DraggableMarker from '../Marker'

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

const MapEvents = ({ map, setMouseCoords }) => {
  useMapEvents({
    mousemove(e) {
      setMouseCoords({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
    zoom(e) {
      if (e.target._zoom < MIN_ZOOM) map.current.setZoom(MIN_ZOOM)
    },
  })
  return false
}

function WarMapChronology() {
  const map = useRef()

  const [mouseCoords, setMouseCoords] = useState({ lat: 47.69, lng: 37.83 })
  const [positions, setPositions] = useState([])

  const navigate = useNavigate()


  const onClickMenu = (e) => {
    if (e.key === '1') {
      navigate('chronology')
    }
  }

  const fetchPositions = (date) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date })
    }
    fetch('http://127.0.0.1:5000/chronology', requestOptions)
      .then((response) => response.json())
      .then((data) => setPositions(data))
  }

  useEffect(() => {
    fetchPositions()
  }, [])


  const positionsMemoized = useMemo(
    () =>
      positions.map((position) => (
        <DraggableMarker
          position={position}
          key={position.id}
          fetchPositions={fetchPositions}
          editableMode={false}
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
        />
      </MapContainer>
      <div className='menu-wrapper'>
        <Menu onClick={onClickMenu} mode='inline' theme='dark'>
        <Menu.SubMenu icon={<SettingOutlined />}>
            <Menu.Item className='menu-item'><DatePicker /></Menu.Item>
        </Menu.SubMenu>
        </Menu>
      </div>
    </div>
  )
}

export default WarMapChronology
