"use client";

import { useAuth } from "@/components/authProvider";

const LOGIN_URL = "/api/login/";

export default function Page() {
    const auth = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const objectFromForm = Object.fromEntries(formData);
    const jsonData = JSON.stringify(objectFromForm);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonData,
    };

    const response = await fetch(LOGIN_URL, requestOptions);

    if (response.ok) {
      console.log("Login successful:");
      auth.login();

    } else {
      console.error("Login failed:", response.statusText);
      // Handle login failure (e.g., show error message)
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-2xl font-bold row-start-1">Login Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 row-start-2">
        <input
          type="text"
          name="username"
          id=""
          placeholder="Your Username"
          required
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Your Password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
