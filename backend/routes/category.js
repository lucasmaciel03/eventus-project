import Router from "express"
import {
    addCategory,
    getCategories,
    updateImage,
    upload
} from "../controllers/category.js"

const categoryRoutes = Router()

categoryRoutes.post("/addCategory", addCategory)

categoryRoutes.get("/getCategories", getCategories)

categoryRoutes.put("/updateImage/:id", upload, updateImage)


export { categoryRoutes }