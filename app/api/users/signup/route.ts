import { NextRequest, NextResponse } from 'next/server'
import { connect } from "@/lib/dbConfig";
import { User } from '@/schema/user.schema'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

await connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            name, email, password,
            imageUrl, projects, role,
            isOwner, isManager, githubRepo
        } = body;

        if (!password) {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
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
            imageUrl,
            projects,
            role,
            isOwner,
            isManager,
            githubRepo
        });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" }
        );

        const response = NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
    }
}
