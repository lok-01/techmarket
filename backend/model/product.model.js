import mongoose from "mongoose";



//   id: 1,
//     name: "MacBook Pro 16-inch M3",
//     brand: "Apple",
//     price: 2499,
//     image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
//     bestSeller: true,
//     discount: 35,
//     rating: 4.8,
//     reviews: 1245

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    bestSeller: {
        type: Boolean,
        required: true
    },
    discount: {
        type: Number,
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: {
        type: Number,
    }

})

const Product = mongoose.model("Product", productSchema);
export default Product;