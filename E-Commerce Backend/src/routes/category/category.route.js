const express = require("express");
const { addCategory, fetchCategory, updateCategory, deleteCategory, activeOrInactive, fetchSingleCategory } = require("../../controllers/category/category.controller");
const { upload } = require("../../middleware/storage.middleware");

const categoryRoute = express.Router()

//Add Category
categoryRoute.post("/", upload.single("category_image"), addCategory);

//fetch Category
categoryRoute.get("/", fetchCategory)

//Fetch Single Category
categoryRoute.get("/:id", fetchSingleCategory)

//Update Category
categoryRoute.patch("/", updateCategory)

//Delete Category
categoryRoute.delete("/", deleteCategory)

//Active Or Inactive
categoryRoute.put("/", activeOrInactive)

module.exports = categoryRoute; 