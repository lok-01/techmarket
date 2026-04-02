import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "./config/config.js";
import Product from "./model/product.model.js";
import products from "./data.js";
import User from "./model/user.model.js";
import bcrypt from "bcrypt";

dotenv.config();

const seedDB = async () => {
    try {
        await connectDb();
        console.log("Connected to MongoDB for seeding...");

        // Remove old products to avoid duplicates
        await Product.deleteMany({});
        console.log("Cleared old products from DB.");

        // Insert new products from your data.js file
        await Product.insertMany(products);
        console.log("Successfully seeded all products!");

        // Create admin user
        await createAdmin();

        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

// ❌ WRONG:  async (req, res) => { ... res.status(201).json(...) }
//    This is a SCRIPT, not an Express route! There is no req/res here.
//
// ✅ RIGHT:  async () => { ... console.log(...) }
//    Just use console.log — we're running this from the terminal.

const createAdmin = async () => {
    try {
        // Delete existing admin to avoid duplicate key error
        await User.deleteOne({ email: "admin@gmail.com" });

        const pass = "admin123";
        const HashedPassword = await bcrypt.hash(pass, 10);

        const admin = await User.create({
            username: "admin",
            email: "admin@gmail.com",
            password: HashedPassword,
            role: "admin",
        });

        console.log("Admin created successfully!");
        console.log("  Email:    admin@gmail.com");
        console.log("  Password: admin123");
        console.log("  Role:     admin");

        // No token needed here — token is generated when you LOGIN, not when you create a user
        // The seed script just puts data in the database. You log in from the frontend.

    } catch (error) {
        console.error("Error creating admin:", error);
    }
};

seedDB();