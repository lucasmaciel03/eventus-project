import Router from "express";
import {
    addlocation,
    getLocations
} from "../controllers/location.js";

const locationRoutes = Router();

locationRoutes.post('/createlocation', addlocation);

locationRoutes.get('/getLocations', getLocations);

export { locationRoutes }