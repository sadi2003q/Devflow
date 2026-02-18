import jwt from "jsonwebtoken";

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

export const authCookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_DAY_SECONDS,
};
