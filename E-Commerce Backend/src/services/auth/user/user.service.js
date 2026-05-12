const User = require("../../../model/user.model");

const statusCode = require("http-status-codes");
const { errorRes } = require("../../../utils/response");

module.exports = class UserAuthService {
    //Class chya aat function key word nahi yet tyamule registerAdmin mage nahi dile
    async registerUser(body) {

        try {
            return await User.create(body); // .create hi asynchromous method aahe tyamle ithe async/await dile
        } catch (error) {
            console.log("User Service error : ", error)
        }

    }

    //Fetch admin karala
    async fetchSingleUser(body, isSelect){
        try {
            //Yache meaning ase aahe ki aaplyala jithe purn data nasel hava tithe aapn true karun deu isSelect jr hava asel tr false
            if (isSelect) {
                 return await User.findOne(body, {isDelete : false, isActive: true}).select('_id name last_name email phone gender address isActive create_at update_at')
            } else {
                 return await User.findOne(body)
            }
        } catch (error) {
            console.log("User Not Fetched....!");
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorRes(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
            
        }
    }


    //Fetch All Admin
    async fetchAllUser(){
        try {
            return await User.find({isDelete : false, isActive: true}).select('_id name last_name email phone gender address isActive create_at update_at')
    
        } catch (error) {
            console.log("User Not Fetched....!");
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorRes(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
            
        }
    }

    //OTP
    async updateUser(id, body){
        try {
            return await User.findByIdAndUpdate(id, body, {new : true}).select('_id name last_name email phone gender address isActive create_at update_at'); //{new true mhanje ki updated data yeil and te return karto}
        } catch (error) {
            
            console.log("User Not Fetched....!");
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorRes(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
            
        }
    }


}