
export class Map {
    constructor(layers, defaultLayer, travelRepository, markers, initialLog = 6.262324, initialLat = -75.564080) {
        this.layers = layers
        this.defaultLayer = defaultLayer
        this.travelRepository = travelRepository
        this.markers = markers
        this.initialLog = initialLog
        this.initialLat = initialLat
        this.map = null
    }

    async createMap() {
        const map = L.map('map').setView([this.initialLog, this.initialLat], 12);
        this.defaultLayer.addTo(map) //default layer
        L.control.layers(this.layers).addTo(map) //layer options

        // Agregar un controlador de eventos de clic al mapa
        map.on('click', async (e) => {

            // Obtener las coordenadas de donde se hizo clic
            var lat = e.latlng.lat;
            var lng = e.latlng.lng;

            // Agregar un marcador en la ubicación donde se hizo clic
            // Solo se acepta marcar rutas entre dos puntos
            if (this.markers.markersList.length < 2) {
                const marker = await this.markers.createMarker(lat, lng, this, this.travelRepository)
            }
            if (this.markers.markersList.length >= 2) {
                await this.travelRepository.startTravel(this.markers.markersList)
                this.traceRoute(this.travelRepository.routeLayer)
                this.setTravelDataHtml(this.travelRepository.duration, this.travelRepository.distance, this.travelRepository.price)
            }

        });

    

        this.map = map
    }

    setTravelDataHtml(duration, distance, price) {
        document.getElementById("distance").innerText = "" + distance
        document.getElementById("duration").innerText = "" + duration
        document.getElementById("price").innerText = "" + price
    }

    traceRoute(routeLayer) {
        try {

            // Limpiar capas anteriores si las hay
            this.map.eachLayer((layer) => {
                if (layer instanceof L.Polyline) {
                    this.map.removeLayer(layer);
                }
            });

            routeLayer.addTo(this.map);
            this.map.fitBounds(routeLayer.getBounds());

        } catch (error) {
            console.error('Error fetching :', error);
        }
    }
}

