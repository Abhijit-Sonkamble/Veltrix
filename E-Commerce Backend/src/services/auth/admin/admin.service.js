const Admin = require("../../../model/admin.model");

module.exports = class AdminAuthService {
    //Class chya aat function key word nahi yet tyamule registerAdmin mage nahi dile
    async registerAdmin(body) {

        try {
            return await Admin.create(body); // .create hi asynchromous method aahe tyamle ithe async/await dile
        } catch (error) {
            console.log("Admin Service error : ", error)
        }

    }

    //Fetch admin karala
    async fetchSingleAdmin(body, isSelect){
        try {
            //Yache meaning ase aahe ki aaplyala jithe purn data nasel hava tithe aapn true karun deu isSelect jr hava asel tr false
            if (isSelect) {
                return await Admin.findOne(body).select('_id name last_name email isActive create_at update_at')
            } else {
                return await Admin.findOne(body)
            }
            
        } catch (error) {
            console.log("Admin Not Fetched....!");
        }
    }

    //Fetch All Admin
    async fetchAllAdmin(){
        try {
            return await Admin.find().select('_id name last_name email isActive create_at update_at') //Select madhe kay kay disala pahije he dakhvtat
        } catch (error) {
            console.log("Admin Not Fetched....!");
        }
    }

    //OTP // update sathi pn use hoil true false karala
    async updateAdmin(id, body){
        try {
            return await Admin.findByIdAndUpdate(id, body, {new : true}).select('_id name last_name email isActive create_at update_at'); //{new true mhanje ki updated data yeil and te return karto}
        } catch (error) {
            console.log("Admin Not Fetched....!");
        }
    }


}