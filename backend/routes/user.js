import Router from "express";
import {
    createAccount,
    upload,
    getAllUsers,
    getUserByUsername,
    login,
    getUserById,
    updateLocation,
    updateProfilePicture,
    updateProfilePictureToDefault,
    // deleteUser,
    updateName,
    updateSurname,
    updateEmail,
    updateUser,
    updateUsername,
    getLikedEvents,
    getEventsByUserId,
    updatePassword,
} from "../controllers/user.js"

const userRoutes = Router();

userRoutes.post("/createAccount", createAccount)

userRoutes.get("/getAllUsers", getAllUsers)

userRoutes.get("/getUserByUsername", getUserByUsername)

userRoutes.post("/login", login)

userRoutes.get("/getUserById/:id", getUserById)

userRoutes.put("/updateLocation/:id", updateLocation)

userRoutes.put("/updateProfilePicture/:id", upload, updateProfilePicture)

userRoutes.put("/updateProfilePictureToDefault/:id", updateProfilePictureToDefault)

userRoutes.put("/updatePassword/:id", updatePassword)

// userRoutes.delete("/deleteUser/:id", deleteUser)

userRoutes.put("/updateName/:id", updateName)

userRoutes.put("/updateSurname/:id", updateSurname)

userRoutes.put("/updateEmail/:id", updateEmail)

userRoutes.put("/updateUser/:id", updateUser)

userRoutes.put("/updateUsername/:id", updateUsername)

userRoutes.get("/getLikedEvents/:id", getLikedEvents)

userRoutes.get("/getEventsByUserId/:id", getEventsByUserId)


export { userRoutes }