const { statusCode } = require("http-status-codes")
const category = require("../../model/category.model")
const { errorRes } = require("../../utils/response")

const moment = require("moment");

module.exports = class CategoryService {
    async addCategory (body) {
        try {
        return await category.create(body)
        } catch (error) {
            console.log("Error in service addCategory : ", error)
        }
    }

       //Fetch single category
        async fetchSingleCategory(body){
            try {
                /*Jar aapn ekhadya madhe body pass kart asel jase varti keley (body) ase tr tyat aapn object and filter pass nahi karu shakt khali 
                aapn jase diley tase karu shakto and aapn controller madhe pn pass karu shakto jase aapn kele*/
                // body.isActive = true;
                // body.isDelete = false;
                return await category.findOne(body);
                
            } catch (error) {
                console.log("User Not Fetched....!");
                
            }
        }

    //Fetch all category
        async fetchAllCategory(){
            try {
                return await category.find({isDelete : false, isActive: true})
            } catch (error) {
                console.log("Category Not Fetched....!");
            }
        }

        //Update Category
        async updateCategory(id, body){
            try {
                return await category.findByIdAndUpdate(id, body, {new: true, isDelete : false, isActive: true})
            } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorRes(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
                
            }
        }

}
