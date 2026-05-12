const mongoose = require("mongoose");

const URI = process.env.MONGO_LINK;

mongoose.connect(URI).then(()=>{
    console.log("MongoDB connected.....");
}).catch((err)=>{
    console.log("Not Connected.....", err)
})