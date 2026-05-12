const express = require("express");
const { registerAdmin, loginAdmin, fetchAllAdmin, fetchSingleAdmin, forgotPassword, verifyOTP, newPassword, deleteAdmin, updateAdmin, activeOrInactiveAdmin, profileAdmin, change_password,  } = require("../../../controllers/auth/admin/admin.controller");


const {upload} = require("../../../middleware/storage.middleware")

const adminRoute = express.Router();

//Register Admin
adminRoute.post("/registerAdmin", upload.single("profile_image") ,registerAdmin); // Profile image hi key aahe

//Login Admin
adminRoute.post("/loginAdmin", loginAdmin);

//Forgot Paaword
adminRoute.post("/forgotPassword" , forgotPassword) 

//Verify OTP
adminRoute.post("/verifyOTP", verifyOTP)

//Forget new password
adminRoute.post("/newPassword", newPassword)



//All Admin Fetch
adminRoute.get("/", fetchAllAdmin )

//Delete Admin
adminRoute.delete("/" , deleteAdmin)


//Admin chi profile disli pahije current konta aahe tr
adminRoute.get("/profile", profileAdmin)

//Fetch single andmin with params means id dyaychi route madhe
adminRoute.get("/:id" , fetchSingleAdmin) 

//Update admin with query
adminRoute.patch("/", updateAdmin)

//Active / Inactive
adminRoute.put("/", activeOrInactiveAdmin)

//change-password
adminRoute.post("/change-password", change_password)




module.exports = adminRoute; 