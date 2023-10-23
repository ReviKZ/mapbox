import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../Styling/Map.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';

const Map = () => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN //Getting access token from environmental variables.

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(17.907929); //Setting base coordinates & Zoom to Veszprém
    const [lat, setLat] = useState(47.094056);
    const [zoom, setZoom] = useState(13);

    const nav = new mapboxgl.NavigationControl();
    const searchBox = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: false,
        mapboxgl: mapboxgl
    });

    var navList = [];

    useEffect(() => {
        if (map.current) return; //Render map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.addControl(searchBox);
        map.current.addControl(nav);

        map.current.on('click', (e) => {
            navList.push(new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map.current));
        });

        searchBox.on('result', (result) => {
            navList.push(new mapboxgl.Marker().setLngLat(result.result.center).addTo(map.current));
        });
    });

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default Map;