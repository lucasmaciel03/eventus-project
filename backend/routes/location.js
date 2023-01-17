import Router from "express";
import {
    addlocation
} from "../controllers/location.js";

const locationRoutes = Router();

locationRoutes.post('/createlocation', addlocation);

export { locationRoutes }