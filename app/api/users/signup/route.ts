import { NextRequest, NextResponse } from 'next/server'
import { connect } from "@/lib/dbConfig";
import { User } from '@/schema/user.schema'
import bcryptjs from "bcryptjs";
import { authCookieOptions, signAuthToken } from "@/lib/auth";

await connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            name, email, password,
            imageUrl, projects, role,
            isOwner, isManager, githubRepo
        } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email is already registered" },
                { status: 400 }
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            imageUrl: imageUrl ?? "",
            projects,
            role,
            isOwner,
            isManager,
            githubRepo
        });

        const token = signAuthToken(
            { id: user._id, email: user.email },
        );

        const response = NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );

        response.cookies.set("token", token, authCookieOptions);

        return response;

    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
