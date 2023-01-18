import Router from "express";
import {
    addlocation,
    getLocations,
    getLocationByDescription
} from "../controllers/location.js";

const locationRoutes = Router();

locationRoutes.post('/createlocation', addlocation);

locationRoutes.get('/getLocations', getLocations);

locationRoutes.post('/getLocationByDescription', getLocationByDescription);

export { locationRoutes }