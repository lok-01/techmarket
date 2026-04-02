import express from "express";
import { createProduct, getAllProducts, updateProduct, deleteProduct } from "../controller/product.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public - anyone can view products
router.get("/", getAllProducts);

// Admin only - create, update, delete products
router.post("/", verifyToken, isAdmin, createProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;