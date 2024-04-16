import { IconHome } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { MapMarkers } from './MapMarkers';
import { PixiOverlay } from './PixiOverlay';
import { PixiOverlayContext } from './PixiOverlayContext';

export function Map() {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      minZoom={2}
      scrollWheelZoom={true}
      style={{ height: '100dvh' }}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <HomeButton />
      <LayersControl position='bottomleft'>
        <LayersControl.BaseLayer name='Streets'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='Satellite' checked>
          <TileLayer
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">MapBox</a> &copy; <a href="http://www.openstreetmap.org/about/">OpenStreetMap</a> <a href="https://www.mapbox.com/map-feedback"><b>Improve this map</b></a>'
            url='https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=pk.eyJ1IjoicGhpbGlwZGlja2Vuc29uIiwiYSI6ImNsdXI0bHNxOTA0NW4ycW1vdzd1a25kZnkifQ.RbohcnvVovQHF1OGNooCvg'
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <PixiOverlayContext>
        <PixiOverlay>
          <MapMarkers />
        </PixiOverlay>
      </PixiOverlayContext>
    </MapContainer>
  );
}

const HomeButton: React.FC<Record<string, never>> = () => {
  const fmtMsg = useFmtMsg();
  return (
    <Link
      style={{ border: '2px solid rgba(0, 0, 0, 0.2)' }}
      className='absolute bg-clip-padding bg-white flex gap-2 hover:opacity-95 items-center left-14 px-3 py-2 rounded top-2.5 z-[1000]'
      to='/'
    >
      <IconHome overrideColors className='fill-black' />
      <span className='hidden sm:inline text-base text-black'>
        {fmtMsg('home')}
      </span>
    </Link>
  );
};
