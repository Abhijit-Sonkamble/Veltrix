const jwt =  require("jsonwebtoken");
const statusCode = require("http-status-codes");
const { errorRes } = require("../utils/response");
const { MSG } = require("../utils/msg");
const AdminAuthService = require("../services/auth/admin/admin.service");//Admin Active aahe ki nahi ki deleted aahe he baghnya sathi aapn ithe AuthService gheun yeto
const adminServiceAuth = new AdminAuthService(); // Aani aapn ithe tyache object banvle

const UserAuthService = require("../services/auth/user/user.service");
const userServiceAuth = new UserAuthService();

module.exports = async (req, res, next) => {

    let token = req.headers.authorization;  //ya variable madhe ase aahe ki aapn he req send keli tr ti postman cha headers madhe jaun authorization madhun send kelele token ithe store hoil
   

   if (!token) {
    return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.TOKEN_INVALID));
   }

   token = token.slice(7, token.length)

   try {
    const decoded =  jwt.verify(token, process.env.SECRET_KEY);


    console.log(decoded)

//Yamdhe aapn check karu ki admin aahe ki user
    let data;

    if (decoded.isAdmin) {

    data =  await adminServiceAuth.fetchSingleAdmin({_id: decoded.id, isDelete : false, isActive : true}, true) // Yamadhe isDelete and isActive yamule takle ki tashi condition asali tevha ch token pass hoyla pahije
    req.admin = data; //Purn admin cha data ha store zala data yat

    } else {

    data =  await userServiceAuth.fetchSingleUser({_id: decoded.id, isDelete : false, isActive : true}, true)
    req.user = data; //Purn user cha data ha store zala data yat

    }


   if (data) {
            next();

        } else {
            return res.status(status.BAD_REQUEST).json(errorResponse(status.BAD_REQUEST, true, MSG.TOKEN_INVALID));
        }

   } catch (error) {
    console.log("error in middleware : ", error)
    return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.UNAUTHORIZED));
   }

}