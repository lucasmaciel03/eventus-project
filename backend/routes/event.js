import Router from "express"
import {
    createEvent,
    getEventsByUserId
} from "../controllers/event.js"

const eventRoutes = Router()

eventRoutes.post("/addEvent/:id", createEvent)

eventRoutes.get("/getEventsByUserId/:id", getEventsByUserId)

export { eventRoutes }