import { useEffect, useState } from 'react';
import { Marker as LeafletMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from 'esri-leaflet-geocoder';
import PropTypes from 'prop-types'; 

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const Marker = ({ address }) => { 
    const map = useMap();
    const [position, setPosition] = useState([60, 19]);

    useEffect(() => {
        if (address) {
            ELG.geocode().text(address).run((err, results) => {
                if (results?.results?.length > 0) {
                    const { lat, lng } = results.results[0].latlng;
                    setPosition([lat, lng]);
                    map.flyTo([lat, lng], 6);
                }
            });
        }
    }, [address, map]);

    return (
        <LeafletMarker position={position} icon={DefaultIcon}>
            <Popup>{address}</Popup>
        </LeafletMarker>
    );
}

Marker.propTypes = {
    address: PropTypes.string.isRequired, 
};

export default Marker;
