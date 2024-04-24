import { useState, useEffect } from "react";
import ReactMapGl, { GeolocateControl, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Geolocation as geoloc } from "@capacitor/geolocation";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2FoaWx0aGFrYXJlNTIxIiwiYSI6ImNrbjVvMTkzNDA2MXQydnM2OHJ6aHJvbXEifQ.z5aEqRBTtDMWoxVzf3aGsg";

const App = () => {
  const [viewport, setViewport] = useState({});

  const currentPosition = async () => {
    await geoloc.getCurrentPosition().then((response) => {
      console.log(response);
      const latitude = response.coords.latitude;
      const longitude = response.coords.longitude;
      setViewport({
        longitude: longitude,
        latitude: latitude,
        zoom: 3.5,
      });
    });
  };

  useEffect(() => {
    currentPosition();
  }, []);

  return (
    <>
      <div className="h-screen w-100">
        <div className="text-center">
          <div>lat: {viewport.latitude}</div>
          <div>lon : {viewport.longitude}</div>
        </div>
        {viewport.latitude && (
          <ReactMapGl
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={{
              longitude: viewport.longitude,
              latitude: viewport.latitude,
              zoom: 14,
            }}
            onViewportChange={(viewport) => {
              setViewport(...viewport);
            }}
            mapStyle={"mapbox://styles/mapbox/streets-v9"}
            minZoom={5}
          >
            <NavigationControl />
            <GeolocateControl />
          </ReactMapGl>
        )}
      </div>
    </>
  );
};

export default App;
