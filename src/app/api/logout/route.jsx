import { deleteTokens } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const myTokenResponse = await deleteTokens();

    console.log("Tokens deleted:", myTokenResponse);

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
