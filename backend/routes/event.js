import Router from "express"
import {
    createEvent,
    getEventsByUserId,
    getEventsByCategoryId,
    getAllEvents
} from "../controllers/event.js"

const eventRoutes = Router()

eventRoutes.post("/addEvent/:id", createEvent)

eventRoutes.get("/getEventsByUserId/:id", getEventsByUserId)

eventRoutes.get("/getEventsByCategoryId/:id", getEventsByCategoryId)

eventRoutes.get("/getAllEvents", getAllEvents)

export { eventRoutes }