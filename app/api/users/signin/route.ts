import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/lib/dbConfig";
import { User } from "@/schema/user.schema";
import { authCookieOptions, signAuthToken } from "@/lib/auth";

await connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const token = signAuthToken({ id: user._id.toString(), email: user.email });

        const response = NextResponse.json(
            { message: "Signed in successfully" },
            { status: 200 }
        );
        response.cookies.set("token", token, authCookieOptions);
        return response;
    } catch (error) {
        if (error instanceof Error) {
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
