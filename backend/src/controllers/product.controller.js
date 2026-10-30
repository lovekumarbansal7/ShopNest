const productModel = require("../model/product.model")
const cloudinary = require('../config/cloudinary')

// accessed by both authorized aur unauthorized user
const getProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        res.json(products)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "server error"
        })
    }
}

// accessed by both authorized and unauthorized user
const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        if (product) {
            res.json(product)
        }
        else {
            console.log("product not found")
            res.status(404).json({
                message: 'product not found!'
            })
        }
    }
    catch (err) {
        req.res(500).json({
            message: 'server error'
        })
    }
}

// Accessed by only admin with authorization 
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body
        let imgUrl = ''
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            imgUrl = result.secure_url
        }
        const product = await productModel.create({
            name,
            description,
            price,
            category,
            stock,
            imageUrl: imgUrl
        })
        res.status(201).json(product);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Accessed by only admin with authorization 
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body
        const product = await productModel.findById(req.params.id)
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;

            if (req.file) {
                const result = cloudinary.uploaded.upload(req.file.path)
                product.imageUrl = result.secure_url
            }
            const updatedProduct = await product.save()
            res.json(updatedProduct)
        }
        else {
            console.log("product not found")
            res.status(404).json({
                message: 'product not found!'
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// Accessed by only admin with authorization
const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {getProducts, getProductById, createProduct, updateProduct, deleteProduct}