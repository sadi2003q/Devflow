import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/lib/dbConfig";
import { Task } from "@/schema/task.Schema";
import { getAuthPayloadFromRequest } from "@/lib/auth";

await connect();

const ALLOWED_PRIORITIES = ["low", "medium", "high"] as const;
const ALLOWED_STATUSES = ["todo", "in-progress", "done"] as const;

const toTaskResponse = (task: {
    _id: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    title: string;
    content: string;
    createdAt: Date;
    submissionDate: Date;
    createdBy: mongoose.Types.ObjectId;
    assignedTo: mongoose.Types.ObjectId[];
    tag?: string;
    priority: "low" | "medium" | "high";
    status: "todo" | "in-progress" | "done";
    isComplete: boolean;
    workQuality: number | null;
}) => ({
    projectId: task.projectId.toString(),
    taskId: task._id.toString(),
    title: task.title,
    content: task.content,
    createdAt: task.createdAt,
    submissionDate: task.submissionDate,
    createdBy: task.createdBy.toString(),
    assignedTo: (task.assignedTo ?? []).map((member) => member.toString()),
    tag: task.tag ?? "",
    priority: task.priority,
    status: task.status,
    isComplete: task.isComplete,
    workQuality: task.workQuality,
});

const getUserScopedTaskFilter = (userId: string) => ({
    $or: [{ createdBy: userId }, { assignedTo: userId }],
});

export async function GET(request: NextRequest) {
    try {
        const auth = getAuthPayloadFromRequest(request);
        const taskId = request.nextUrl.searchParams.get("id");
        const projectId = request.nextUrl.searchParams.get("projectId");
        const onlyUpcoming = request.nextUrl.searchParams.get("upcoming") === "true";
        const userFilter = getUserScopedTaskFilter(auth.id);

        if (taskId) {
            if (!mongoose.isValidObjectId(taskId)) {
                return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
            }

            const task = await Task.findOne({
                _id: taskId,
                ...userFilter,
            }).lean();

            if (!task) {
                return NextResponse.json({ error: "Task not found" }, { status: 404 });
            }

            return NextResponse.json({ task: toTaskResponse(task) }, { status: 200 });
        }

        const filter: Record<string, unknown> = { ...userFilter };
        if (projectId) {
            if (!mongoose.isValidObjectId(projectId)) {
                return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
            }
            filter.projectId = projectId;
        }

        const query = Task.find(filter).sort({
            [onlyUpcoming ? "submissionDate" : "createdAt"]: onlyUpcoming ? 1 : -1,
        });
        if (onlyUpcoming) {
            query.limit(20);
        }

        const tasks = await query.lean();

        return NextResponse.json(
            { tasks: tasks.map((task) => toTaskResponse(task)) },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const auth = getAuthPayloadFromRequest(request);
        const body = await request.json();
        const {
            projectId,
            title,
            content,
            submissionDate,
            assignedTo,
            tag,
            priority = "medium",
            status = "todo",
            isComplete = false,
            workQuality = null,
        } = body;

        if (!projectId || !title || !content) {
            return NextResponse.json(
                { error: "projectId, title and content are required" },
                { status: 400 }
            );
        }

        if (!mongoose.isValidObjectId(projectId)) {
            return NextResponse.json({ error: "Invalid projectId" }, { status: 400 });
        }

        if (!ALLOWED_PRIORITIES.includes(priority)) {
            return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
        }

        if (!ALLOWED_STATUSES.includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const normalizedAssignedTo = Array.isArray(assignedTo)
            ? assignedTo.filter((member: unknown) => typeof member === "string")
            : [];

        const task = await Task.create({
            projectId,
            title,
            content,
            submissionDate: submissionDate ? new Date(submissionDate) : new Date(),
            createdBy: auth.id,
            assignedTo: normalizedAssignedTo,
            tag,
            priority,
            status,
            isComplete,
            workQuality,
        });

        return NextResponse.json(
            { message: "Task created successfully", task: toTaskResponse(task.toObject()) },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const auth = getAuthPayloadFromRequest(request);
        const taskId = request.nextUrl.searchParams.get("id");
        if (!taskId || !mongoose.isValidObjectId(taskId)) {
            return NextResponse.json({ error: "Valid task id is required" }, { status: 400 });
        }

        const body = await request.json();
        const updateData: Record<string, unknown> = {};

        if (typeof body.title === "string") updateData.title = body.title;
        if (typeof body.content === "string") updateData.content = body.content;
        if (typeof body.tag === "string") updateData.tag = body.tag;
        if (body.submissionDate) updateData.submissionDate = new Date(body.submissionDate);
        if (typeof body.isComplete === "boolean") updateData.isComplete = body.isComplete;
        if (typeof body.workQuality === "number" || body.workQuality === null) {
            updateData.workQuality = body.workQuality;
        }
        if (typeof body.priority === "string" && ALLOWED_PRIORITIES.includes(body.priority)) {
            updateData.priority = body.priority;
        }
        if (typeof body.status === "string" && ALLOWED_STATUSES.includes(body.status)) {
            updateData.status = body.status;
        }
        if (Array.isArray(body.assignedTo)) {
            updateData.assignedTo = body.assignedTo.filter(
                (member: unknown) => typeof member === "string"
            );
        }

        const task = await Task.findOneAndUpdate(
            { _id: taskId, ...getUserScopedTaskFilter(auth.id) },
            { $set: updateData },
            { new: true }
        ).lean();

        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Task updated successfully", task: toTaskResponse(task) },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const auth = getAuthPayloadFromRequest(request);
        const taskId = request.nextUrl.searchParams.get("id");
        if (!taskId || !mongoose.isValidObjectId(taskId)) {
            return NextResponse.json({ error: "Valid task id is required" }, { status: 400 });
        }

        const task = await Task.findOneAndDelete({
            _id: taskId,
            ...getUserScopedTaskFilter(auth.id),
        });

        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
    } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
