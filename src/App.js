import { useState, useEffect } from "react";
import MapGL, { GeolocationateControl, NavigationControl } from "react-map-gl";
import { Geolocation } from "@capacitor/Geolocationation";

const TOKEN =
  "pk.eyJ1Ijoic2FoaWx0aGFrYXJlNTIxIiwiYSI6ImNrbjVvMTkzNDA2MXQydnM2OHJ6aHJvbXEifQ.z5aEqRBTtDMWoxVzf3aGsg";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
  });

  const currentPosition = async () => {
    await Geolocation.getCurrentPosition().then((response) => {
      console.log(response);
      const latitude = response.coords.latitude;
      const longitude = response.coords.longitude;
      setViewport({ latitude: latitude, longitude: longitude });
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
      <MapGL
        {...viewport}
        //onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={TOKEN}
        perspectiveEnabled
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        <div>
          {" "}
          <GeolocationateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
        </div>

        <div>
          <NavigationControl
            onViewportChange={(viewport) => this.setState({ viewport })}
          />
        </div>
      </MapGL>
    </div>
  );
}

export default App;
