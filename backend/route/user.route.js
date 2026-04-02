import express from "express";
import { signup, login, getAllUsers } from "../controller/user.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Admin only - view all users
router.get("/users", verifyToken, isAdmin, getAllUsers);

export default router;