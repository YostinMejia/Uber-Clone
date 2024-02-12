import { Geocoder } from "../mapa/geocoder.js";
import { Travel } from "../mapa/travel.js"
import { Map } from "../mapa/map.js"
import { Markers } from "../mapa/marker.js";
import { googleLayers, defaultLayer } from "../mapa/layers.js";
import { search } from "./socketio-cliente.js";

const markers = new Markers()
const travel = new Travel("car")
const map = new Map(googleLayers, defaultLayer, travel, markers)
await map.createMap()
const geocoder = new Geocoder()
geocoder.initGeocoder(map, travel, markers)


const buscar = document.getElementById("search")

buscar.addEventListener("click", (e) => {
    const coordenadas = []
    markers.markersList.forEach(marker => {
        let lat = marker.getLatLng().lat
        let lng = marker.getLatLng().lng
        coordenadas.push([lat, lng])
    });
    search(coordenadas,
        travel.price, travel.distance, travel.duration,
        geocoder.recogida, geocoder.llegada)

})

