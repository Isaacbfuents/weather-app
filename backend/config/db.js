import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, { dbName: "weatherApp"});
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  export default connectDB;