
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        name: {
                type: String,
                required: true
        },
        email: {
                type: String,
                required: true,
                unique: true
        },
        password: {
                type: String,
                required: [true, "Password is required"]
        },
        imageUrl: {
                type: String,
                required: false
        },
        joinedAt: {
                type: Date,
                default: Date.now
        },
        projects: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project",
                required: false
        }],
        role: {
                type: String,
                default: "user"
        },
        isOwner: {
                type: Boolean,
                default: false
        },
        isManager: {
                type: Boolean,
                default: false
        },
        githubRepo: {
                type: String,
                required: false
        },
    },
    { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
