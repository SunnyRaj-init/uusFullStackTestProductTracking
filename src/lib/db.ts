// src/app/lib/db.tsx
// this file creates a promise to connect to the mongodb database

import mongoose from "mongoose";
// get the uri from env
const MONGO_URI = process.env.MONGODB_URI;
// create a cached object that would be used at that particular component which calls the connect method
const cached: {
  connection?: typeof mongoose;
  promise?: Promise<typeof mongoose>;
} = {};
async function dbConnect() {
  //env has no uri
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local"
    );
  }
  //if the page already called the connect then use the previous cached connection
  if (cached.connection) {
    return cached.connection;
  }
  // else create a new cached connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }
  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  //return the cached connection context to enable mongoose operations at the parent component
  return cached.connection;
}
export default dbConnect;
