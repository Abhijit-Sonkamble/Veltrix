const express = require("express");
const auth = express.Router();

auth.use("/admin", require("./admin/admin.route"))

//User Routes
auth.use("/user", require("./user/user.route"));

// Category Routes
auth.use("/category", require("../category/category.route"))

module.exports = auth;