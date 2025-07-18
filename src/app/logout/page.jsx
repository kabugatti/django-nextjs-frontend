"use client";

import { useAuth } from "@/components/authProvider";
import { useRouter } from "next/navigation";

const LOGOUT_URL = "/api/logout/";

export default function Page() {
  const auth = useAuth();
  const router = useRouter();

  async function handleClick(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "",
    };

    const response = await fetch(LOGOUT_URL, requestOptions);

    if (response.ok) {
      console.log("Logout successful:", response.statusText);
      auth.logout();
      router.push("/");
    } else {
      console.error("Logout failed:", response.statusText);
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-2xl font-bold row-start-1">
        Are you sure you want to log out?
      </h1>

      <button
        onClick={handleClick}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors row-start-3"
      >
        Yes, Logout
      </button>
    </div>
  );
}
