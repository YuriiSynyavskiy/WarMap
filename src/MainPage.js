import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import './MainPage.css';

const MapEvents = ({setPosition, setModalOpen}) => {
  useMapEvents({
    mousemove(e) {
      setPosition({lat: e.latlng.lat, lng: e.latlng.lng});
    },
    click(e) {
      setModalOpen(true);
    },
  });
  return false;
}


function MainPage() {
  const [position, setPosition] = useState({lat: 51.505, lng: -0.09});
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    Modal.setAppElement('#map-container');
  },[]);

  return (
    <div id="map">
        <MapContainer id="map-container" center={[51.505, -0.09]} className="map-container" zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution={`X: ${position.lat.toFixed(3)} Y: ${[position.lng.toFixed(3)]}`}
                url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
                subdomains={['mt1','mt2','mt3']}
            />
            <MapEvents setPosition={setPosition} setModalOpen={setModalOpen}/>
        </MapContainer>
        <Modal
              isOpen={modalOpen}
              className="position-modal"
              contentLabel="Example Modal"
            >
              <h1>HUI</h1>
        </Modal>
    </div>
  );
}

export default MainPage;
