import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";
async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`\n mongoDB connected !! DB HOST: ${connectionInstance}`);
  } catch (err) {
    console.log(`MONGODB connection error ${err}`);
    process.exit(1);
  }
}
export { connectDB };
