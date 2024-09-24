import { MapContainer, TileLayer } from 'react-leaflet';
import Marker from './Marker';
import PropTypes from 'prop-types';

const Map = ({ address, city, country }) => {
  const fullAddress = `${address} ${city} ${country}`;

  return (
    <MapContainer
      center={[53.35, 18.8]}
      zoom={1}
      scrollWheelZoom={false}
      style={{
        width: "100%",
        height: "40vh",
        marginTop: "20px",
        zIndex: 0,
      }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker address={fullAddress} />
    </MapContainer>
  );
}

Map.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
}

export default Map;