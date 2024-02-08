export function geocoder(map) {
    L.Control.geocoder({
        defaultMarkGeocode: true
    })
        .on('markgeocode', function (e) {
            var bbox = e.geocode.bbox;
            var poly = L.polygon([
                bbox.getSouthEast(),
                bbox.getNorthEast(),
                bbox.getNorthWest(),
                bbox.getSouthWest()
            ]).addTo(map);
            map.fitBounds(poly.getBounds());
        })
        .addTo(map);

}