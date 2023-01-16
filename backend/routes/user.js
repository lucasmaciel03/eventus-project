import Router from "express";
import {
    createUser,
    upload,
    getAllUsers
} from "../controllers/user.js"

const userRoutes = Router();

userRoutes.post("/createUser", upload, createUser)

userRoutes.get("/getAllUsers", getAllUsers)

export { userRoutes }