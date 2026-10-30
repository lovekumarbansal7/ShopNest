const express = require('express')
const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/product.controller')
const {protect} = require('../middlewares/auth.middleware')
const {admin} = require("../middlewares/admin.middleware")

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct)
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct)


module.exports = router;
