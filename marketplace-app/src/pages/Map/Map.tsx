import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { MapTrees } from './MapTrees';

export function Map() {
  const position: LatLngTuple = [0, 0];

  return (
    <MapContainer
      center={position}
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: '100dvh' }}
    >
      <MapTrees />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        // url='https://wms.openstreetmap.fr/tms/1.0.0/nasa_blue_marble/{z}/{x}/{y}'
      />
    </MapContainer>
  );
}
