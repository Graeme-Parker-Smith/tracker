import React, { useContext } from "react";
import { Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation, locations }
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  const handleCenter = () => {
    const { latitude, longitude } = currentLocation.coords;
    mapView.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    })
  }

  // console.log(currentLocation.coords);

  return (
    <>
      <MapView
      ref={map => {mapView = map}}
        style={styles.map}
        initialRegion={{
          ...currentLocation.coords,
          // Delta values is how zoomed in the map should be on the screen
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Circle
          center={currentLocation.coords}
          radius={20}
          strokeColor="rgba(158, 158, 255, 1.0)"
          fillColor="rgba(158, 158, 255, 0.3)"
        />
        <Polyline strokeWidth={5} strokeColor='rgba(173,21,97,1.0)' coordinates={locations.map(loc => loc.coords)} />
      </MapView>
      <Button title="Re-center" onPress={handleCenter} />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default Map;
