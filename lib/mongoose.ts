import mongoose from "mongoose";

let isConnected = false;

export default async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MONGODB_URL is not set");
  }

  if (isConnected) {
    console.log("Using existing connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
  }
   catch (error) {
    console.log("Error connecting to database: ", error);
    throw new Error("Error connecting to database");
  }
}
