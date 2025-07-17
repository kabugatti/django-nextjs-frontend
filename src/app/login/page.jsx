"use client"

const LOGIN_URL = "http://127.0.0.1:8001/api/token/pair"

export default function Page() {

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        
        // Here you would typically send the data to your backend for authentication
        console.log("Username:", username, "Password:", password);

        const jsonData = "";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        const response = await fetch(LOGIN_URL, requestOptions);

        if (response.ok) {
            const data = await response.json();
            console.log("Login successful:", data);
            // Handle successful login (e.g., redirect, store token, etc.)
        } else {
            console.error("Login failed:", response.statusText);
            // Handle login failure (e.g., show error message)
        }
    }

return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1 className="text-2xl font-bold row-start-1">
            Login Page
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 row-start-2">
            <input type="text" name="username" id="" placeholder="Your Username" required />
            <input type="password" name="password" id="" placeholder="Your Password" required />

            <button type="submit">
                Login
            </button>
        </form>
    </div>
)
}