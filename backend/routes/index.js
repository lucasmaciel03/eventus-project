import Router from "express";

const routes = Router();

// create route hello world
routes.get("/", (req, res) => {
    res.send("Hello World!");
});



export { routes };