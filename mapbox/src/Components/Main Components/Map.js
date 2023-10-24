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

    const nav = new mapboxgl.NavigationControl(); //Add Navigation Control
    const searchBox = new MapboxGeocoder({ //Add Search Box
        accessToken: mapboxgl.accessToken,
        marker: false,
        mapboxgl: mapboxgl
    });

    const [navList, setNavList] = useState([]); //A List for markers, to navigate between them

    function removeMarker(index) { //Remove Marker from the list
        navList[index].marker.remove();
        let currentList = [...navList];
        let modifiedList = currentList.filter(marker => marker !== currentList[index]);
        setNavList(modifiedList);
    }

    const [route, setRoute] = useState({}); //Route,
    const [time, setTime] = useState(0); //Time &
    const [distance, setDistance] = useState(0); //Distance data for visualizing

    async function planRoute() {
        var markersString = ""; //Creating the request string as described in the mapbox documentation
        for (var i = 0; i < navList.length; i++) {
            markersString += `${navList[i].marker._lngLat.lng},${navList[i].marker._lngLat.lat};`
        }
        var result = await PlanRoute(markersString); //Sending the request
        setRoute(result);
    }

    const [color, setColor] = useState("#378c5a"); //Line color setting
    const [width, setWidth] = useState(4); //Line width setting

    function changeLine(event) {
        event.preventDefault(); //On [Save] button click, gets the value and sets it as the variable
        setColor(document.getElementById("color").value);
        setWidth(parseInt(document.getElementById("width").value));
    }

    useEffect(() => {
        if (map.current) return; //Render map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.addControl(searchBox); //Adding the searchbox & Navigation to the layer
        map.current.addControl(nav);

        map.current.on('click', (e) => {
            const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map.current); //Adding marker to the layer and to the navList
            setNavList((prevNavList) => [
                ...prevNavList,
                {marker},
            ]);
        });

        searchBox.on('result', (result) => {
            const marker = new mapboxgl.Marker().setLngLat(result.result.center).addTo(map.current); //Adding marker from the searchbox result coordinates to the layer and to navList 
            setNavList((prevNavList) => [
                ...prevNavList,
                {marker},
            ]);
        });

        map.current.on('load', () => {
            map.current.addLayer({ //Adding navigation Layer with base data
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
                    'line-color': color,
                    'line-width': width,
                    'line-opacity': 0.8,
                },
            });
        })
    });

    useEffect(() => {
        if (map.current.getSource('route')) {
            if (route) {
                map.current.getSource('route').setData(route.route); //Set route data from query
                setDistance((route.distance / 1000).toFixed(1));
                setTime(Math.floor(route.time / 60));
            }
            else if (!route) {
                map.current.getSource('route').setData( //Reset the data if query was faulty (eg.: One or less marker)
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

    useEffect(() => {
        if (map.current.getSource('route')) {
            map.current.setPaintProperty('route', 'line-color', color); //Set paint property on route layer's line if there is a change in color or width
            map.current.setPaintProperty('route', 'line-width', width);
        }
    }, [color, width])
    

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
            <Nav coordList={navList} removeMarker={removeMarker} planRoute={planRoute} distance={distance} time={time} changeLine={changeLine} />
        </div>
    );
}

export default Map;