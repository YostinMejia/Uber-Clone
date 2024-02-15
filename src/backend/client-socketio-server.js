export function clientSocketioServer(io) {

    io.on("connection", (socket) => {

        console.log("Usuario conectado", socket.id);

        socket.on("search-travel", (travel, userSocketId) => {
            //emitir el mensaje a todos los que esten en el room de conductores
            io.to("drivers-availables").emit("search-driver", travel, userSocketId)

        })

        socket.on("disconnect", (e) => {

            console.log("Usuario desconectado", e);
        })
    

    })

}