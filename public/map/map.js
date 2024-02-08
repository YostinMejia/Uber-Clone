export function createMap(initialLog = 6.262324, initialLat = -75.564080) {
    const map = L.map('map').setView([initialLog, initialLat], 12);

    // // layers
    const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const googleLayers = {
        "Street": googleStreets,
        "Hybrid": googleHybrid
    };

    googleStreets.addTo(map) //default layer
    L.control.layers(googleLayers).addTo(map)

    return map
}