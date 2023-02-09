import Router from "express"
import {
    createEvent,
    getEventsByUserId,
    getEventsByCategoryId,
    getAllEvents,
    upload,
    addLike,
    getEventsByUserIdAndCategoryId,
    getEventsOrderByLikes,
    createEventComment,
    getEventComments
} from "../controllers/event.js"

const eventRoutes = Router()

eventRoutes.post("/addEvent/:id",upload ,createEvent)

eventRoutes.get("/getEventsByUserId/:id", getEventsByUserId)

eventRoutes.get("/getEventsByCategoryId/:id", getEventsByCategoryId)

eventRoutes.get("/getAllEvents", getAllEvents)

eventRoutes.post("/addLike/:id/:eventId", addLike)

eventRoutes.get("/getEventsByUserIdAndCategoryId/:id/:categoryId", getEventsByUserIdAndCategoryId)

eventRoutes.get("/getEventsOrderByLikes", getEventsOrderByLikes)

eventRoutes.post("/createEventComment/:id/:eventId", createEventComment)

eventRoutes.get("/getEventComments/:eventId", getEventComments)

export { eventRoutes }