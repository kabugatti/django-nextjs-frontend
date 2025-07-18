import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const DJANGO_API_WAITLISTS_URL = "http://127.0.0.1:8001/api/waitlists/";

export async function GET(request) {
    const authToken = await getToken();
    if (!authToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    console.log("Auth Token:", authToken);

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`
        },
    };

    const response = await fetch(DJANGO_API_WAITLISTS_URL, options);

    console.log("Response from Django API:", response);

    const result = await response.json();

    if (!response.ok) {
        return NextResponse.json({ ...result}, { status: response.status });
    }

    return NextResponse.json({ ...result }, { status: 200 });
}