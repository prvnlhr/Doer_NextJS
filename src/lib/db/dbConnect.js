import mongoose from "mongoose";

const DB_URI =
  "mongodb+srv://doer-nextjs:hS0SUxw3iqs22Jak@cluster0.gl6irw1.mongodb.net/doerNextDB?retryWrites=true&w=majority&appName=Cluster0";
// const { MONGODB_URI } = process.env;

if (!DB_URI) {
  throw new Error(
    "Please define the DB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(DB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
