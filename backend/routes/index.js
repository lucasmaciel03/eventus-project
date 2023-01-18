import Router from "express";
import { userRoutes } from "./user.js";
import { locationRoutes } from "./location.js";
import { categoryRoutes } from "./category.js";

const routes = Router();

// Hello 
routes.get("/", (req, res) => {
    res.send("Hello Stranger, welcome to EVENTUS!");
});

routes.use("/user", userRoutes);

routes.use("/location", locationRoutes);

routes.use("/category", categoryRoutes);


export { routes };