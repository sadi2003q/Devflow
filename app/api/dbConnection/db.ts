import dotenv from "dotenv";
import mongoose, { Schema, model, Document, Model } from 'mongoose';dotenv.config({ path: "D:\\Code\\Devflow\\.env" });

const uri: string | undefined = process.env.MONGODB_URI;

interface IUser extends Document {
    name: string;
    email: string;
    age: number;
}

// Define the Schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true }
});

// Avoid "OverwriteModelError" in Next.js hot-reloading
const User = (mongoose.models.User as Model<IUser>) || model<IUser>('User', userSchema);

async function main() {
    if (!uri) {
        console.error("❌ Error: MONGODB_URI is not defined in .env file");
        console.log("Current Directory:", __dirname);
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log("✅ Successfully connected to MongoDB Atlas!");

        const newUser = new User({
            name: "sadi ",
            email: "sadi@example.com",
            age: 28
        });

        const savedUser = await newUser.save();
        console.log("📦 Data stored successfully:", savedUser);

    } catch (err) {
        console.error("❌ Connection error:", err);
    } finally {
        await mongoose.connection.close();
        console.log("🔌 Connection closed.");
    }
}

main();
