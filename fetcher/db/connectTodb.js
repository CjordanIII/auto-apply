// db.js

import mongoose from "mongoose";

// MongoDB connection string (replace with your MongoDB container name)
const mongoURI = "mongodb://root:password@localhost:27017/?authSource=admin";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if connection fails
  }
};

// Export the connectDB function
export default connectDB;
