"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState("");

    const [value, setValue] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValue((prev) => ({ ...prev, [name]: value }))
    }
    const handleLogin = (e) => {
        e.preventDefault();

        if (value.email === "admin@gmail.com" && value.password === "123456") {
            localStorage.setItem("token", "fake-jwt-token");
            router.push("/dashboard");
            toast.success("Login Successfully")
        } else {
            setError("Invalid email or password");
        }
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
            <div className="bg-white shadow-lg rounded-xl p-8 w-96">
                <h1 className="text-4xl font-bold mb-6 text-center ">Admin Login</h1>

                {error && (
                    <p className="text-red-600 text-sm bg-red-100 p-2 rounded mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="p-3 border rounded-lg outline-none"
                        value={value.email}
                        onChange={handleOnChange}
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="p-3 border rounded-lg outline-none"
                        value={value.password}
                        onChange={handleOnChange}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-green-600  p-3 rounded-lg hover:bg-green-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
