import Router from "express";
import {
    createAccount,
    upload,
    getAllUsers,
    getUserByUsername,
    login,
    getUserById
} from "../controllers/user.js"

const userRoutes = Router();

userRoutes.post("/createAccount", createAccount)

userRoutes.get("/getAllUsers", getAllUsers)

userRoutes.get("/getUserByUsername", getUserByUsername)

userRoutes.post("/login", login)

userRoutes.get("/getUserById/:id", getUserById)

export { userRoutes }