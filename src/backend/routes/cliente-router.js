import express,{ Router } from "express";
export const clienteRouter = Router()

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const front= join(__dirname, "..", "..", "frontend","cliente" )

clienteRouter.use("/",express.static(front))
