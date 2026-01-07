import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully!")
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
};

export default connectDB;