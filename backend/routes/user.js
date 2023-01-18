import Router from "express";
import {
    createAccount,
    upload,
    getAllUsers,
    getUserByUsername
} from "../controllers/user.js"

const userRoutes = Router();

userRoutes.post("/createAccount", createAccount)

userRoutes.get("/getAllUsers", getAllUsers)

userRoutes.get("/getUserByUsername", getUserByUsername)

export { userRoutes }