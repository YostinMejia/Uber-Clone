import { Geocoder } from "./geocoder.js";
import { Travel } from "./travel.js"
import { Map } from "./map.js"
import { Markers } from "./marker.js";
import { googleLayers, defaultLayer } from "./layers.js";

const markers = new Markers()
const travel = new Travel("car")
const map = new Map(googleLayers, defaultLayer, travel, markers)
await map.createMap()
const geocoder = new Geocoder()
geocoder.initGeocoder(map, travel, markers)




