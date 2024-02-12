const socket = io()

export const search = (points, price, distance, duration, startAddress, endAddress) => {
    const travel = {
        points: points, price: price,
        distance: distance, duration: duration,
        startAddress: startAddress, endAddress: endAddress
    }
    socket.emit("search-travel", travel)
}


