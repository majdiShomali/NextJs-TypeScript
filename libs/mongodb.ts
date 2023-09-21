import mongoose from "mongoose";

const connectMongoDB = async () => {
  const MongoUrl: string | undefined = process.env.NEXT_PUBLIC_MONGODB_URI;
  if (!MongoUrl) {
    console.error("MONGODB_URI is not defined in environment variables.");
    return;
  }
  try {
    await mongoose.connect(MongoUrl);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;
