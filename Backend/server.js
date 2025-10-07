import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use((req, res) => res.status(404).json({ message: "Not Found" }));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
