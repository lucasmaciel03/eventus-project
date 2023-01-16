// Description: server.js file
import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config.js";
import { routes } from "./routes/index.js";
import { dbInstance } from "./config/db.js";

// create express app
//--REST SERVER--//
const app = express();

// client can be postman | react website | react localhost link | etc
const clientURL = "*";

// CORS options
const corsOptions = {
  origin: clientURL,
};
app.use(cors(corsOptions));

// output logs
app.use(morgan("short"));

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//--ROUTES--//
app.use("/api", routes);

try {
  dbInstance.sync({ force: false, alter: true });
} catch (error) {
  console.log(error);
}

// correr server no url host:port definido em .env
app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log(
    "Server up and running at http://%s:%s",
    process.env.SERVER_HOST,
    process.env.SERVER_PORT
  );
});