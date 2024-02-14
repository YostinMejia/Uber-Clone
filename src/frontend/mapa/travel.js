export class Travel {

    constructor(travelMethod) {
        this.travelMethod = travelMethod
        this.duration = null
        this.distance = null
        this.price = null
        this.routes = null
        this.routeLayer = null
    }

    travelDuration(durations) {
        let duration = 0
        if (durations[0][1] < durations[1][0]) {
            duration = durations[0][1] / 60
        } else {
            duration = durations[1][0] / 60
        }
        return duration.toFixed(3)
    }

    travelPrice(distance) {
        return distance * 1000
    }

    travelDistance(distances) {
        let distance = 0
        if (distances[0][1] < distances[1][0]) {
            distance = distances[0][1] / 1000
        } else {
            distance = distances[1][0] / 1000
        }
        return distance.toFixed(3)
    }

    async timeToArrive(markersList) {
        // Calcula la distancia y tiempo en llegar a los puntos 
        var service = `http://router.project-osrm.org/table/v1/${this.travelMethod}/`
            + markersList[0].getLatLng().lng + ',' + markersList[0].getLatLng().lat + ';'
            + markersList[1].getLatLng().lng + ',' + markersList[1].getLatLng().lat + "?annotations=distance,duration";

        try {
            const response = await fetch(service);
            if (!response.ok) {
                throw new Error('La API de OSRM falló en la respuesta');
            }
            return await response.json();

        } catch (error) {
            console.error('Error fetching :', error);

        }
    }

    async calculateRoute(markersList) {
        // Realizar una solicitud a la API de OSRM para calcular la ruta
        var url = `http://router.project-osrm.org/route/v1/${this.travelMethod}/` +
            markersList[0].getLatLng().lng + ',' + markersList[0].getLatLng().lat + ';'
            + markersList[1].getLatLng().lng + ',' + markersList[1].getLatLng().lat + '?steps=true&geometries=geojson';

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('La API de OSRM falló en la respuesta ');
        }

        return await response.json();
    }

    async startTravel(markersList) {
        const { routes } = await this.calculateRoute(markersList)

        const { distances, durations } = await this.timeToArrive(markersList)

        this.distance = this.travelDistance(distances)
        this.duration = this.travelDuration(durations)
        this.price = this.travelPrice(this.distance)

        this.routeLayer = L.geoJSON(routes[0].geometry, {
            style: { color: "#000000", weight: 5, opacity: 0.8 }
        })

    }

    deleteRoute() {
        this.duration = null
        this.distance = null
        this.price = null
        this.route = null
        this.travelMethod = null
        this.routeLayer = null
    }

}





