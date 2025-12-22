import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) return;
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB Connected`);

    isConnected = true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;