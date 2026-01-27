
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        title: {
            type: String,
            required: true,
            default: "New Task"
        },
        content: {
            type: String,
            required: true,
            default: "Task Description"
        },
        submissionDate: {
            type: Date,
            default: Date.now,
            required: [true, "It's Important to Give a Submission Date"]
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        assignedTo: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }],
        tag: {type: String, required: false},
        priority: { type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },
        status: {
            type: String,
            enum: ["todo", "in-progress", "done"],
            default: "todo"
        },
        // subtask: [{ type: Types.ObjectId, ref: "Subtask" }],
        isComplete: {
            type: Boolean,
            default: false
        },
        workQuality: {
            type: Number,
            min: 0,
            max: 10,
            default: null
        },
    },
    { timestamps: true }
);

export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
