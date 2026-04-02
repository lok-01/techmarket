import Product from "../model/product.model.js"

// Admin only - create a product
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

// Anyone (logged in or not) - get all products
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

// Admin only - update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// Admin only - delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};