const AdminAuthService = require("../../../services/auth/admin/admin.service");
const { MSG } = require("../../../utils/msg");
const { errorRes, successRes } = require("../../../utils/response"); // Utils madhun ithe import kele bcoz error and success cha response aala tr kay disle pahije
const moment = require('moment');

//Password Hash and encrypt sathi
const bcrypt = require ("bcrypt");

//JWT import
const jwt = require("jsonwebtoken");

//Status code import
const statusCode = require("http-status-codes");
const { sendOTPMail, sendRegisterAdminMail } = require("../../../utils/mailer");


//Yat aapn AdminAuthService he require kele tyamule services madhle sagle ikde use karu shakto
const adminServiceAuth = new AdminAuthService(); //yat new he keyword object banvala use hote purn js madhe


//Register Admin
module.exports.registerAdmin = async(req, res)=>{
     try {
      
        const admin = await adminServiceAuth.fetchSingleAdmin({email : req.body.email, isDelete : false, isActive : true}, true);

        if (admin) {
        return res.status(statusCode.BAD_REQUEST).json(successRes(statusCode.BAD_REQUEST, true, MSG.ADMIN_ALREADY_EXISTS));
        }

        const password = req.body.password;

        //Password la bcrypt karte he req.body madhun password gheil and tyatun bcrypt karel
      req.body.password =   await bcrypt.hash(req.body.password, 12)

        req.body.create_at = moment().format('DD/MM/YYYY, h:mm:ss a');
        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss a');
        
        

        // Ya madhe ase aahe ki req milel tyacha body madhun profile_image chya key madhun aapn to data req.file.path madhe save karel aani ithe req mile part file and tyatun path milel image kina veglya file cha
        req.body.profile_image = req.file.path ;

        const newAdmin = await adminServiceAuth.registerAdmin(req.body); //Yachya madhe adminServiceAuth ithun gheil and registerAdmin madhe takel req.body madhe

        
        if (!newAdmin) {
            console.log("Admin Not Added : "); 
            return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.ADMIN_REGISTRATION_FAILED)); 
        } 

        await sendRegisterAdminMail(req.body.email, password);

        return res.status(statusCode.CREATED).json(successRes(statusCode.CREATED, false, MSG.ADMIN_REGISTRATION_SUCCESS, newAdmin)); //ithe aapn newAdmin pass kela tyamule aapn data fetch karu shakto postman madhe and console madhe
     } catch (err) {
        console.log("Error in register : ",err)
     }
}

//Login Admin
module.exports.loginAdmin = async(req, res) => {

   try {
      const admin = await adminServiceAuth.fetchSingleAdmin({email: req.body.email, isDelete : false, isActive : true}, false);

      if (!admin) {
        return res.json(errorRes(statusCode.BAD_REQUEST, true, MSG.ADMIN_NOT_FOUND));
        }

     const isPassword = await bcrypt.compare(req.body.password, admin.password); // ithe compare madhe compare(jithun password yetoy, encrypt password kuthun yetoy te);

     if (!isPassword) {
        return res.json(errorRes(statusCode.BAD_REQUEST, true, MSG.INVALID_CREDENTIALS));
     }


     //JWT logic
     const payload = {
      id : admin.id,
      isAdmin : true //Yache meaning he ki ha admin aahe
     }

     const token = jwt.sign(payload, process.env.SECRET_KEY );


        return res.json(successRes(statusCode.OK, false, MSG.ADMIN_LOGIN_SUCCESS, {token})); //ithe aapn newAdmin pass kela tyamule aapn data fetch karu shakto postman madhe and console madhe
   } catch (err) {
       console.log("Error : ", err)
   }

}

//Forgot Password
module.exports.forgotPassword = async (req, res) => {
  try {
    console.log(req.body);

    const admin = await adminServiceAuth.fetchSingleAdmin({ email: req.body.email, isDelete : false, isActive : true }, false);

    if (!admin) {
             return res.json(errorRes(statusCode.BAD_REQUEST, true, MSG.ADMIN_NOT_FOUND));
    }

    // Kiti vela nantar expire over zali pahije
    if (admin.attempt_Expire < Date.now()) {
      admin.attempt = 0
    }


    //Otp attempt
    if (admin.attempt >= 3) {
      return res.json(errorRes(statusCode.BAD_REQUEST, true, MSG.TOO_MANY_ATTEMPTS));
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);

    console.log("OTP : ", OTP);

    //For OTP and send msg
   await sendOTPMail(req.body.email, OTP);

    
    admin.attempt++ ; //OTP attempt + hot jayla pahije

    const OTP_Expire = new Date(Date.now() + 1000 * 60 * 2); // OTP expire cha logic aahe te last che num minute dakhvtat

    await adminServiceAuth.updateAdmin(admin.id, {OTP, OTP_Expire, attempt: admin.attempt, attempt_Expire : new Date(Date.now() + 1000 * 60 * 2)}) //Yachya madhe kuthun data kuthe yeil te dakhvtay tr ithe (admin chya variable madun id yeil, {aani ithe aapn model and variable che name same thevle tyamule})



    return res.json(successRes(statusCode.OK, false, MSG.OTP_SENT_SUCCESS));

  } catch (err) {
    console.log("Error in forgot : ", err);
  }
};

//Verify OTP
module.exports.verifyOTP = async (req, res) => {
  try {
   console.log(req.body);
   const admin = await adminServiceAuth.fetchSingleAdmin({ email: req.body.email, isDelete : false, isActive : true }, false);

    if (!admin) {
             return res.json(errorRes(statusCode.BAD_REQUEST, true, MSG.ADMIN_NOT_FOUND));
    }

    //Verify otp chi timing set karte
        if (admin.verify_attempt_Expire < Date.now()) {
            admin.verify_attempt = 0;
        }

   // Verify attempt limit
    if (admin.verify_attempt >= 3) {
      return res.json(errorRes(statusCode.BAD_REQUEST, true, MSG.MANY_ATTEMPTS));
    }
    
    //Check expire otp time
    if (Date.now() > admin.OTP_Expire) {
      return res.json(errorRes(statusCode.BAD_REQUEST, true, MSG.OTP_EXPIRED))
      
    }

    //Verify kele ki + zale pahije
    admin.verify_attempt++ ;

    //Verify che attempt update zale pahije aapn vadhvle tr tyamule he use kartat
    await adminServiceAuth.updateAdmin(admin.id, {verify_attempt : admin.verify_attempt, verify_attempt_Expire : new Date(Date.now() + 1000 * 60 * 2) })

    //Check otp
    if(req.body.OTP !== admin.OTP){
      return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.OTP_INVALID))
    }

   //  Verify zalyavar OTP chi value 0 and Expire chi value null zali pahije tyamule ha logic
    await adminServiceAuth.updateAdmin(admin.id, {OTP : 0, OTP_Expire : null , verify_attempt : admin.verify_attempt, verify_attempt_Expire : new Date(Date.now() + 1000 * 60) })



    return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.OTP_VERIFIED_SUCCESS))

  } catch (err) {
    console.log("Error in OTP : ", err);
  }
};


//Forget new password
module.exports.newPassword = async(req, res)=> {

  try {
    
   console.log(req.body);

   const admin = await adminServiceAuth.fetchSingleAdmin({email: req.body.email, isDelete : false, isActive : true}, true);

   req.body.newPassword =   await bcrypt.hash(req.body.newPassword, 12)

 const updatedPassword =   await adminServiceAuth.updateAdmin(admin.id , {password : req.body.newPassword}); //Yachya madhe admin.id yeil ki kontya id chi aahe {and yat password yeil password madhun req.body.newPassword mhanje req.body madhun newPassword milel}

 if (!updatedPassword) {
      return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.PASSWORD_NOT_UPDATED))
 }

    return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.PASSWORD_UPDATED))
  } catch (error) {
    console.log("Error in new password ", error)
  }

}

//fetch all admin
module.exports.fetchAllAdmin = async(req, res)=>{
     try {
      const allAdmin = await adminServiceAuth.fetchAllAdmin({isDelete : false});

      if (req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }

       return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.ADMIN_FETCH_SUCCESS , allAdmin)); 
     } catch (err) {
        console.log("Error in fetchAll : ",err)
     }
}

//Fetch Single Admin
module.exports.fetchSingleAdmin = async(req, res)=>{
     try {
        const { id } = req.params;
        const admin = await adminServiceAuth.fetchSingleAdmin({_id:id, isDelete : false, isActive : true}, true);
         if (!admin) {
        return res.status(statusCode.BAD_REQUEST).json(successRes(statusCode.BAD_REQUEST, true, MSG.ADMIN_NOT_FOUND));
         }

       return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.ADMIN_FETCH_SUCCESS , admin)); 
     } catch (err) {
        console.log("Error in single Admin : ",err)
     }
}

//Delete Admin
module.exports.deleteAdmin = async(req, res) => {
 try {

    if (req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }

   const admin = await adminServiceAuth.fetchSingleAdmin({_id: req.query.id, isDelete : false, isActive : true }, true);

    if (!admin) {
             return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.ADMIN_NOT_FOUND));
    }
  

  /* Aaaplyala delete karayche and tyamule aapn params use karto safety mule tr aapn ithe req.query.id use marto means
  aapn req deto query madhe and tyat aapn id name chi key use karto te aaplyala delete la true false karun dete */
      const deleteAdmin = await adminServiceAuth.updateAdmin(req.query.id , {isDelete : true, isActive: false}); 

      if (req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }
      if (!deleteAdmin) {
        return res.status(statusCode.BAD_REQUEST).json(successRes(statusCode.BAD_REQUEST, true, MSG.ADMIN_DELETED_FAILED));
        
      }

       return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.ADMIN_DELETED_SUCCESS)); 
     } catch (err) {
        console.log("Error in Delete : ",err)
     }
}


//Update Admin
module.exports.updateAdmin = async(req, res) => {
 try {

  if (req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }

   const admin = await adminServiceAuth.fetchSingleAdmin({_id: req.query.id, isDelete : false, isActive : true }, true);

    if (!admin) {
             return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.ADMIN_NOT_FOUND));
    }
  
    req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss A');

 //Ithe pn aapn query la priority deto safety mule
      const updateAdmin = await adminServiceAuth.updateAdmin(req.query.id , req.body); 

      if (!updateAdmin) {
        return res.status(statusCode.BAD_REQUEST).json(successRes(statusCode.BAD_REQUEST, true, MSG.ADMIN_UPDATE_FAILED));
        
      }

       return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.ADMIN_UPDATE_SUCCESS, updateAdmin)); // Yachya madhe last la result nasaate dakhvt pn aaplyala kalal pahije mhanun taklay
     } catch (err) {
        console.log("Error in Update admin : ",err)
     }
}


//Active or inActive
module.exports.activeOrInactiveAdmin = async(req, res) => {
 try {

  if (req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }

   const admin = await adminServiceAuth.fetchSingleAdmin({_id: req.query.id, isDelete : false }, true);

    if (!admin) {
             return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.ADMIN_NOT_FOUND));
    }
  
    console.log("Before:", admin.isActive);


 //Ithe pn aapn query la priority deto safety mule
      const updateAdmin = await adminServiceAuth.updateAdmin(req.query.id , {isActive: !admin.isActive, update_at: moment().format('DD/MM/YYYY, h:mm:ss A')}); //True aahe tr False and False aahe tr true kara sathi admin madhun inActive ghetle ! and he change kara sathi use kartat
console.log("After:", updateAdmin?.isActive);

return res.status(statusCode.OK).json(successRes(statusCode.OK, false, `${admin.name} ${admin.last_name} is ${updateAdmin.isActive ? 'active' : 'inactive'}`)); // Yachya madhe last la result nasaate dakhvt pn aaplyala kalal pahije mhanun taklay

     } catch (err) {
        console.log("Error in Active or Inactive : ",err)
     }
}


//Admin Profile
module.exports.profileAdmin = async(req, res) => {
 try {
  if (req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
      }

      
       return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.ADMIN_PROFILE_FETCH_SUCCESS, req.admin)); //Ithe req.admin yachya mule diley bcoz tyatun data yeil aani aapn he middleware madhe declare keley

     } catch (err) {
        console.log("Error in Profile : ",err)
     }
}


//Change Password
module.exports.change_password = async(req, res)=> {


  try {
     if (req.user) {
        return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
  }

  const admin = await adminServiceAuth.fetchSingleAdmin({_id : req.admin.id, isDelete: false, isActive: true}, false)

  const isPassword = await bcrypt.compare(req.body.currentPassword, admin.password) // He password la match karun baghte jase ki aapn postman madhe deto ki current password and admin madhun aalela password match aahe ka asala tr true nasala tr false


  if (!isPassword) {
      return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.INVALID_PASSWORD))
 }

  req.body.newPassword =   await bcrypt.hash(req.body.newPassword, 12); //New password la hash karte

   const updatedPassword =   await adminServiceAuth.updateAdmin(admin.id , {password : req.body.newPassword}); //Yachya madhe admin.id yeil ki kontya id chi aahe {and yat password yeil password madhun req.body.newPassword mhanje req.body madhun newPassword milel}

 if (!updatedPassword) {
      return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.PASSWORD_NOT_UPDATED))
 }

    return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.PASSWORD_UPDATED))

    
  } catch (error) {
    console.log("Error in changePassword : ", error)
  }

}
