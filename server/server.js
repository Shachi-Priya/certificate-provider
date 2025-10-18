import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"));

try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
} catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
}


app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


////////////


// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// dotenv.config();

// const app = express();

// // Basic middleware
// app.use(cors());
// app.use(express.json());

// // 🟩 MongoDB Connection (with Render-safe config)
// const mongoURI = process.env.MONGO_URI;

// if (!mongoURI) {
//   console.error("MONGO_URI is not defined in environment variables.");
//   process.exit(1);
// }

// mongoose
//   .connect(mongoURI, {
//     serverSelectionTimeoutMS: 10000, // avoid hanging forever
//     socketTimeoutMS: 45000,
//   })
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => {
//     console.error("MongoDB connection failed:");
//     console.error(err.message);
//     // Log full error for Render debugging
//     console.error(err);
//     process.exit(1); // exit so Render marks deployment as failed cleanly
//   });

// // Routes
// app.use("/api/user", userRoutes);
// app.use("/api/admin", adminRoutes);

// // Health check (Render uses this to verify container readiness)
// app.get("/", (req, res) => {
//   res.status(200).send("Server is up");
// });

// // Dynamic port (Render sets PORT automatically)
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
