import User from "../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js"

export const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User with this email already exists" })
        }

        // Hash the password before saving (THIS WAS THE BUG - password was saved as plain text)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user"  // Default to "user" if not provided
        })

        // Don't send password back in response
        const userResponse = { _id: user._id, username: user.username, email: user.email, role: user.role };
        res.status(201).json({ success: true, message: "User created successfully", data: userResponse })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" })
        }

        // Include role in JWT token so middleware can check it
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" })

        const userResponse = { _id: user._id, username: user.username, email: user.email, role: user.role };
        res.status(200).json({ success: true, message: "User logged in successfully", data: { user: userResponse, token } })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// Admin only - get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password"); // Exclude passwords
        res.status(200).json({ success: true, message: "Users fetched successfully", data: users })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}