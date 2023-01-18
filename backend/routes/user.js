import Router from "express";
import {
    createAccount,
    upload,
    getAllUsers,
    getUserByUsername,
    login
} from "../controllers/user.js"

const userRoutes = Router();

userRoutes.post("/createAccount", createAccount)

userRoutes.get("/getAllUsers", getAllUsers)

userRoutes.get("/getUserByUsername", getUserByUsername)

userRoutes.post("/login", login)

export { userRoutes }