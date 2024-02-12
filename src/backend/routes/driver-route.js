import express,{Router} from "express"
import { fileURLToPath } from "url";
import { dirname, join } from "path";
export const driverRouter = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const front= join(__dirname, "..", "..", "frontend", "conductor")


driverRouter.use("/",express.static(front))

