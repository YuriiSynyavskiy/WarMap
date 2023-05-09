import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { Menu, DatePicker } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import moment from 'moment'

import DraggableMarker from '../../components/Marker'
import PositionModal from '../../components/PositionModal'
import LeafletRuler from '../../components/Ruler'

import './index.css'

import modifyIcon from '../../images/modify-item.png'

import request from '../../utils/requestFactory'

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
  const [chronologicalMode, setChronologicalMode] = useState(false)

  const fetchPositions = () => {
    request({ endpoint: 'positions', method: 'GET' }).then((data) => setPositions(data))
  }

  const fetchChronologicalPositions = (date) => {
    request({ endpoint: `chronology?date=${date}`, method: 'GET' }).then((data) =>
      setPositions(data),
    )
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

  const changePositionMode = () => setAddNewPositionMode((prevState) => !prevState)

  const closeModal = () => setModalOpen(false)

  const menuItems = [
    getItem('', 'sub4', <SettingOutlined />, [getItem('Хронологічний режим', 'chronologicalMode')]),
  ]

  const onClickMenu = (e) => {
    if (e.key === 'chronologicalMode') {
      setChronologicalMode(true)
      fetchChronologicalPositions(moment().format('YYYY-MM-DD'))
    } else if (e.key === 'defaultMode') {
      setChronologicalMode(false)
      fetchPositions()
    }
  }

  const onChangeDate = (date, dateString) => {
    if (dateString) {
      fetchChronologicalPositions(dateString)
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
          editableMode={!chronologicalMode}
          draggable={!chronologicalMode}
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
      {!chronologicalMode && modalOpen && (
        <PositionModal
          isOpen={modalOpen}
          closeModal={closeModal}
          positionCoords={newPositionCoords}
          fetchPositions={fetchPositions}
          positionToEdit={positionToEdit}
          stopEditing={() => setPositionToEdit(null)}
        />
      )}
      {!chronologicalMode ? (
        <>
          <div className='menu-wrapper'>
            <Menu onClick={onClickMenu} mode='inline' items={menuItems} theme='dark' />
          </div>
          <div
            className={addNewPositionMode ? 'modify-wrapper-active' : 'modify-wrapper'}
            onClick={changePositionMode}
          >
            <img src={modifyIcon} className='modify-wrapper-image' alt='Modify Map' />
          </div>
        </>
      ) : (
        <div className='menu-wrapper'>
          <Menu onClick={onClickMenu} mode='inline' theme='dark' defaultOpenKeys={['sub1']}>
            <Menu.SubMenu icon={<SettingOutlined />} key='sub1'>
              <Menu.Item className='menu-item' key='defaultMode'>
                Звичайний режим
              </Menu.Item>
              <Menu.Item className='menu-item' key='individualMode'>
                Індивідуальний режим
              </Menu.Item>
              <Menu.Item disabled className='menu-item'>
                <p>Виберіть дату:</p>
              </Menu.Item>
              <Menu.Item disabled className='menu-item' key='datePicker'>
                <DatePicker
                  disabledDate={(date) => date > dayjs()}
                  defaultValue={dayjs()}
                  onChange={onChangeDate}
                />
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      )}
    </div>
  )
}

export default WarMap
