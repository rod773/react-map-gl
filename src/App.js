import { useState, useEffect } from "react";
import ReactMapGl, {
  GeolocateControl,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";
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

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [viewport.latitude, viewport.longitude],
        [viewport.latitude - 1, viewport.longitude - 1],
      ],
    },
  };

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
            <Source id="polylineLayer" type="geojson" data={dataOne}>
              <Layer
                id="lineLayer"
                type="line"
                source="my-data"
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "rgba(3, 170, 238, 0.5)",
                  "line-width": 5,
                }}
              />
            </Source>
            <NavigationControl />
            <GeolocateControl />
          </ReactMapGl>
        )}
      </div>
    </>
  );
};

export default App;
