import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import "../assets/css/map.css";

const MADRID = { lat: 40.421536, lng: -3.698771 };
const GOWORK = { lat: 40.433918, lng: -3.694181 };
var Polylines = [];

const Map = ({ trip, stopSelected, selectStop }) => {
  // guardamos el mapa para realizar acciones sobre el mismo
  const [ownMap, setOwnMap] = React.useState({});
  const [ownMaps, setOwnMaps] = React.useState({});

  const drawTrip = (sections) => {
    //recorremos los segmentos del viaje
    if (Polylines.length > 0) {
      //borramos el recorrido previo del mapa
      Polylines.map((poly) => {
        poly.setMap(null);
      });
      Polylines = [];
    }
    sections.map((segment) => {
      let strokeColor = "#002884";
      if (segment.type == "Walk") {
        strokeColor = "#ffffff";
      }
      let geodesicPolyline = new ownMaps.Polyline({
        strokeColor: strokeColor,
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      let path = geodesicPolyline.getPath();
      segment.itinerary.coordinates.map((coords) => {
        path.push(new ownMaps.LatLng(coords[1], coords[0]));
      });
      geodesicPolyline.setMap(ownMap);
      Polylines.push(geodesicPolyline);
    });
  };

  // Return map bounds based on list of places
  const getMapBounds = (map, maps) => {
    // bounds son las esquinas superior izq e inferior derecha
    const bounds = new maps.LatLngBounds();
    // en los arrays devueltos por la api tenemos primero la LONGITUD y luego la LATITUD,
    // en cambio, google, como casi todas las cosas que he visto en mi vida, tienen estos parámetros en el
    // orden inverso, entiendase LAT, LONG
    let start = Object.assign({}, GOWORK);
    let end = Object.assign({}, MADRID);

    if (trip && trip.data && trip.data.sections) {
      start.lat = trip.data.sections[0].source.geometry.coordinates[1];
      start.lng = trip.data.sections[0].source.geometry.coordinates[0];
      end.lat =
        trip.data.sections[
          trip.data.sections.length - 1
        ].destination.geometry.coordinates[1];
      end.lng =
        trip.data.sections[
          trip.data.sections.length - 1
        ].destination.geometry.coordinates[0];
    }
    const points = [start, end];

    points.map((p) => {
      bounds.extend(new maps.LatLng(p.lat, p.lng));
    });

    return bounds;
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, "idle", () => {
      maps.event.addDomListener(window, "resize", () => {
        map.fitBounds(bounds);
      });
    });
  };

  const apiIsLoaded = (map, maps) => {
    setOwnMap(map);
    setOwnMaps(maps);
    const bounds = getMapBounds(map, maps);
    // // Fit map to bounds
    console.log({ map, maps });

    // map.setZoom(15);
    // // Bind the resize listener
    bindResizeListener(map, maps, bounds);
  };

  const sections = trip.data.sections
    ? trip.data.sections.filter((elem) => elem.type == "Bus")
    : [];
  let source = null;
  let destination = null;
  if (sections.length > 0) {
    source = {
      lat: sections[0].source.geometry.coordinates[1],
      lng: sections[0].source.geometry.coordinates[0],
    };
    destination = {
      lat: sections[sections.length - 1].destination.geometry.coordinates[1],
      lng: sections[sections.length - 1].destination.geometry.coordinates[0],
    };
  }
  const final = "final",
    middle = "middle",
    info = "info";
  const types = { final, middle, info };

  useEffect(() => {
    if (
      trip &&
      Object.keys(trip).length > 0 &&
      Object.keys(ownMap).length > 0 &&
      Object.keys(ownMaps).length > 0
    ) {
      drawTrip(trip.data.sections);
      const bounds = getMapBounds(ownMap, ownMaps);
      ownMap.fitBounds(bounds);
    }
  });

  return (
    <React.Fragment>
      <GoogleMapReact
        defaultZoom={12}
        defaultCenter={MADRID}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
        {
          // intento recorrer el trip para agregar los marcadores necesarios de cada sección}
        }
        {sections.map((elem) => {
          return (
            <Marker
              key={`${elem.order}destination`}
              lat={elem.destination.geometry.coordinates[1]}
              lng={elem.destination.geometry.coordinates[0]}
              text={elem.destination.properties.name}
              number={
                elem.destination.properties.idStop
                  ? elem.destination.properties.idStop
                  : 0
              }
              type={types.middle}
              selected={
                elem.destination.properties.idStop
                  ? elem.destination.properties.idStop == stopSelected
                  : false
              }
              action={elem.destination.properties.idStop ? selectStop : ""}
            />
          );
        })}
        {sections.map((elem) => {
          return (
            <Marker
              key={`${elem.order}source`}
              lat={elem.source.geometry.coordinates[1]}
              lng={elem.source.geometry.coordinates[0]}
              text={elem.source.properties.name}
              number={
                elem.source.properties.idStop
                  ? elem.source.properties.idStop
                  : 0
              }
              type={types.middle}
              selected={
                elem.source.properties.idStop
                  ? elem.source.properties.idStop == stopSelected
                  : false
              }
              action={elem.source.properties.idStop ? selectStop : ""}
            />
          );
        })}
        <Marker
          lat={source.lat} //stopsA[0].geometry.coordinates[1] }
          lng={source.lng} //stopsA[0].geometry.coordinates[0] }
          text={"origen"} //stopsA[0].stopName }
          number={0} //stopsA[0].stopId }
          type={types.final}
        />
        <Marker
          lat={destination.lat} //stopsB[0].geometry.coordinates[1] }
          lng={destination.lng} //stopsB[0].geometry.coordinates[0] }
          text={"destino"} //stopsB[0].stopName }
          number={0} //stopsB[0].stopId }
          type={types.final}
        />
        <Marker
          lat={GOWORK.lat}
          lng={GOWORK.lng}
          text="GOWORK"
          important={true}
          type={types.info}
        />
      </GoogleMapReact>
    </React.Fragment>
  );
};

export default Map;
