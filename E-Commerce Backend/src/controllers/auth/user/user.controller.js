const UserAuthService = require("../../../services/auth/user/user.service");
const { MSG } = require("../../../utils/msg");
const { errorRes, successRes } = require("../../../utils/response"); // Utils madhun ithe import kele bcoz error and success cha response aala tr kay disle pahije
const moment = require('moment');

//Password Hash and encrypt sathi
const bcrypt = require ("bcrypt");

//JWT import
const jwt = require("jsonwebtoken");

//Status code import
const statusCode = require("http-status-codes");
const { sendOTPMail } = require("../../../utils/mailer");
const AdminAuthService = require("../../../services/auth/admin/admin.service");


//Yat aapn UserAuthService he require kele tyamule services madhle sagle ikde use karu shakto
const userServiceAuth = new UserAuthService(); //yat new he keyword object banvala use hote purn js madhe


//Register Admin
module.exports.registerUser = async(req, res)=>{
     try {

        const user = await userServiceAuth.fetchSingleUser({email : req.body.email, isDelete : false, isActive : true}, true);

        if (user) {
        return res.status(statusCode.BAD_REQUEST).json(successRes(statusCode.BAD_REQUEST, true, MSG.USER_ALREADY_EXISTS));
        }

        //Password la bcrypt karte he req.body madhun password gheil and tyatun bcrypt karel
      req.body.password =   await bcrypt.hash(req.body.password, 12)

        req.body.create_at = moment().format('DD/MM/YYYY, h:mm:ss a');
        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss a');

        //Image multer
         req.body.profile_image = req.file.path ;

        const newUser = await userServiceAuth.registerUser(req.body); //Yachya madhe userServiceAuth ithun gheil and registerAdmin madhe takel req.body madhe
        if (!newUser) {
            console.log("Admin Not Added : "); 
            return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.USER_REGISTRATION_FAILED)); 
        }

        return res.status(statusCode.CREATED).json(successRes(statusCode.CREATED, false, MSG.USER_REGISTRATION_SUCCESS, newUser)); //ithe aapn newAdmin pass kela tyamule aapn data fetch karu shakto postman madhe and console madhe
     } catch (err) {
        console.log("Error in register : ",err)
     }
}

//Login Admin
module.exports.loginUser = async(req, res) => {

   try {
      const user = await userServiceAuth.fetchSingleUser({email: req.body.email, isDelete : false, isActive : true}, false);

      if (!user) {
        return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.USER_NOT_FOUND));
        }

     const isPassword = await bcrypt.compare(req.body.password, user.password); // ithe compare madhe compare(jithun password yetoy, encrypt password kuthun yetoy te);

     if (!isPassword) {
        return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.INVALID_CREDENTIALS));
     }


     //JWT logic
     const payload = {
      id : user.id,
      isAdmin : false // Yache meaning he aahe ki ha admin nahiye
     }

     const token = jwt.sign(payload, process.env.SECRET_KEY );


        return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.USER_LOGIN_SUCCESS, {token})); //ithe aapn newAdmin pass kela tyamule aapn data fetch karu shakto postman madhe and console madhe
   } catch (err) {
       console.log("Error : ", err)
   }

}

//Forgot Password
module.exports.forgotPassword = async (req, res) => {
  try {
    console.log(req.body);

    const user = await userServiceAuth.fetchSingleUser({ email: req.body.email , isDelete : false, isActive : true}, false);

    if (!user) {
             return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.USER_NOT_FOUND));
    }

    // Kiti vela nantar expire over zali pahije
    if (user.attempt_Expire < Date.now()) {
      user.attempt = 0
    }


    //Otp attempt
    if (user.attempt >= 3) {
      return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.TOO_MANY_ATTEMPTS));
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);

    console.log("OTP : ", OTP);

    //For OTP and send msg
   await sendOTPMail(req.body.email, OTP);

    
    user.attempt++ ; //OTP attempt + hot jayla pahije

    const OTP_Expire = new Date(Date.now() + 1000 * 60 * 2); // OTP expire cha logic aahe te last che num minute dakhvtat

    await userServiceAuth.updateUser(user.id, {OTP, OTP_Expire, attempt: user.attempt, attempt_Expire : new Date(Date.now() + 1000 * 60 * 2)}) //Yachya madhe kuthun data kuthe yeil te dakhvtay tr ithe (admin chya variable madun id yeil, {aani ithe aapn model and variable che name same thevle tyamule})



    return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.OTP_SENT_SUCCESS));

  } catch (err) {
    console.log("Error in forgot : ", err);
  }
};

//Verify OTP
module.exports.verifyOTP = async (req, res) => {
  try {
   console.log(req.body);
const user = await userServiceAuth.fetchSingleUser({ email: req.body.email , isDelete : false, isActive : true}, false);

    if (!user) {
             return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.USER_NOT_FOUND));
    }

    //Verify otp chi timing set karte
        if (user.verify_attempt_Expire < Date.now()) {
            user.verify_attempt = 0;
        }

   // Verify attempt limit
    if (user.verify_attempt >= 3) {
      return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.MANY_ATTEMPTS));
    }
    
    //Check expire otp time
    if (Date.now() > user.OTP_Expire) {
      return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.OTP_EXPIRED))
      
    }

    //Verify kele ki + zale pahije
    user.verify_attempt++ ;

    //Verify che attempt update zale pahije aapn vadhvle tr tyamule he use kartat
    await userServiceAuth.updateUser(user.id, {verify_attempt : user.verify_attempt, verify_attempt_Expire : new Date(Date.now() + 1000 * 60 * 2) })

    //Check otp
    if(req.body.OTP !== user.OTP){
      return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.OTP_INVALID))
    }

   //  Verify zalyavar OTP chi value 0 and Expire chi value null zali pahije tyamule ha logic
    await userServiceAuth.updateUser(user.id, {OTP : 0, OTP_Expire : null , verify_attempt : user.verify_attempt, verify_attempt_Expire : new Date(Date.now() + 1000 * 60) })



    return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.OTP_VERIFIED_SUCCESS))

  } catch (err) {
    console.log("Error in OTP : ", err);
  }
};


//Forget new password
module.exports.newPassword = async(req, res)=> {
   console.log(req.body);

   const user = await userServiceAuth.fetchSingleUser({email: req.body.email, isDelete : false, isActive : true}, true);

   req.body.newPassword =   await bcrypt.hash(req.body.newPassword, 12) // Update kelyavr hash zala pahije

 const updatedPassword =   await userServiceAuth.updateUser(user.id , {password : req.body.newPassword}); //Yachya madhe admin.id yeil ki kontya id chi aahe {and yat password yeil password madhun req.body.newPassword mhanje req.body madhun newPassword milel}

 if (!updatedPassword) {
      return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.PASSWORD_NOT_UPDATED))
 }

    return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.PASSWORD_UPDATED))


}

//fetch all User
module.exports.fetchAllUser = async(req, res)=>{
     try {
      const allUser = await userServiceAuth.fetchAllUser();

      if (req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }

       return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.USER_FETCH_SUCCESS , allUser)); 
     } catch (err) {
        console.log("Error in Fetch All user : ",err)
     }
}

//User Delete
module.exports.deleteUser = async(req, res) => {
 try {

   const user = await userServiceAuth.fetchSingleUser({_id: req.query.id, isDelete : false, isActive : true }, true);

    if (!user) {
             return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.USER_NOT_FOUND));
    }
  

      const deleteUser = await userServiceAuth.updateUser(req.query.id , {isDelete : true, isActive: false});  // Ithe isDelete true and active false ahe means je ae asale te delete nahi karu shakt

      if (req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }

      if (!deleteUser) {
        return res.status(statusCode.BAD_REQUEST).json(successRes(statusCode.BAD_REQUEST, true, MSG.USER_DELETE_FAILED));
        
      }

       return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.USER_DELETE_SUCCESS)); 
     } catch (err) {
        console.log("Error in Delete : ",err)
     }
}


//Update User
module.exports.updateUser = async(req, res) => {
 try {

  if (req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }

      
      const user = await userServiceAuth.fetchSingleUser({_id: req.query.id, isDelete : false, isActive : true }, true);
      console.log(req.query.id)

      console.log(user)

    if (!user) {
             return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.USER_NOT_FOUND));
    }
  
    req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss A');

 //Ithe pn aapn query la priority deto safety mule
      const updateUser = await userServiceAuth.updateUser(req.query.id , req.body); 

      
      if (!updateUser) {
        return res.status(statusCode.BAD_REQUEST).json(successRes(statusCode.BAD_REQUEST, true, MSG.USER_UPDATE_FAILED));
        
      }

       return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.USER_UPDATE_SUCCESS, updateUser)); // Yachya madhe last la result nasaate dakhvt pn aaplyala kalal pahije mhanun taklay
     } catch (err) {
        console.log("Error in Update user : ",err)
     }
}

//Active or inActive
module.exports.activeOrInactiveUser = async(req, res) => {
 try {

  if (req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }

   const user = await userServiceAuth.fetchSingleUser({_id: req.query.id, isDelete : false }, true);

    if (!user) {
             return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.USER_NOT_FOUND));
    }
  

 //Ithe pn aapn query la priority deto safety mule
    const updateUser = await userServiceAuth.updateUser(req.query.id, {isActive: !user.isActive, update_at: moment().format('DD/MM/YYYY, h:mm:ss A')}); //True aahe tr False and False aahe tr true kara sathi admin madhun inActive ghetle ! and he change kara sathi use kartat

return res.status(statusCode.OK).json(successRes(statusCode.OK, false, `${user.name} ${user.last_name} is ${updateUser.isActive ? 'active' : 'inactive'}`)); // Yachya madhe last la result nasaate dakhvt pn aaplyala kalal pahije mhanun taklay

     } catch (err) {
        console.log("Error in Active or Inactive : ",err)
     }
}


//User Profile
module.exports.userProfile = async(req, res) => {
 try {
      if (!req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }
       return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.USER_PROFILE_FETCH_SUCCESS, req.user)); //Ithe req.admin yachya mule diley bcoz tyatun data yeil aani aapn he middleware madhe declare keley

     } catch (err) {
        console.log("Error in User Profile : ",err)
     }
}


//Change Password
module.exports.change_password = async(req, res) => {

    try {
            if (!req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }

      const user = await userServiceAuth.fetchSingleUser({_id: req.user.id, isDelete: false, isActive: true}, false);

      const isPassword = await bcrypt.compare(req.body.currentPassword, user.password);

        if (!isPassword) {
            return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.INVALID_PASSWORD))
       }
       //Password Hashing
       req.body.newPassword = await bcrypt.hash(req.body.newPassword, 12)

       const updatedPassword =   await userServiceAuth.updateUser(user.id , {password : req.body.newPassword}); //Yachya madhe admin.id yeil ki kontya id chi aahe {and yat password yeil password madhun req.body.newPassword mhanje req.body madhun newPassword milel}
       
        if (!updatedPassword) {
             return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.PASSWORD_NOT_UPDATED))
        }
       
           return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.PASSWORD_UPDATED))
    } catch (error) {
        console.log("Error in change Password user", error)
    }



}
