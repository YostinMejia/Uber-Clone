
export function driverSocketioServer(io) {

    io.on("connection", (socket) => {
        console.log("Conductor conectado", socket.id);
        socket.join("drivers-availables")

        socket.on("disconect", (e) => {
            console.log("conductor desconectado", e);
        })


        socket.on("travel-accepted",(conductorInfo,userSocketId)=>{
            socket.to(userSocketId).emit("travel-accepted", conductorInfo)
        })



    })

}