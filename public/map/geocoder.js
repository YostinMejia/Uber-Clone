//organizar este mierdero y pasar las direcciones al front

export class Geocoder {

    initGeocoder(mapClass, travelRepository, markers) {
        const info = L.Control.geocoder({
            defaultMarkGeocode: false
        })
            .on('markgeocode', async (e) => {
                if (markers.markersList.length < 2) {

                    if (document.getElementById("recogida").innerText == "") {
                        document.getElementById("recogida").innerText = e.geocode.name
                    } else {
                        document.getElementById("llegada").innerText = e.geocode.name
                    }

                    const { lat, lng } = e.geocode.center

                    const marker = await markers.createMarker(lat, lng, mapClass, travelRepository)
                }
                if (markers.markersList.length == 2) {

                    await travelRepository.startTravel(markers.markersList)
                    mapClass.traceRoute(travelRepository.routeLayer)

                }

                var bbox = e.geocode.bbox;
                var poly = L.polygon([
                    bbox.getSouthEast(),
                    bbox.getNorthEast(),
                    bbox.getNorthWest(),
                    bbox.getSouthWest()
                ])
                mapClass.map.fitBounds(poly.getBounds());
            })
            .addTo(mapClass.map)

    }

}