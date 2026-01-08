import mongoose from "mongoose"
export const connectDB = async () => {
  try {
    const dbURL = process.env.MONGO_URL
    if (!dbURL) {
      throw new Error("no connection string")
    }

    await mongoose.connect(dbURL)
    console.log("db connected");
    
  } catch (error) {
    console.log("db connection failed");
    throw error
  }
}

