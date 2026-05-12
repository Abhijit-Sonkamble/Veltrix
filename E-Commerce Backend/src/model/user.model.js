const mongoose = require("mongoose");

const userSchema = mongoose.Schema ({

    name: {
        type : String,
        required : true
    },
     last_name: {
        type : String,
        required : true
    },
     email: {
        type : String,
        required : true,
        unique : true // unique personality dete agar same asale tr error kinva notifacation deil
    },
     password: {
        type : String,
        required : true
    },
     phone: {
        type : String,
        required : true
    },
     gender: {
        type : String,
        required : true
    },
     address : {
        type : String,
        default : ""
    },
     profile_image: {
       type : String,
       required : true
   },
    OTP : {
        type : Number,
        default : 0
    },
    OTP_Expire : {
        type : Date,
        default : null
    },
    attempt : { // OTP che kiti attempt
        type : Number,
        default : 0
    },
    attempt_Expire : { // Kiti vela takayche otp
        type : Date,
        default : null
    },
    verify_attempt : { //Verify che kiti attempt
        type : Number,
        default : 0
    },
    verify_attempt_Expire : { //Verify kiti vela takayche otp
        type : Date,
        default : null
    },
    isActive : { // User active hai ki nhi dikhayega
        type: Boolean,
        default: true
    },
    isDelete : { // User la soft delete karala ithe true false dakhvel
        type: Boolean,
        default: false
    },
    create_at : { // User kevha banla tyacha data milel
        type: String,
        required: true
    },
    update_at : { // User chya data madhe kadhi changes zale
        type: String,
        required: true
    },

});

module.exports = mongoose.model("User", userSchema, "User")