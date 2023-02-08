import Router from "express";
import {
    addlocation,
    getLocations,
    getLocationByDescription,
    deleteLocations
} from "../controllers/location.js";

const locationRoutes = Router();

locationRoutes.post('/createlocation', addlocation);

locationRoutes.get('/getLocations', getLocations);

locationRoutes.post('/getLocationByDescription', getLocationByDescription);

locationRoutes.delete('/deleteLocations', deleteLocations);

export { locationRoutes }