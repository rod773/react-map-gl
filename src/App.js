import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Geolocation } from "@capacitor/geolocation";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2FoaWx0aGFrYXJlNTIxIiwiYSI6ImNrbjVvMTkzNDA2MXQydnM2OHJ6aHJvbXEifQ.z5aEqRBTtDMWoxVzf3aGsg";

function App() {
  const [viewport, setViewport] = useState({});

  const currentPosition = async () => {
    await Geolocation.getCurrentPosition().then((response) => {
      console.log(response);
      const latitude = response.coords.latitude;
      const longitude = response.coords.longitude;
      setViewport({
        ...viewport,
        latitude: latitude,
        longitude: longitude,
        zoom: 15,
      });
    });
  };

  const permisions = async () => {
    await Geolocation.checkPermissions().then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    currentPosition();
    permisions();
  }, []);

  return (
    <div>
      {viewport.latitude && viewport.longitude && (
        <div className="w-100 h-screen">
          <h1>Your Location:</h1>
          <Map
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            <Marker
              longitude={viewport.longitude}
              latitude={viewport.latitude}
            />
          </Map>
        </div>
      )}
    </div>
  );
}

export default App;
