import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

// Middleware to verify JWT token (any logged-in user)
export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." })
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded; // { id, role }
        next();

    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" })
    }
}

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Access denied. Admin only." })
    }
    next();
}
