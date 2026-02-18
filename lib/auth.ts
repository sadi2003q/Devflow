import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const ONE_DAY_SECONDS = 60 * 60 * 24;

export const getTokenSecret = () => {
    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
        throw new Error("Missing TOKEN_SECRET in environment.");
    }
    return secret;
};

export const signAuthToken = (payload: { id: string; email: string }) => {
    return jwt.sign(payload, getTokenSecret(), { expiresIn: "1d" });
};

export const verifyAuthToken = (token: string) => {
    return jwt.verify(token, getTokenSecret());
};

export type AuthPayload = {
    id: string;
    email: string;
    iat?: number;
    exp?: number;
};

export const getAuthPayload = (token: string): AuthPayload => {
    const payload = verifyAuthToken(token);
    if (
        !payload ||
        typeof payload !== "object" ||
        !("id" in payload) ||
        !("email" in payload)
    ) {
        throw new Error("Invalid auth token payload.");
    }
    return payload as AuthPayload;
};

export const getAuthPayloadFromRequest = (request: NextRequest): AuthPayload => {
    const token = request.cookies.get("token")?.value;
    if (!token) {
        throw new Error("Unauthorized");
    }
    return getAuthPayload(token);
};

export const authCookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_DAY_SECONDS,
};
