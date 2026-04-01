import express from "express"
import connectDb from "./config/config.js"
import cors from "cors";
import { PORT } from "./config/config.js"
import productRoute from "./route/product.route.js"

const app = express();

app.use(express.json());
app.use(cors());

connectDb();

app.use("/api/products", productRoute);

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
});


