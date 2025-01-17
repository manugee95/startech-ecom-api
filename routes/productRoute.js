const express = require("express")
const productController = require("../controllers/productController")
const {auth, admin} = require("../middleware/auth")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

const router = express.Router()

router.post("/api/product", auth, admin, upload.single("img"), productController.createProduct)
router.get("/api/product", productController.getAllProducts)

module.exports = router