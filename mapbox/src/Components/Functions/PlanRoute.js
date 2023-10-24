import mapboxgl from 'mapbox-gl';

async function PlanRoute(markersString) {
    const fetchUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${markersString.slice(0, -1)}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    const query = await fetch(
        fetchUrl,
        { method: 'GET' }
    );
    if (!query.ok) {
        return false;
    }
    else {
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        const time = data.duration;
        const distance = data.distance;
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };

        return {
            'route': geojson,
            'time': time,
            'distance': distance
        };
    }

};

export default PlanRoute;