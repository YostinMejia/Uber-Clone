import { Travel } from "../mapa/travel.js";
import { Map } from "../mapa/map.js";
import { Markers } from "../mapa/marker.js";
import { googleLayers, defaultLayer } from "../mapa/layers.js";

const markers = new Markers();
const travelRepository = new Travel("car");
const map = new Map(googleLayers, defaultLayer, travelRepository, markers);
await map.createMap();

const socket = io();

const travelUl = document.getElementById("travels");

socket.on("search-driver", (travel, userSocketId) => {
    const ul = travelUl.getElementsByTagName("ul");
    const ulElements = ul.length;


    const info = document.createElement("ul");
    info.classList.add("travel-info");
    info.setAttribute("id", ulElements);
    travelUl.appendChild(info);

    const keys = Object.keys(travel);

    const fieldNames = {
        price: "Precio Total(COP)",
        distance: "Distancia (km)",
        duration: "Duración (minutos)",
        startAddress: "Punto de Partida",
        endAddress: "Punto Destino"
    };




    keys.forEach(key => {
        if (key !== "points") {
            let tempLi = document.createElement("li");
            tempLi.textContent = `${fieldNames[key]}: ${travel[key]}`;
            info.appendChild(tempLi);
        }
    });




    const aceptBtn = document.createElement("button");
    aceptBtn.classList.add("acept-button");
    aceptBtn.setAttribute("id", `acept-${ulElements}`);
    aceptBtn.textContent = "ACEPTAR";
    aceptBtn.addEventListener("click", async (e) => {
        while (travelUl.firstChild) {
            travelUl.removeChild(travelUl.firstChild);
        }

        const fieldNames = {
            price: "Precio Total(COP)",
            distance: "Distancia(km)",
            duration: "Duración",
            startAddress: "Punto de Partida",
            endAddress: "Punto Destino"
        };

        keys.forEach(key => {
            if (key !== "points") {
                let tempLi = document.createElement("li");
                tempLi.textContent = `${fieldNames[key]}: ${travel[key]}`;
                travelUl.appendChild(tempLi);
            }
        });


        const markersList = [];
        travel.points.forEach(point => {
            markersList.push(markers.createMarker(point[0], point[1], map, travelRepository));
        });
        await travelRepository.startTravel(markersList);
        map.traceRoute(travelRepository.routeLayer);
        const conductorInfo = { nombre: "yostin", carro: "ferrari", placa: "ASD123" }

        socket.emit("travel-accepted", conductorInfo, userSocketId)
    });



    const denyBtn = document.createElement("button");
    denyBtn.classList.add("deny-button");
    denyBtn.setAttribute("id", ` deny-${ulElements}`);
    denyBtn.textContent = "RECHAZAR";
    denyBtn.addEventListener("click", (e) => {

        info.remove();
    });

    info.appendChild(aceptBtn);
    info.appendChild(denyBtn);
});







