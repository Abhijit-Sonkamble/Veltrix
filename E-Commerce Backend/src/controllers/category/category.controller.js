//Status code import Messages import kele
const statusCode = require("http-status-codes");
const { errorRes, successRes } = require("../../utils/response");
const { MSG } = require("../../utils/msg");
const moment = require('moment');

//Import Service
const CategoryService = require("../../services/category/category.service")
const categoryService = new CategoryService()

//Add Category
module.exports.addCategory = async(req, res) => {
    try {

          if (req.user) {
                return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
              }

         req.body.create_at = moment().format('DD/MM/YYYY, h:mm:ss a');
        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss a');

        //Category store
         req.body.category_image = req.file.path ;

        const category = await categoryService.addCategory(req.body)

         if (!category) {
                    console.log("Category Not Added : "); 
                    return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.CATEGORY_CREATED_FAILED)); 
                } 
        
                return res.status(statusCode.CREATED).json(successRes(statusCode.CREATED, false, MSG.CATEGORY_CREATED, category));

    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorRes(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}

//Category Fetch
module.exports.fetchCategory = async(req, res)=> {
    try {
        const allCategory = await categoryService.fetchAllCategory();

       return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.CATEGORY_FETCH_SUCCESS , allCategory)); 
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorRes(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}

//Fetch Single Category
module.exports.fetchSingleCategory = async(req, res)=>{
    try {
        console.log("ID : " , req.params.id)
        console.log("Params : " , req.params)
            const { id } = req.params;
            const category = await categoryService.fetchSingleCategory({_id : id, isDelete : false, isActive: true});

            console.log("Category : ", category);
            

             if (!category) {
            return res.status(statusCode.BAD_REQUEST).json(successRes(statusCode.BAD_REQUEST, true, MSG.CATEGORY_NOT_FOUND));
             }
    
           return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.CATEGORY_FETCH_SUCCESS , category)); 
         } catch (err) {
            console.log("Error in single Category : ",err)
         }
}

//Update Category
module.exports.updateCategory = async (req, res) => {
    try {


        if (req.user) {
           return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
        }
        

            req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss A');
            

            const updatedCategory = await categoryService.updateCategory(req.query.id , req.body);

        if (!updatedCategory) {
           return res.status(statusCode.BAD_REQUEST).json(successRes(statusCode.BAD_REQUEST, true, MSG.CATEGORY_UPDATE_FAILED));
        }

       return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.CATEGORY_UPDATED, updatedCategory)); 

        
    } catch (error) {
        console.log("Error in updated category", error);
        
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorRes(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}

// Category Delete
module.exports.deleteCategory = async(req, res) => {
    try {
        
         if (req.user) {
                return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
              }

              const deletedCategory = categoryService.updateCategory(req.query.id , {isDelete : true, isActive: false}) // {Aapn yamdhe pass keley ki isdelete true hoyla pahije and isActive false update houn}

              if (!deletedCategory) {
                      return res.status(statusCode.BAD_REQUEST).json(successRes(statusCode.BAD_REQUEST, true, MSG.USER_DELETE_FAILED));
                      
                    }
              
                     return res.status(statusCode.OK).json(successRes(statusCode.OK, false, MSG.CATEGORY_DELETED)); 

    } catch (error) {
        console.log("Error in Delete : ", error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorRes(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}

//Active or Inactive Category
module.exports.activeOrInactive = async(req, res) => {
        try {
        
         if (req.user) {
                return res.status(statusCode.UNAUTHORIZED).json(successRes(statusCode.UNAUTHORIZED, true, MSG.UNAUTHORIZED));
              }
              
              const category = await categoryService.fetchSingleCategory({_id: req.query.id, isDelete : false });

                  if (!category) {
                           return res.status(statusCode.BAD_REQUEST).json(errorRes(statusCode.BAD_REQUEST, true, MSG.USER_NOT_FOUND));
                  }

              const activeOrInactive =await categoryService.updateCategory(req.query.id, {isActive: !category.isActive, update_at: moment().format('DD/MM/YYYY, h:mm:ss A')})

    
              
     return res.status(statusCode.OK).json(successRes(statusCode.OK, false, `${activeOrInactive.isActive ? 'active' : 'inactive'}`)); // Yachya madhe last la result nasaate dakhvt pn aaplyala kalal pahije mhanun taklay
 

    } catch (error) {
        console.log("Error in Active or Delete : ", error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorRes(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));
    }
}