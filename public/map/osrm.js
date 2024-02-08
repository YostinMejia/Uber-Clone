
export class Travel {

    static travelDuration(durations) {
        let duration = 0
        if (durations[0][1] < durations[1][0]) {
            duration = durations[0][1] / 60
        } else {
            duration = durations[1][0] / 60
        }
        return Math.round(duration)
    }

    static travelPrice(distance) {
        return distance * 1000
    }

    static travelDistance(distances) {
        let distance = 0
        if (distances[0][1] < distances[1][0]) {
            distance = distances[0][1] / 1000
        } else {
            distance = distances[1][0] / 1000
        }
        return Math.round(distance)
    }

    static async tiempoLlegada(markersList, method) {
        // Calcula la distancia y tiempo en llegar a los puntos 
        var service = `http://router.project-osrm.org/table/v1/${method}/` + markersList[0].getLatLng().lng + ',' + markersList[0].getLatLng().lat + ';' + markersList[1].getLatLng().lng + ',' + markersList[1].getLatLng().lat + "?annotations=distance,duration";

        try {
            const response = await fetch(service);
            if (!response.ok) {
                throw new Error('La API de OSRM falló en la respuesta');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching :', error);

        }
    }


    static async trazarRuta(markersList, map, method) {
        try {
            // Realizar una solicitud a la API de OSRM para calcular la ruta
            var url = `http://router.project-osrm.org/route/v1/${method}/` + markersList[0].getLatLng().lng + ',' + markersList[0].getLatLng().lat + ';' + markersList[1].getLatLng().lng + ',' + markersList[1].getLatLng().lat + '?steps=true&geometries=geojson';

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('La API de OSRM falló en la respuesta ');
            }

            const data = await response.json();

            // Limpiar capas anteriores si las hay
            map.eachLayer(function (layer) {
                if (layer instanceof L.Polyline) {
                    map.removeLayer(layer);
                }
            });

            // Trazado de rutas
            var route = L.geoJSON(data.routes[0].geometry, {
                style: { color: "#ff7800", weight: 5, opacity: 0.6 }
            }).addTo(map);
            map.fitBounds(route.getBounds());
        } catch (error) {
            console.error('Error fetching :', error);
        }
    }

    static async travel(markersList, map, method) {
        await this.trazarRuta(markersList, map, method)
        const { distances, durations } = await this.tiempoLlegada(markersList, method)

        const distance = this.travelDuration(distances)

        document.getElementById("distance").innerText = "Distance (Km):" + distance
        document.getElementById("duration").innerText = "Duration (minutes):" + this.travelDuration(durations)
        document.getElementById("price").innerText = "precio (pesos):" + this.travelPrice(distance)
    }

}





