
export function driverSocketioServer(io) {

    io.on("connection", (socket) => {
        console.log("conductor conectado", socket.id);
        socket.join("drivers-availables")

        socket.on("disconect", (e) => {
            console.log("conductor desconectado", e);
        })


    })

}