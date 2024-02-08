import { geocoder } from "./geocoder.js";
import { createMap } from "./map.js";
import { Travel } from "./osrm.js";
const map = createMap()
geocoder(map)

var markersList = [];

// Agregar un controlador de eventos de clic al mapa
map.on('click', async function (e) {
    // Obtener las coordenadas de donde se hizo clic
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    // Agregar un marcador en la ubicación donde se hizo clic
    // Solo se acepta marcar rutas entre dos puntos
    if (markersList.length < 2) {

        let marker = L.marker([lat, lng], {
            draggable: true
        }).addTo(map)
            .bindPopup('Latitud: ' + lat + '<br>Longitud: ' + lng)
            .openPopup()

        markersList.push(marker);


        // Agregar controlador de eventos 'moveend' al marcador
        marker.on("moveend", async function (event) {
            // var newLatLng = event.latlng; 
            if (markersList.length >= 2) {
                await Travel.travel(markersList, map, "car")
            }

        });

    }

    if (markersList.length == 2) {
        await Travel.travel(markersList, map, "car")
    }

});