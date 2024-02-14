const socket = io()

export const search = (points, price, distance, duration, startAddress, endAddress) => {
    const travel = {
        points: points, price: price,
        distance: distance, duration: duration,
        startAddress: startAddress, endAddress: endAddress
    }

    socket.emit("search-travel", travel, socket.id)

}


socket.on("travel-accepted", (conductorInfo) => {
    const conductor = document.createElement("ul")
    conductor.setAttribute("id", "conductor")
    const keys = Object.keys(conductorInfo);

    keys.forEach(key => {
        let tempLi = document.createElement("li")
        tempLi.textContent = `${conductorInfo[key]}`
        conductor.appendChild(tempLi)
    });

    document.getElementById("search").remove()

    document.body.appendChild(conductor)
})

