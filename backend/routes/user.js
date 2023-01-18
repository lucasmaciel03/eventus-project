import Router from "express";
import {
    createAccount,
    upload,
    getAllUsers
} from "../controllers/user.js"

const userRoutes = Router();

userRoutes.post("/createAccount", upload, createAccount)

userRoutes.get("/getAllUsers", getAllUsers)

export { userRoutes }