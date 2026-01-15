import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.mongo.js";
import cookieParser from "cookie-parser";
import organization_routes from "./routes/organization.route.js";
import user_routes from "./routes/user.route.js";
import attendance_routes from "./routes/attendance.route.js";
dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cookieParser());

// api calls
app.use("/api/v1/org", organization_routes);
app.use("/api/v1/auth", user_routes);


// Database connection and PORT defined
connectDB();
const PORT = process.env.PORT || 8000;

// listen to server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
});