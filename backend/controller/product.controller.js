import express from "express"
import Product from "../model/product.model.js"


const router = express.Router();

const createProduct = async (req, res) => {
    try {
        const product = req.body;

        if (!product.name || !product.brand || !product.price || !product.image) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const newProduct = await Product.create(product)
        res.status(201).json({ success: true, message: "Product created successfully", data: newProduct })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" })
        }
        res.status(200).json({ success: true, message: "Products fetched successfully", data: products })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export {
    createProduct,
    getAllProducts
};