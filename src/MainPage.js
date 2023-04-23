import {useState, useEffect} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {MapContainer, TileLayer, useMapEvents} from 'react-leaflet';
import './MainPage.css';

const MapEvents = ({setPosition, setModalOpen}) => {
  useMapEvents({
    mousemove (e) {
      setPosition({lat: e.latlng.lat, lng: e.latlng.lng});
    },
    click (e) {
      setModalOpen(true);
    },
  });
  return false;
};

const MapModal = ({isOpen, setClose}) => {
  return (<div>
    <Modal isOpen={isOpen} toggle={setClose}>
      <ModalHeader onClose={setClose}>Modal title</ModalHeader>
      <ModalBody>
        Mat' zdohla?
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={setClose}>
          Yes
        </Button>{' '}
        <Button color="secondary" onClick={setClose}>
          Tak
        </Button>
      </ModalFooter>
    </Modal>
  </div>);
};

function MainPage () {
  const [position, setPosition] = useState({lat: 51.505, lng: -0.09});
  const [modalOpen, setModalOpen] = useState(false);

  function closeModal () {
    setModalOpen(false);
  }

  return (
    <div id="map">
      <MapContainer id="map-container" center={[51.505, -0.09]} className="map-container" zoom={13}
                    scrollWheelZoom={true}>
        <TileLayer
          attribution={`X: ${position.lat.toFixed(3)} Y: ${[position.lng.toFixed(3)]}`}
          url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
          subdomains={['mt1', 'mt2', 'mt3']}
        />
        <MapEvents setPosition={setPosition} setModalOpen={setModalOpen}/>
      </MapContainer>
      <MapModal isOpen={modalOpen} setClose={closeModal}/>
    </div>
  );
}

export default MainPage;
