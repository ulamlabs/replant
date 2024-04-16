import { IconHome } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { MapMarkers } from './MapMarkers';
import { PixiOverlay } from './PixiOverlay';
import { PixiOverlayContext } from './PixiOverlayContext';

export function Map() {
  const fmtMsg = useFmtMsg();

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
      <div className='absolute top-2.5 right-2.5 z-[2000]'>
        <Link
          className='bg-gray-200 flex gap-2 h-full hover:opacity-85 items-center px-4 py-2 rounded-xl text-black'
          to='/'
        >
          <IconHome overrideColors className='fill-black' />
          <span className='hidden sm:inline text-base text-black'>
            {fmtMsg('home')}
          </span>
        </Link>
      </div>
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
