import { MapContainer, TileLayer, useMap } from 'react-leaflet'

function MainPage() {
  return (
    <div id="map" >
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{width: "100vw", height: "100vh"}}>
            <TileLayer
                url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
                subdomains={['mt1','mt2','mt3']}
            />
        </MapContainer>
    </div>
  );
}

export default MainPage;
