export function clientSocketioServer(io) {

    io.on("connection", (socket) => {

        console.log("User connected", socket.id);

        socket.on("search-travel", (travel) => {
            //emitir el mensaje a todos los que esten en el room de conductores
            io.to("drivers-availables").emit("search-driver", travel)
            //Activar el notificador para que se trace el mapa con las rutas y demás

        })

        socket.on("travel-accepted",(travel)=>{
            console.log("aceptado jsiajdksd",travel);
        })

        socket.on("disconnect", (e) => {
            
            console.log("USer disconnected", e);
        })

    })

}