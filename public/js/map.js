mapboxgl.accessToken = 'pk.eyJ1IjoiZW5lc2FnaXIiLCJhIjoiY2wycnRlbnhyMDJsbTNkcGVtZGxyOXNmNyJ9.dZzJRUNhjOJRxVLJyoGC0Q';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 12,
    center: [8.68165,49.37621]
});

// Fetch volunteers from API
async function getVolunteers(){
    const res = await fetch('/api/v1/volunteers');
    const data = await res.json();

    // console.log(data);
    const volunteers = data.data.map(volunteer =>{
        return {
            type : 'Feature',
            'geometry': {
                        'type': 'Point',
                        'coordinates': [volunteer.location.coordinates[0], volunteer.location.coordinates[1]]
                    },
            'properties':{
                        'volunteerId': volunteer.volunteerId,
                        'icon':'rocket'//! iconu degistir
                    }
        }
    });

    loadMap(volunteers);
}

function loadMap(volunteers){
    map.on('load', () => {
        map.addSource('point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': volunteers
                // 'features': [{
                //     'type': 'Feature',
                //     'geometry': {
                //         'type': 'Point',
                //         'coordinates': [8.45381,49.63909]
                //     },
                //     'properties':{
                //         'volunteerId':'0004',
                //         'icon':'shop'//! iconu degistir
                //     }
                // }]
            }
        });
    
        // Add a layer to use the image to represent the data.
        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'point',
            'layout': {
                'icon-image': '{icon}-15', 
                'icon-size': 1.5,
                'text-field':'{volunteerId}',
                'text-font':['Open Sans Semibold','Arial Unicode MS Bold'],
                'text-offset':[0,0.9],
                'text-anchor':'top'
            }
        });
    });
}

getVolunteers();