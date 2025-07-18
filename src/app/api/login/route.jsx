"use server";
import {
  setToken,
  setRefreshToken,
  getToken,
  getRefreshToken,
} from "@/app/lib/auth";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8001/api/token/pair";

export async function POST(request) {
  const myAuthToken = await getToken();
  const myRefreshToken = await getRefreshToken();

  console.log("Auth Refresh Token:", myRefreshToken);
  console.log("Auth Token:", myAuthToken);

  const data = await request.json();
  const jsonData = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonData,
  };

  const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);
  const responseData = await response.json();

  if (response.ok) {
    const { access, refresh } = responseData;
    await setToken(access);
    await setRefreshToken(refresh);
    const apiResponse = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    return apiResponse;
  } else {
    console.error("Login failed:", response.statusText, responseData);
    // Handle login failure
    return NextResponse.json(
      { message: "Login failed", error: responseData },
      { status: response.status }
    );
  }
}
