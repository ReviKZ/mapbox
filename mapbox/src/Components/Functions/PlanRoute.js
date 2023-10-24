import mapboxgl from 'mapbox-gl';

async function PlanRoute(markersString) {
    const fetchUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${markersString.slice(0, -1)}?geometries=geojson&access_token=${mapboxgl.accessToken}`; //UrlCreator

    const query = await fetch( //Send request
        fetchUrl,
        { method: 'GET' }
    );
    if (!query.ok) {
        return false; //Checks if request returned ok (Important, because that's how we check whether to render it on the map or not)
    }
    else {
        const json = await query.json(); //jsonify 
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        const time = data.duration;
        const distance = data.distance;
        const geojson = { //Wrap into Directions Format
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };

        return { //Return all info
            'route': geojson,
            'time': time,
            'distance': distance
        };
    }

};

export default PlanRoute;