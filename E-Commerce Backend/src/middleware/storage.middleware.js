const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const multer = require("multer")


cloudinary.config({
    //cloud_name, api_key, api_secret he fix aahe key yana aapn change nahi karu shakt
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_SECRET_KEY,
    secure:true
});

//Ithe aapn storage la heun yeil and new he key word class banva sathi use hote
const storage = new CloudinaryStorage({
    cloudinary, // Aapn he cloudinary varti variable banvle and te config madhe save karayche tyamule diley
    params:{
        folder: "Ecommerce-Backend",
        allowedFormats : ['jpg', 'png', 'pdf', 'webp'] // Ya madhe dyayche ki aapn kon konte format allow karayche website madhe upload karala
    }
})

const upload = multer({storage}); // Upload variable madhe aapn varche storage variable save kele and object aahe tr {yamdhe thevle} and ha aapn jar variable che name dusre thevle tr storage : variable name ase thevayche


module.exports ={ upload } //Yala dusri kade pn use karala aapn exports kele {ya madhe yache mule ki te object aahe}