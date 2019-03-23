import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


class Map extends Component {
  componentDidMount = () => {
  const mapConfig = {
    container: 'map',
    style: 'mapbox://styles/e-drop/cjtm1iawn0pt71flide87ynz0',
    center: [2.1125, 41.23],
    zoom: 9,
  };

  mapboxgl.accessToken = 'pk.eyJ1IjoiZS1kcm9wIiwiYSI6ImNqc3JwZjN6MDE2d2g0M29la2R1Y2ZlODYifQ.D4sXR8wG42MLA7X8GSSaOA';
  
  this.map = new mapboxgl.Map(mapConfig);

  this.geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  });
  
  // this.map.addControl(this.geolocate);
  
  // this.map.addControl(new mapboxgl.NavigationControl())

  this.geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  })
  
  this.map.addControl(this.geocoder);
  
  this.map.on('load', () => {
    this.map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });
  this.map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  });
  this.geocoder.on('result', (e) => {
    this.map.getSource('single-point').setData(e.result.geometry);
    this.setState({
      home: {
        latitude: e.result.geometry.coordinates[0],
        longitude: e.result.geometry.coordinates[1],
      }
    })
  });
});

}
  render() {
    return (
      <div>
        <div className='map' id='map' ></div>
      </div>
    );
  }
}

export default Map;