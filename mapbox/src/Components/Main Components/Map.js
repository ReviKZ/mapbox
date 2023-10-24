import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../Styling/Map.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Nav from './Nav';
import mapboxgl from 'mapbox-gl';
import PlanRoute from '../Functions/PlanRoute';

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

    const [navList, setNavList] = useState([]);

    function removeMarker(index) {
        navList[index].marker.remove();
        let currentList = [...navList];
        let modifiedList = currentList.filter(marker => marker !== currentList[index]);
        setNavList(modifiedList);
    }

    const [route, setRoute] = useState({});
    const [time, setTime] = useState(0);
    const [distance, setDistance] = useState(0);

    async function planRoute() {
        var markersString = "";
        for (var i = 0; i < navList.length; i++) {
            markersString += `${navList[i].marker._lngLat.lng},${navList[i].marker._lngLat.lat};`
        }
        var result = await PlanRoute(markersString);
        setRoute(result);
    }

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
            const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map.current);
            setNavList((prevNavList) => [
                ...prevNavList,
                {marker},
            ]);
        });

        searchBox.on('result', (result) => {
            const marker = new mapboxgl.Marker().setLngLat(result.result.center).addTo(map.current);
            setNavList((prevNavList) => [
                ...prevNavList,
                {marker},
            ]);
        });

        map.current.on('load', () => {
            map.current.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: route,
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#378c5a',
                    'line-width': 4,
                    'line-opacity': 0.8,
                },
            });
        })
    });

    useEffect(() => {
        if (map.current.getSource('route')) {
            if (route) {
                map.current.getSource('route').setData(route.route);
                setDistance((route.distance / 1000).toFixed(1));
                setTime(Math.floor(route.time / 60));
            }
            else if (!route) {
                map.current.getSource('route').setData(
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: 0
                        }
                    });
                setTime(0);
                setDistance(0);
            }
        }
    }, [route]);

    

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
            <Nav coordList={navList} removeMarker={removeMarker} planRoute={planRoute} distance={distance} time={time}  />
        </div>
    );
}

export default Map;