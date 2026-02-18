import mongoose from "mongoose";

let isConnected = false;

export const connect = async () => {
    if (isConnected) {
        return;
    }

    const uri = process.env.MONGODB_URI ?? process.env.MONGO_URI;
    if (!uri) {
        throw new Error("Missing MongoDB URI. Set MONGODB_URI (or MONGO_URI) in environment.");
    }

    await mongoose.connect(uri);
    isConnected = true;
};
