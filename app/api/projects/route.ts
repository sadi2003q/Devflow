import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/lib/dbConfig";
import { Project } from "@/schema/project.schema";
import { getAuthPayloadFromRequest } from "@/lib/auth";

await connect();

const toProjectResponse = (project: {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    githubRepo?: string;
    ownerId: mongoose.Types.ObjectId;
    managerId?: mongoose.Types.ObjectId;
    teamMembers?: mongoose.Types.ObjectId[];
    completionDate?: Date;
}) => ({
    id: project._id.toString(),
    name: project.name,
    description: project.description,
    createdBy: project.createdBy.toString(),
    createdAt: project.createdAt,
    githubRepo: project.githubRepo,
    ownerId: project.ownerId.toString(),
    managerId: project.managerId ? project.managerId.toString() : "",
    teamMembers: (project.teamMembers ?? []).map((member) => member.toString()),
    completionDate: project.completionDate ?? project.createdAt,
});

const getUserScopedProjectFilter = (userId: string) => ({
    $or: [
        { createdBy: userId },
        { ownerId: userId },
        { managerId: userId },
        { teamMembers: userId },
    ],
});

export async function GET(request: NextRequest) {
    try {
        const auth = getAuthPayloadFromRequest(request);
        const projectId = request.nextUrl.searchParams.get("id");
        const userFilter = getUserScopedProjectFilter(auth.id);

        if (projectId) {
            if (!mongoose.isValidObjectId(projectId)) {
                return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
            }

            const project = await Project.findOne({
                _id: projectId,
                ...userFilter,
            }).lean();

            if (!project) {
                return NextResponse.json({ error: "Project not found" }, { status: 404 });
            }

            return NextResponse.json({ project: toProjectResponse(project) }, { status: 200 });
        }

        const projects = await Project.find(userFilter)
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(
            { projects: projects.map((project) => toProjectResponse(project)) },
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
        const { name, description, githubRepo, managerId, teamMembers, completionDate } = body;

        if (!name || !description || !githubRepo) {
            return NextResponse.json(
                { error: "Name, description and githubRepo are required" },
                { status: 400 }
            );
        }

        const normalizedTeamMembers = Array.isArray(teamMembers)
            ? teamMembers.filter((member: unknown) => typeof member === "string")
            : [];

        const project = await Project.create({
            name,
            description,
            createdBy: auth.id,
            githubRepo,
            ownerId: auth.id,
            managerId: managerId && mongoose.isValidObjectId(managerId) ? managerId : undefined,
            teamMembers: normalizedTeamMembers,
            completionDate: completionDate ? new Date(completionDate) : undefined,
        });

        return NextResponse.json(
            { message: "Project created successfully", project: toProjectResponse(project.toObject()) },
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
        const projectId = request.nextUrl.searchParams.get("id");
        if (!projectId || !mongoose.isValidObjectId(projectId)) {
            return NextResponse.json({ error: "Valid project id is required" }, { status: 400 });
        }

        const body = await request.json();
        const updateData: Record<string, unknown> = {};

        if (typeof body.name === "string") updateData.name = body.name;
        if (typeof body.description === "string") updateData.description = body.description;
        if (typeof body.githubRepo === "string") updateData.githubRepo = body.githubRepo;
        if (typeof body.managerId === "string" && mongoose.isValidObjectId(body.managerId)) {
            updateData.managerId = body.managerId;
        }
        if (Array.isArray(body.teamMembers)) {
            updateData.teamMembers = body.teamMembers.filter(
                (member: unknown) => typeof member === "string"
            );
        }
        if (body.completionDate) {
            updateData.completionDate = new Date(body.completionDate);
        }

        const project = await Project.findOneAndUpdate(
            { _id: projectId, ...getUserScopedProjectFilter(auth.id) },
            { $set: updateData },
            { new: true }
        ).lean();

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Project updated successfully", project: toProjectResponse(project) },
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
        const projectId = request.nextUrl.searchParams.get("id");
        if (!projectId || !mongoose.isValidObjectId(projectId)) {
            return NextResponse.json({ error: "Valid project id is required" }, { status: 400 });
        }

        const project = await Project.findOneAndDelete({
            _id: projectId,
            ...getUserScopedProjectFilter(auth.id),
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
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
