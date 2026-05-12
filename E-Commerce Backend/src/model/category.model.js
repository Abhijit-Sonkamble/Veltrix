const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({

    category_name : String,
     category_image: {
       type : String,
       required : true
   },
    isActive : {
        type: Boolean,
        default : true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    create_at : {
        type: String,
        required: true
    },
    update_at : {
        type: String,
        required: true
    },

})

module.exports = mongoose.model("Category", categorySchema, "Category")