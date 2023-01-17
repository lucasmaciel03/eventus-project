import Router from "express";
import LocationController from '../controllers/location.js';

const locationRoutes = Router();

locationRoutes.post('/create-location', LocationController.createLocation);

export { locationRoutes }