import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "./config/config.js";
import Product from "./model/product.model.js";
import products from "../src/data.js";

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
        console.log("Successfully seeded all products from src/data.js into the database!");

        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
