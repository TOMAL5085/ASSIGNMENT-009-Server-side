import mongoose from "mongoose";
import { createAuth } from "./auth.js";

let connectionPromise;
let authInstance;

export async function connectToDatabase() {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI).then(() => mongoose.connection);
  }

  return connectionPromise;
}

export async function getAuth() {
  const connection = await connectToDatabase();

  if (!authInstance) {
    authInstance = createAuth(connection.db);
  }

  return authInstance;
}
