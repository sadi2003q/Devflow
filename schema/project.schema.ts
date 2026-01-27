import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
    {
        name: {
                type: String,
                required: [true, "Project name is required"]
        },
        description: {
                type: String,
                required: [true, "Project Description is Required"],
                maxlength: 350
        },
        createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
        },
        githubRepo: {
                type: String,
                required: [true, "Github Repo is required"]
        },
        ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
        },
        managerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: false
        },
        teamMembers: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: false
        }],
        completionDate: Date,
    },
    {timestamps: true}
);

export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
