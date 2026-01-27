

import { NextRequest, NextResponse } from 'next/server'
import {connect} from "@/lib/dbConfig";

await connect();
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log("Response from Front end: \n\n" ,body)
        return NextResponse.json(
            {
                message:"Successfully Response is Passed to backend"
            },
            { status: 201 }
        )

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "Unknown error" },
            { status: 500 }
        );
    }
}