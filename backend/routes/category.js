import Router from "express"
import {
    addCategory,
    getCategories
} from "../controllers/category.js"

const categoryRoutes = Router()

categoryRoutes.post("/addCategory", addCategory)

categoryRoutes.get("/getCategories", getCategories)


export { categoryRoutes }