import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers.js";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css"
import L from "leaflet";
import MapIcon from "./img/home.png"
import useGeoLocation from "./useGeoLocation.jsx";


const markerIcon = new L.Icon({
    iconUrl: MapIcon,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46]
});


const BasicMap = () => {
    const [center, setCenter] = useState({ lat: 54.825802, lng: 38.81522 });
    const ZOOM_LEVEL = 18;
    const mapRef = useRef();
    const _created = e => {
        console.log(e.layer.toGeoJSON());
        return e.layer.toGeoJSON();
    }

    const location = useGeoLocation();

    const showMyLocation = () => {
      if (location.loaded && !location.error) {
        mapRef.current.flyTo(
          [location.coordinates.lat, location.coordinates.lng],
          ZOOM_LEVEL,
          { animate: true }
        );
      } else {
        alert(location.error.message);
      }
    };
  
    return (
      <>
  
        <div className="row">
          <div className="col text-center">
            <div className="col">
              <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                <FeatureGroup>
{/* draw={{rectangle: false, circle: false, circlemarker: false, marker: false, polyline: false}} */}
                    <EditControl position="topright" onCreated={_created} draw={{rectangle: false}}/>
                </FeatureGroup>
                <TileLayer
                  url={osm.maptiler.url}
                  attribution={osm.maptiler.attribution}
                />
  
                {location.loaded && !location.error && (
                  <Marker
                    icon={markerIcon}
                    position={[
                      location.coordinates.lat,
                      location.coordinates.lng,
                    ]}
                  ></Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </div>
  
        <div className="row my-4">
          <div className="col d-flex justify-content-center">
            <button className="btn btn-primary" onClick={showMyLocation}>
              Locate Me
            </button>
          </div>
        </div>
      </>
    );
  };

export default BasicMap;
