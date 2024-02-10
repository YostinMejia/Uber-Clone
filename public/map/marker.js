export class Markers {

    constructor() {
        this.markersList = []
    }

    createMarker(lat, lng, mapClass, travelRepository) {

        let marker = L.marker([lat, lng], {
            draggable: true
        }).addTo(mapClass.map)
            .bindPopup('Latitud: ' + lat + '<br>Longitud: ' + lng)
            .openPopup()

        marker.on("moveend", async (e) => {
            if (this.markersList.length >= 2 && !travelRepository.routeLayer) {
                await travelRepository.startTravel(this.markersList)
                mapClass.traceRoute(travelRepository.routeLayer)
            }
        });

        marker.on("dblclick", (e) => {
            if (this.markersList.length > 1) {
                mapClass.map.removeLayer(travelRepository.routeLayer)
                travelRepository.deleteRoute()
            }

            mapClass.map.removeLayer(marker)
            this.markersList.splice(this.markersList.indexOf(marker), 1)
            console.log(this.markersList);
            travelRepository.deleteRoute()

            if (marker.llegada) {
                document.getElementById("llegada").innerText = ""
            } else {
                document.getElementById("recogida").innerText = ""

            }

        })

        if (this.markersList.length === 0 || this.markersList[0].llegada) {
            marker.recogida = true
        } else {
            marker.llegada = true
        }

        this.markersList.push(marker)

        return marker
    }

}