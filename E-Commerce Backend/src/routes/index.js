const express = require("express");
const route = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

//Auth routes
route.use("/auth", require("../routes/auth/auth.route"));


// Auth Middleware
route.use(authMiddleware);

//Admin cha route fetch hoyla pahije mhanun auth chi condition nahi jayla pahije mhanun ekda ch
route.use("/admin", require("./auth/admin/admin.route"))

//User cha route fetch hoyla pahije mhanun auth chi condition nahi jayla pahije mhanun ekda ch
route.use("/user", require("./auth/user/user.route"))

//Category
route.use("/category", require("./category/category.route"))

module.exports = route;