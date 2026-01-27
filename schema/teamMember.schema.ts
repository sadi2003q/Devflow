import mongoose from "mongoose"

const TeamMemberSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        joinedAt: { type: Date, default: Date.now },
        role: { type: String, default: "Junior Developer" },
    },
    { timestamps: true }
);

export const TeamMember =
    mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);
