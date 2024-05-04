import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from "firebase/auth";
import { app } from "@/firebase";

export async function GET(request: NextRequest) {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
        return NextResponse.json(user);
    } else {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized access' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
