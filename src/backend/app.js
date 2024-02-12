import express from "express"
import dotenv from "dotenv"
import { Server } from "socket.io";
import { createServer } from "http"
import { clienteRouter } from "./routes/cliente-router.js"
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { clientSocketioServer } from "./client-socketio-server.js"
import { driverSocketioServer } from "./driver-socketio-server.js"
import { driverRouter } from "./routes/driver-route.js"
dotenv.config()
const app = express()


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const mapa= join(__dirname, ".." ,"frontend","mapa" )


app.use("/mapa",express.static(mapa))
app.use("/conductor", driverRouter)
app.use("/", clienteRouter)

app.use("*", (req, res) => {
    res.status(404).send("Rutan invalida")
})

const port = process.env.PORT || 3000
const http = createServer(app)
const io = new Server(http)
export function start(io, http, port) {

    try {

        clientSocketioServer(io)
        driverSocketioServer(io)
        http.listen(port, (req, res) => {
            console.log("Server listen on port", port);
        })
    } catch (e) {
        console.log(e);
    }
}

start(io, http, port)

