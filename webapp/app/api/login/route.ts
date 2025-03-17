import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
    const {email, password} = await request.json();


    // TODO: Wire this to the auth service
    return new NextResponse(`Correctly logged in as ${email} with pass: ${password}`, {status: 200});
}