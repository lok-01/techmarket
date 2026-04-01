import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`connected to mongodb ON `);
    }
    catch (error) {
        console.log(error);
    }
}

export default connectDb;