import Router from "express";
import { userRoutes } from "./user.js";

const routes = Router();

// Hello 
routes.get("/", (req, res) => {
    res.send("Hello Stranger, welcome EVENTUS!");
});

routes.use("/user", userRoutes);



export { routes };