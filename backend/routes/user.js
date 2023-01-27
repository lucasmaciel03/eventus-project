import Router from "express";
import {
    createAccount,
    upload,
    getAllUsers,
    getUserByUsername,
    login,
    getUserById,
    updateLocation,
    updateProfilePicture
} from "../controllers/user.js"

const userRoutes = Router();

userRoutes.post("/createAccount", createAccount)

userRoutes.get("/getAllUsers", getAllUsers)

userRoutes.get("/getUserByUsername", getUserByUsername)

userRoutes.post("/login", login)

userRoutes.get("/getUserById/:id", getUserById)

userRoutes.put("/updateLocation/:id", updateLocation)

userRoutes.put("/updateProfilePicture/:id", upload, updateProfilePicture)

export { userRoutes }